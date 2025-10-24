// Dashboards pour Admin, Voyants et Clients

export function adminDashboard(adminData: any) {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Admin - Voyance Premium</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
      .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    </style>
</head>
<body class="bg-gray-100">
    <!-- Header -->
    <header class="gradient-bg text-white shadow-lg">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <i class="fas fa-crown text-3xl"></i>
                    <div>
                        <h1 class="text-2xl font-bold">Dashboard Administrateur</h1>
                        <p class="text-sm opacity-90">Bienvenue ${adminData.prenom} ${adminData.nom}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="/" class="hover:text-purple-200 transition">
                        <i class="fas fa-home mr-2"></i>Accueil
                    </a>
                    <button onclick="logout()" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition">
                        <i class="fas fa-sign-out-alt mr-2"></i>Déconnexion
                    </button>
                </div>
            </div>
        </div>
    </header>

    <div class="container mx-auto px-6 py-8">
        <!-- Onglets -->
        <div class="mb-6 border-b border-gray-300">
            <nav class="flex space-x-4">
                <button onclick="showTab('stats')" id="tab-stats" class="tab-btn px-4 py-2 font-semibold border-b-2 border-purple-600 text-purple-600">
                    <i class="fas fa-chart-line mr-2"></i>Statistiques
                </button>
                <button onclick="showTab('clients')" id="tab-clients" class="tab-btn px-4 py-2 font-semibold text-gray-600 hover:text-purple-600">
                    <i class="fas fa-users mr-2"></i>Clients
                </button>
                <button onclick="showTab('agents')" id="tab-agents" class="tab-btn px-4 py-2 font-semibold text-gray-600 hover:text-purple-600">
                    <i class="fas fa-user-tie mr-2"></i>Voyants
                </button>
                <button onclick="showTab('reviews')" id="tab-reviews" class="tab-btn px-4 py-2 font-semibold text-gray-600 hover:text-purple-600">
                    <i class="fas fa-star mr-2"></i>Avis
                </button>
            </nav>
        </div>

        <!-- Onglet Statistiques -->
        <div id="content-stats" class="tab-content">
            <!-- Cartes de statistiques -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm">Visites Aujourd'hui</p>
                            <p id="stat-visits" class="text-3xl font-bold text-purple-600">-</p>
                        </div>
                        <i class="fas fa-eye text-purple-600 text-3xl"></i>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm">Clients Inscrits</p>
                            <p id="stat-users" class="text-3xl font-bold text-blue-600">-</p>
                        </div>
                        <i class="fas fa-users text-blue-600 text-3xl"></i>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm">Voyants Actifs</p>
                            <p id="stat-agents" class="text-3xl font-bold text-green-600">-</p>
                        </div>
                        <i class="fas fa-user-check text-green-600 text-3xl"></i>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm">Voyants En Ligne</p>
                            <p id="stat-agents-online" class="text-3xl font-bold text-orange-600">-</p>
                        </div>
                        <i class="fas fa-circle text-orange-600 text-3xl"></i>
                    </div>
                </div>
            </div>

            <!-- Filtres temporels -->
            <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div class="flex items-center space-x-4">
                    <label class="font-semibold">Période:</label>
                    <button onclick="changePeriod('day')" id="period-day" class="period-btn bg-purple-600 text-white px-4 py-2 rounded-lg">Jour</button>
                    <button onclick="changePeriod('month')" id="period-month" class="period-btn bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Mois</button>
                    <button onclick="changePeriod('year')" id="period-year" class="period-btn bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Année</button>
                </div>
            </div>

            <!-- Graphique -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-bold mb-4">Statistiques de Visites</h3>
                <canvas id="visitsChart" height="100"></canvas>
            </div>
        </div>

        <!-- Onglet Clients -->
        <div id="content-clients" class="tab-content hidden">
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-2xl font-bold">Gestion des Clients</h3>
                    <div class="flex space-x-2">
                        <input type="text" id="search-clients" placeholder="Rechercher..." class="px-4 py-2 border rounded-lg">
                        <button onclick="refreshClients()" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                    </div>
                </div>
                <div id="clients-list" class="overflow-x-auto">
                    <p class="text-center text-gray-500">Chargement...</p>
                </div>
            </div>
        </div>

        <!-- Onglet Voyants -->
        <div id="content-agents" class="tab-content hidden">
            <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-2xl font-bold">Gestion des Voyants</h3>
                    <button onclick="showCreateAgentModal()" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        <i class="fas fa-plus mr-2"></i>Créer un voyant
                    </button>
                </div>
                <div id="agents-list" class="overflow-x-auto">
                    <p class="text-center text-gray-500">Chargement...</p>
                </div>
            </div>
        </div>

        <!-- Onglet Avis -->
        <div id="content-reviews" class="tab-content hidden">
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-2xl font-bold">Gestion des Avis</h3>
                    <button onclick="showCreateReviewModal()" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        <i class="fas fa-plus mr-2"></i>Créer un avis
                    </button>
                </div>
                <div id="reviews-list">
                    <p class="text-center text-gray-500">Chargement...</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Créer Voyant -->
    <div id="create-agent-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6" style="z-index: 1000;">
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 class="text-2xl font-bold mb-4">Créer un compte voyant</h3>
            <form id="create-agent-form" class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <input type="text" id="agent-prenom" placeholder="Prénom" required class="px-4 py-2 border rounded-lg">
                    <input type="text" id="agent-nom" placeholder="Nom" required class="px-4 py-2 border rounded-lg">
                </div>
                <input type="email" id="agent-email" placeholder="Email" required class="w-full px-4 py-2 border rounded-lg">
                <input type="password" id="agent-password" placeholder="Mot de passe" required class="w-full px-4 py-2 border rounded-lg">
                <input type="text" id="agent-specialite" placeholder="Spécialité" class="w-full px-4 py-2 border rounded-lg">
                <input type="number" step="0.1" id="agent-tarif" placeholder="Tarif/minute (€)" class="w-full px-4 py-2 border rounded-lg">
                <textarea id="agent-description" placeholder="Description" class="w-full px-4 py-2 border rounded-lg" rows="3"></textarea>
                <div class="flex space-x-4">
                    <button type="submit" class="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">Créer</button>
                    <button type="button" onclick="hideCreateAgentModal()" class="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">Annuler</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal Créer Avis -->
    <div id="create-review-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6" style="z-index: 1000;">
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 class="text-2xl font-bold mb-4">Créer un avis</h3>
            <form id="create-review-form" class="space-y-4">
                <input type="text" id="review-username" placeholder="Nom du client" required class="w-full px-4 py-2 border rounded-lg">
                <select id="review-agent" class="w-full px-4 py-2 border rounded-lg">
                    <option value="">Avis général (sans voyant)</option>
                </select>
                <select id="review-rating" required class="w-full px-4 py-2 border rounded-lg">
                    <option value="5">5 étoiles</option>
                    <option value="4">4 étoiles</option>
                    <option value="3">3 étoiles</option>
                    <option value="2">2 étoiles</option>
                    <option value="1">1 étoile</option>
                </select>
                <textarea id="review-comment" placeholder="Commentaire" required class="w-full px-4 py-2 border rounded-lg" rows="4"></textarea>
                <div class="flex space-x-4">
                    <button type="submit" class="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">Créer</button>
                    <button type="button" onclick="hideCreateReviewModal()" class="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">Annuler</button>
                </div>
            </form>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
      let currentPeriod = 'day';
      let visitsChart = null;

      // Onglets
      function showTab(tab) {
        document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.tab-btn').forEach(el => {
          el.classList.remove('border-purple-600', 'text-purple-600');
          el.classList.add('text-gray-600');
        });
        
        document.getElementById('content-' + tab).classList.remove('hidden');
        document.getElementById('tab-' + tab).classList.add('border-purple-600', 'text-purple-600');
        
        if (tab === 'stats') loadStats();
        else if (tab === 'clients') refreshClients();
        else if (tab === 'agents') refreshAgents();
        else if (tab === 'reviews') refreshReviews();
      }

      // Période
      function changePeriod(period) {
        currentPeriod = period;
        document.querySelectorAll('.period-btn').forEach(el => {
          el.classList.remove('bg-purple-600', 'text-white');
          el.classList.add('bg-gray-200', 'text-gray-700');
        });
        document.getElementById('period-' + period).classList.add('bg-purple-600', 'text-white');
        loadStats();
      }

      // Statistiques
      async function loadStats() {
        try {
          const response = await axios.get('/api/admin/stats?period=' + currentPeriod);
          const data = response.data;
          
          document.getElementById('stat-visits').textContent = data.visits || 0;
          document.getElementById('stat-users').textContent = data.totalUsers || 0;
          document.getElementById('stat-agents').textContent = data.totalAgents || 0;
          document.getElementById('stat-agents-online').textContent = data.agentsOnline || 0;
          
          updateChart(data.chartData || []);
        } catch (error) {
          console.error('Erreur:', error);
        }
      }

      function updateChart(data) {
        const ctx = document.getElementById('visitsChart').getContext('2d');
        
        if (visitsChart) {
          visitsChart.destroy();
        }
        
        visitsChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.map(d => d.label),
            datasets: [{
              label: 'Visites',
              data: data.map(d => d.value),
              borderColor: '#667eea',
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: true }
            }
          }
        });
      }

      // Clients
      async function refreshClients() {
        try {
          const response = await axios.get('/api/admin/users');
          const users = response.data;
          
          const html = \`
            <table class="min-w-full">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-4 py-2 text-left">ID</th>
                  <th class="px-4 py-2 text-left">Nom</th>
                  <th class="px-4 py-2 text-left">Email</th>
                  <th class="px-4 py-2 text-left">Inscrit le</th>
                  <th class="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                \${users.map(user => \`
                  <tr class="border-t">
                    <td class="px-4 py-2">\${user.id}</td>
                    <td class="px-4 py-2">\${user.prenom} \${user.nom}</td>
                    <td class="px-4 py-2">\${user.email}</td>
                    <td class="px-4 py-2">\${new Date(user.created_at).toLocaleDateString()}</td>
                    <td class="px-4 py-2">
                      <button onclick="deleteUser(\${user.id})" class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                \`).join('')}
              </tbody>
            </table>
          \`;
          
          document.getElementById('clients-list').innerHTML = html;
        } catch (error) {
          console.error('Erreur:', error);
        }
      }

      async function deleteUser(id) {
        if (!confirm('Supprimer ce client ?')) return;
        
        try {
          await axios.delete('/api/admin/users/' + id);
          refreshClients();
        } catch (error) {
          alert('Erreur lors de la suppression');
        }
      }

      // Voyants
      async function refreshAgents() {
        try {
          const response = await axios.get('/api/admin/agents');
          const agents = response.data;
          
          const html = \`
            <table class="min-w-full">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-4 py-2 text-left">ID</th>
                  <th class="px-4 py-2 text-left">Nom</th>
                  <th class="px-4 py-2 text-left">Email</th>
                  <th class="px-4 py-2 text-left">Spécialité</th>
                  <th class="px-4 py-2 text-left">Tarif</th>
                  <th class="px-4 py-2 text-left">Statut</th>
                  <th class="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                \${agents.map(agent => \`
                  <tr class="border-t">
                    <td class="px-4 py-2">\${agent.id}</td>
                    <td class="px-4 py-2">\${agent.prenom} \${agent.nom}</td>
                    <td class="px-4 py-2">\${agent.email}</td>
                    <td class="px-4 py-2">\${agent.specialite || '-'}</td>
                    <td class="px-4 py-2">\${agent.tarif_minute}€/min</td>
                    <td class="px-4 py-2">
                      \${agent.is_online ? '<span class="text-green-600">En ligne</span>' : '<span class="text-gray-500">Hors ligne</span>'}
                    </td>
                    <td class="px-4 py-2 space-x-2">
                      <button onclick="toggleAgentStatus(\${agent.id}, \${agent.is_active})" class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-\${agent.is_active ? 'ban' : 'check'}"></i>
                      </button>
                      <button onclick="deleteAgent(\${agent.id})" class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                \`).join('')}
              </tbody>
            </table>
          \`;
          
          document.getElementById('agents-list').innerHTML = html;
          
          // Remplir le select des voyants dans le modal avis
          const agentSelect = document.getElementById('review-agent');
          agentSelect.innerHTML = '<option value="">Avis général (sans voyant)</option>' + 
            agents.map(a => \`<option value="\${a.id}">\${a.prenom} \${a.nom}</option>\`).join('');
        } catch (error) {
          console.error('Erreur:', error);
        }
      }

      async function deleteAgent(id) {
        if (!confirm('Supprimer ce voyant ?')) return;
        
        try {
          await axios.delete('/api/admin/agents/' + id);
          refreshAgents();
        } catch (error) {
          alert('Erreur lors de la suppression');
        }
      }

      async function toggleAgentStatus(id, currentStatus) {
        try {
          await axios.patch('/api/admin/agents/' + id, { is_active: currentStatus ? 0 : 1 });
          refreshAgents();
        } catch (error) {
          alert('Erreur lors de la mise à jour');
        }
      }

      function showCreateAgentModal() {
        document.getElementById('create-agent-modal').classList.remove('hidden');
      }

      function hideCreateAgentModal() {
        document.getElementById('create-agent-modal').classList.add('hidden');
        document.getElementById('create-agent-form').reset();
      }

      document.getElementById('create-agent-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const data = {
          prenom: document.getElementById('agent-prenom').value,
          nom: document.getElementById('agent-nom').value,
          email: document.getElementById('agent-email').value,
          password: document.getElementById('agent-password').value,
          specialite: document.getElementById('agent-specialite').value,
          tarif_minute: parseFloat(document.getElementById('agent-tarif').value) || 0,
          description: document.getElementById('agent-description').value
        };
        
        try {
          await axios.post('/api/admin/agents', data);
          hideCreateAgentModal();
          refreshAgents();
        } catch (error) {
          alert(error.response?.data?.error || 'Erreur lors de la création');
        }
      });

      // Avis
      async function refreshReviews() {
        try {
          const response = await axios.get('/api/admin/reviews');
          const reviews = response.data;
          
          const html = reviews.map(review => \`
            <div class="bg-gray-50 rounded-lg p-4 mb-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <span class="font-bold mr-2">\${review.user_name}</span>
                    <span class="text-yellow-400">\${'★'.repeat(review.rating)}\${'☆'.repeat(5 - review.rating)}</span>
                  </div>
                  <p class="text-gray-700 mb-2">\${review.comment}</p>
                  <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <span>\${review.agent_prenom ? 'Voyant: ' + review.agent_prenom + ' ' + review.agent_nom : 'Avis général'}</span>
                    <span>\${new Date(review.created_at).toLocaleDateString()}</span>
                    <span class="\${review.is_visible ? 'text-green-600' : 'text-red-600'}">
                      \${review.is_visible ? 'Visible' : 'Masqué'}
                    </span>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <button onclick="toggleReviewVisibility(\${review.id}, \${review.is_visible})" class="text-blue-600 hover:text-blue-800">
                    <i class="fas fa-eye\${review.is_visible ? '-slash' : ''}"></i>
                  </button>
                  <button onclick="deleteReview(\${review.id})" class="text-red-600 hover:text-red-800">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          \`).join('');
          
          document.getElementById('reviews-list').innerHTML = html || '<p class="text-center text-gray-500">Aucun avis</p>';
        } catch (error) {
          console.error('Erreur:', error);
        }
      }

      async function toggleReviewVisibility(id, currentStatus) {
        try {
          await axios.patch('/api/admin/reviews/' + id, { is_visible: currentStatus ? 0 : 1 });
          refreshReviews();
        } catch (error) {
          alert('Erreur lors de la mise à jour');
        }
      }

      async function deleteReview(id) {
        if (!confirm('Supprimer cet avis ?')) return;
        
        try {
          await axios.delete('/api/admin/reviews/' + id);
          refreshReviews();
        } catch (error) {
          alert('Erreur lors de la suppression');
        }
      }

      function showCreateReviewModal() {
        document.getElementById('create-review-modal').classList.remove('hidden');
      }

      function hideCreateReviewModal() {
        document.getElementById('create-review-modal').classList.add('hidden');
        document.getElementById('create-review-form').reset();
      }

      document.getElementById('create-review-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const data = {
          user_name: document.getElementById('review-username').value,
          agent_id: document.getElementById('review-agent').value || null,
          rating: parseInt(document.getElementById('review-rating').value),
          comment: document.getElementById('review-comment').value,
          created_by_admin: 1,
          is_visible: 1
        };
        
        try {
          await axios.post('/api/admin/reviews', data);
          hideCreateReviewModal();
          refreshReviews();
        } catch (error) {
          alert(error.response?.data?.error || 'Erreur lors de la création');
        }
      });

      // Déconnexion
      async function logout() {
        try {
          await axios.post('/api/auth/logout');
          window.location.href = '/';
        } catch (error) {
          window.location.href = '/';
        }
      }

      // Charger les stats au démarrage
      loadStats();
    </script>
</body>
</html>
  `;
}

// Fonctions pour les autres dashboards (à compléter)
export function agentDashboard(agentData: any) {
  return '<h1>Dashboard Voyant - En développement</h1>';
}

export function clientDashboard(clientData: any) {
  return '<h1>Dashboard Client - En développement</h1>';
}
