import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import type { Bindings } from './types'

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// ============================================
// PAGE PUBLIQUE - ACCUEIL
// ============================================
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Voyance en Ligne - Consultations avec nos Experts</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
          .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
          .card-hover:hover { transform: translateY(-5px); transition: all 0.3s; }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Header -->
        <header class="gradient-bg text-white shadow-lg">
            <nav class="container mx-auto px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-moon text-3xl"></i>
                        <span class="text-2xl font-bold">Voyance Premium</span>
                    </div>
                    <div class="hidden md:flex space-x-6">
                        <a href="#experts" class="hover:text-purple-200 transition">Nos Experts</a>
                        <a href="#avis" class="hover:text-purple-200 transition">Avis</a>
                        <a href="#horoscope" class="hover:text-purple-200 transition">Horoscope</a>
                        <a href="/login" class="hover:text-purple-200 transition">Connexion</a>
                        <a href="/register" class="bg-white text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition font-semibold">Inscription</a>
                    </div>
                    <button class="md:hidden text-2xl">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </nav>
        </header>

        <!-- Hero Section -->
        <section class="gradient-bg text-white py-20">
            <div class="container mx-auto px-6 text-center">
                <h1 class="text-5xl font-bold mb-6">Consultations de Voyance en Ligne</h1>
                <p class="text-xl mb-8 opacity-90">Découvrez votre avenir avec nos voyants expérimentés disponibles 24/7</p>
                <div class="flex justify-center space-x-4">
                    <a href="/register" class="bg-white text-purple-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-100 transition">
                        Commencer maintenant
                    </a>
                    <a href="#experts" class="border-2 border-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-700 transition">
                        Voir nos experts
                    </a>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-16 bg-white">
            <div class="container mx-auto px-6">
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="text-center p-6">
                        <div class="text-purple-600 text-5xl mb-4">
                            <i class="fas fa-users"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2">Experts Certifiés</h3>
                        <p class="text-gray-600">Voyants professionnels avec plusieurs années d'expérience</p>
                    </div>
                    <div class="text-center p-6">
                        <div class="text-purple-600 text-5xl mb-4">
                            <i class="fas fa-lock"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2">100% Confidentiel</h3>
                        <p class="text-gray-600">Vos consultations restent privées et sécurisées</p>
                    </div>
                    <div class="text-center p-6">
                        <div class="text-purple-600 text-5xl mb-4">
                            <i class="fas fa-clock"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2">Disponible 24/7</h3>
                        <p class="text-gray-600">Consultez nos experts à tout moment, jour et nuit</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Experts Section -->
        <section id="experts" class="py-16 bg-gray-50">
            <div class="container mx-auto px-6">
                <h2 class="text-4xl font-bold text-center mb-12 text-gray-800">Nos Experts en Voyance</h2>
                <div id="experts-list" class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div class="text-center text-gray-500">
                        <i class="fas fa-spinner fa-spin text-3xl"></i>
                        <p class="mt-2">Chargement...</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Reviews Section -->
        <section id="avis" class="py-16 bg-white">
            <div class="container mx-auto px-6">
                <h2 class="text-4xl font-bold text-center mb-12 text-gray-800">Avis de nos Clients</h2>
                <div id="reviews-list" class="grid md:grid-cols-3 gap-8">
                    <div class="text-center text-gray-500">
                        <i class="fas fa-spinner fa-spin text-3xl"></i>
                        <p class="mt-2">Chargement...</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Horoscope Section -->
        <section id="horoscope" class="py-16 bg-gray-50">
            <div class="container mx-auto px-6">
                <h2 class="text-4xl font-bold text-center mb-12 text-gray-800">Horoscope du Jour</h2>
                <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                    ${['Bélier', 'Taureau', 'Gémeaux', 'Cancer', 'Lion', 'Vierge', 'Balance', 'Scorpion', 'Sagittaire', 'Capricorne', 'Verseau', 'Poissons'].map(signe => `
                        <div class="bg-white p-6 rounded-lg shadow-md card-hover cursor-pointer">
                            <h3 class="text-xl font-bold text-purple-700 mb-2">${signe}</h3>
                            <p class="text-gray-600 text-sm">Cliquez pour voir votre horoscope</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12">
            <div class="container mx-auto px-6">
                <div class="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 class="text-xl font-bold mb-4">Voyance Premium</h3>
                        <p class="text-gray-400">Votre plateforme de confiance pour les consultations de voyance en ligne.</p>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold mb-4">Liens Utiles</h3>
                        <ul class="space-y-2">
                            <li><a href="#experts" class="text-gray-400 hover:text-white transition">Nos Experts</a></li>
                            <li><a href="#avis" class="text-gray-400 hover:text-white transition">Avis Clients</a></li>
                            <li><a href="#horoscope" class="text-gray-400 hover:text-white transition">Horoscope</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold mb-4">Contactez-nous</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><i class="fas fa-envelope mr-2"></i> contact@voyance.fr</li>
                            <li><i class="fas fa-phone mr-2"></i> 01 23 45 67 89</li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 Voyance Premium. Tous droits réservés.</p>
                    <div class="mt-4 space-x-6">
                        <a href="/contact" class="hover:text-white transition">Contact</a>
                        <a href="/confidentialite" class="hover:text-white transition">Déclaration de confidentialité</a>
                        <a href="/cgv" class="hover:text-white transition">Conditions générales</a>
                    </div>
                </div>
            </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
          // Charger les experts
          async function loadExperts() {
            try {
              const response = await axios.get('/api/experts');
              const experts = response.data;
              const container = document.getElementById('experts-list');
              
              if (experts.length === 0) {
                container.innerHTML = '<p class="text-center text-gray-500">Aucun expert disponible pour le moment.</p>';
                return;
              }
              
              container.innerHTML = experts.map(expert => \`
                <div class="bg-white rounded-lg shadow-lg p-6 card-hover">
                  <div class="flex flex-col items-center">
                    <div class="w-24 h-24 bg-purple-200 rounded-full flex items-center justify-center mb-4">
                      <i class="fas fa-user text-purple-600 text-4xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">\${expert.prenom} \${expert.nom}</h3>
                    <p class="text-purple-600 font-semibold mb-2">\${expert.specialite || 'Voyance'}</p>
                    <p class="text-gray-600 text-sm mb-4 text-center">\${expert.description || 'Expert en voyance'}</p>
                    <div class="flex items-center mb-4">
                      <span class="text-2xl font-bold text-purple-700">\${expert.tarif_minute}€</span>
                      <span class="text-gray-500 ml-1">/min</span>
                    </div>
                    <div class="mb-4">
                      \${expert.is_online ? 
                        '<span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold"><i class="fas fa-circle text-xs mr-1"></i> En ligne</span>' : 
                        '<span class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold"><i class="fas fa-circle text-xs mr-1"></i> Hors ligne</span>'
                      }
                    </div>
                    <a href="/login" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-semibold w-full text-center">
                      Consulter
                    </a>
                  </div>
                </div>
              \`).join('');
            } catch (error) {
              console.error('Erreur:', error);
              document.getElementById('experts-list').innerHTML = '<p class="text-center text-red-500">Erreur de chargement</p>';
            }
          }

          // Charger les avis
          async function loadReviews() {
            try {
              const response = await axios.get('/api/reviews');
              const reviews = response.data;
              const container = document.getElementById('reviews-list');
              
              if (reviews.length === 0) {
                container.innerHTML = '<p class="text-center text-gray-500">Aucun avis disponible.</p>';
                return;
              }
              
              container.innerHTML = reviews.map(review => \`
                <div class="bg-white rounded-lg shadow-lg p-6">
                  <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mr-3">
                      <i class="fas fa-user text-purple-600"></i>
                    </div>
                    <div>
                      <h4 class="font-bold">\${review.user_name}</h4>
                      <div class="text-yellow-400">
                        \${'★'.repeat(review.rating)}\${'☆'.repeat(5 - review.rating)}
                      </div>
                    </div>
                  </div>
                  <p class="text-gray-600">\${review.comment}</p>
                </div>
              \`).join('');
            } catch (error) {
              console.error('Erreur:', error);
              document.getElementById('reviews-list').innerHTML = '<p class="text-center text-red-500">Erreur de chargement</p>';
            }
          }

          // Charger au démarrage
          loadExperts();
          loadReviews();
        </script>
    </body>
    </html>
  `)
})

// ============================================
// API ROUTES
// ============================================

// API - Obtenir la liste des experts
app.get('/api/experts', async (c) => {
  const { DB } = c.env
  
  try {
    const result = await DB.prepare(`
      SELECT id, nom, prenom, specialite, description, photo_url, tarif_minute, is_online
      FROM agents
      WHERE is_active = 1
      ORDER BY is_online DESC, nom ASC
    `).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Error fetching agents:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// API - Obtenir les avis visibles
app.get('/api/reviews', async (c) => {
  const { DB } = c.env
  
  try {
    const result = await DB.prepare(`
      SELECT r.*, a.prenom as agent_prenom, a.nom as agent_nom
      FROM reviews r
      LEFT JOIN agents a ON r.agent_id = a.id
      WHERE r.is_visible = 1
      ORDER BY r.created_at DESC
      LIMIT 6
    `).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// Plus de routes à venir...
app.get('/login', (c) => c.html('<h1>Page de connexion - En construction</h1>'))
app.get('/register', (c) => c.html('<h1>Page d\'inscription - En construction</h1>'))
app.get('/contact', (c) => c.html('<h1>Page de contact - En construction</h1>'))
app.get('/confidentialite', (c) => c.html('<h1>Politique de confidentialité - En construction</h1>'))
app.get('/cgv', (c) => c.html('<h1>Conditions générales - En construction</h1>'))

export default app
