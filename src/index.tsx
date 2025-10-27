import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { setCookie } from 'hono/cookie'
import type { Bindings } from './types'
import { hashPassword, verifyPassword, createSession, getSessionFromCookie } from './auth'
import { loginPage, registerPage } from './pages'
import { adminDashboard, agentDashboard, clientDashboard } from './dashboards'

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

// ============================================
// PAGES D'AUTHENTIFICATION
// ============================================
app.get('/login', (c) => c.html(loginPage))
app.get('/register', (c) => c.html(registerPage))

// ============================================
// API AUTHENTIFICATION
// ============================================

// API - Inscription client
app.post('/api/auth/register', async (c) => {
  const { DB } = c.env
  
  try {
    const body = await c.req.json()
    const { prenom, nom, email, telephone, password } = body
    
    // Vérifier si l'email existe déjà
    const existing = await DB.prepare('SELECT id FROM users WHERE email = ?')
      .bind(email)
      .first()
    
    if (existing) {
      return c.json({ error: 'Cet email est déjà utilisé' }, 400)
    }
    
    // Hasher le mot de passe (simple pour MVP, utilisez bcrypt en production)
    const hashedPassword = hashPassword(password)
    
    // Insérer le nouvel utilisateur
    const result = await DB.prepare(`
      INSERT INTO users (email, password, nom, prenom, telephone)
      VALUES (?, ?, ?, ?, ?)
    `).bind(email, hashedPassword, nom, prenom, telephone || null).run()
    
    return c.json({ 
      success: true, 
      message: 'Inscription réussie',
      userId: result.meta.last_row_id 
    })
  } catch (error) {
    console.error('Registration error:', error)
    return c.json({ error: 'Erreur lors de l\'inscription' }, 500)
  }
})

// API - Connexion
app.post('/api/auth/login', async (c) => {
  const { DB } = c.env
  
  try {
    const body = await c.req.json()
    const { userType, email, password } = body
    
    let table = ''
    let redirectPath = ''
    
    // Déterminer la table à interroger
    if (userType === 'admin') {
      table = 'admins'
      redirectPath = '/admin/dashboard'
    } else if (userType === 'agent') {
      table = 'agents'
      redirectPath = '/agent/dashboard'
    } else {
      table = 'users'
      redirectPath = '/client/dashboard'
    }
    
    // Récupérer l'utilisateur
    const user = await DB.prepare(`SELECT * FROM ${table} WHERE email = ?`)
      .bind(email)
      .first()
    
    if (!user) {
      return c.json({ error: 'Email ou mot de passe incorrect' }, 401)
    }
    
    // Vérifier le mot de passe
    if (!verifyPassword(password, user.password as string)) {
      return c.json({ error: 'Email ou mot de passe incorrect' }, 401)
    }
    
    // Mettre à jour last_login
    await DB.prepare(`UPDATE ${table} SET last_login = datetime('now') WHERE id = ?`)
      .bind(user.id)
      .run()
    
    // Si c'est un agent, mettre à jour is_online
    if (userType === 'agent') {
      await DB.prepare('UPDATE agents SET is_online = 1 WHERE id = ?')
        .bind(user.id)
        .run()
    }
    
    // Créer une session
    const sessionToken = createSession(user.id as number, userType as any, email)
    
    // Créer un cookie de session
    setCookie(c, 'session', sessionToken, {
      path: '/',
      httpOnly: true,
      maxAge: 86400, // 24 heures
      sameSite: 'Lax'
    })
    
    return c.json({ 
      success: true,
      redirectPath,
      user: {
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        userType
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return c.json({ error: 'Erreur lors de la connexion' }, 500)
  }
})

// API - Déconnexion
app.post('/api/auth/logout', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  // Si c'est un agent, mettre is_online à 0
  if (session && session.userType === 'agent') {
    try {
      await DB.prepare('UPDATE agents SET is_online = 0 WHERE id = ?')
        .bind(session.userId)
        .run()
    } catch (error) {
      console.error('Error updating agent status:', error)
    }
  }
  
  // Supprimer le cookie
  setCookie(c, 'session', '', {
    path: '/',
    maxAge: 0
  })
  
  return c.json({ success: true })
})

// ============================================
// DASHBOARDS
// ============================================
app.get('/admin/dashboard', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session || session.userType !== 'admin') {
    return c.redirect('/login')
  }
  
  // Récupérer les données de l'admin
  const admin = await DB.prepare('SELECT * FROM admins WHERE id = ?')
    .bind(session.userId)
    .first()
  
  return c.html(adminDashboard(admin))
})

app.get('/agent/dashboard', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session || session.userType !== 'agent') {
    return c.redirect('/login')
  }
  
  const agent = await DB.prepare('SELECT * FROM agents WHERE id = ?')
    .bind(session.userId)
    .first()
  
  return c.html(agentDashboard(agent))
})

app.get('/client/dashboard', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session || session.userType !== 'user') {
    return c.redirect('/login')
  }
  
  const user = await DB.prepare('SELECT * FROM users WHERE id = ?')
    .bind(session.userId)
    .first()
  
  return c.html(clientDashboard(user))
})

// ============================================
// API ADMIN
// ============================================

// API - Statistiques admin
app.get('/api/admin/stats', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session || session.userType !== 'admin') {
    return c.json({ error: 'Non autorisé' }, 401)
  }
  
  try {
    const period = c.req.query('period') || 'day'
    
    // Compter les utilisateurs
    const totalUsers = await DB.prepare('SELECT COUNT(*) as count FROM users').first()
    
    // Compter les voyants
    const totalAgents = await DB.prepare('SELECT COUNT(*) as count FROM agents WHERE is_active = 1').first()
    
    // Compter les voyants en ligne
    const agentsOnline = await DB.prepare('SELECT COUNT(*) as count FROM agents WHERE is_online = 1').first()
    
    // Visites du jour
    const visits = await DB.prepare(`
      SELECT page_views FROM visit_stats 
      WHERE visit_date = date('now')
    `).first()
    
    // Données pour le graphique (simplifiée pour MVP)
    let chartData = []
    if (period === 'day') {
      // Dernières 24 heures
      for (let i = 23; i >= 0; i--) {
        chartData.push({
          label: `${i}h`,
          value: Math.floor(Math.random() * 100) // Mock data pour MVP
        })
      }
    } else if (period === 'month') {
      // Dernier mois
      for (let i = 30; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        chartData.push({
          label: date.getDate().toString(),
          value: Math.floor(Math.random() * 500)
        })
      }
    } else {
      // Dernière année
      for (let i = 11; i >= 0; i--) {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        chartData.push({
          label: date.toLocaleDateString('fr-FR', { month: 'short' }),
          value: Math.floor(Math.random() * 2000)
        })
      }
    }
    
    return c.json({
      visits: (visits?.page_views as number) || 0,
      totalUsers: (totalUsers?.count as number) || 0,
      totalAgents: (totalAgents?.count as number) || 0,
      agentsOnline: (agentsOnline?.count as number) || 0,
      chartData
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// API - Liste des utilisateurs
app.get('/api/admin/users', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session || session.userType !== 'admin') {
    return c.json({ error: 'Non autorisé' }, 401)
  }
  
  try {
    const result = await DB.prepare(`
      SELECT id, email, nom, prenom, telephone, created_at, last_login, is_active
      FROM users
      ORDER BY created_at DESC
    `).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Error:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// API - Supprimer un utilisateur
app.delete('/api/admin/users/:id', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session || session.userType !== 'admin') {
    return c.json({ error: 'Non autorisé' }, 401)
  }
  
  try {
    const id = c.req.param('id')
    await DB.prepare('DELETE FROM users WHERE id = ?').bind(id).run()
    return c.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// API - Liste des voyants
app.get('/api/admin/agents', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session || session.userType !== 'admin') {
    return c.json({ error: 'Non autorisé' }, 401)
  }
  
  try {
    const result = await DB.prepare(`
      SELECT id, email, nom, prenom, specialite, description, tarif_minute, is_online, is_active, created_at
      FROM agents
      ORDER BY created_at DESC
    `).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Error:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// API - Créer un voyant
app.post('/api/admin/agents', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session || session.userType !== 'admin') {
    return c.json({ error: 'Non autorisé' }, 401)
  }
  
  try {
    const body = await c.req.json()
    const { email, password, nom, prenom, specialite, tarif_minute, description } = body
    
    // Vérifier si l'email existe déjà
    const existing = await DB.prepare('SELECT id FROM agents WHERE email = ?')
      .bind(email)
      .first()
    
    if (existing) {
      return c.json({ error: 'Cet email est déjà utilisé' }, 400)
    }
    
    const hashedPassword = hashPassword(password)
    
    await DB.prepare(`
      INSERT INTO agents (email, password, nom, prenom, specialite, tarif_minute, description)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(email, hashedPassword, nom, prenom, specialite || null, tarif_minute || 0, description || null).run()
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// API - Mettre à jour un voyant
app.patch('/api/admin/agents/:id', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session || session.userType !== 'admin') {
    return c.json({ error: 'Non autorisé' }, 401)
  }
  
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const { is_active } = body
    
    await DB.prepare('UPDATE agents SET is_active = ? WHERE id = ?')
      .bind(is_active, id)
      .run()
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// API - Supprimer un voyant
app.delete('/api/admin/agents/:id', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session || session.userType !== 'admin') {
    return c.json({ error: 'Non autorisé' }, 401)
  }
  
  try {
    const id = c.req.param('id')
    await DB.prepare('DELETE FROM agents WHERE id = ?').bind(id).run()
    return c.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// API - Liste des avis (admin)
app.get('/api/admin/reviews', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session || session.userType !== 'admin') {
    return c.json({ error: 'Non autorisé' }, 401)
  }
  
  try {
    const result = await DB.prepare(`
      SELECT r.*, a.prenom as agent_prenom, a.nom as agent_nom
      FROM reviews r
      LEFT JOIN agents a ON r.agent_id = a.id
      ORDER BY r.created_at DESC
    `).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Error:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// API - Créer un avis
app.post('/api/admin/reviews', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session || session.userType !== 'admin') {
    return c.json({ error: 'Non autorisé' }, 401)
  }
  
  try {
    const body = await c.req.json()
    const { user_name, agent_id, rating, comment, created_by_admin, is_visible } = body
    
    await DB.prepare(`
      INSERT INTO reviews (user_name, agent_id, rating, comment, created_by_admin, is_visible)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(user_name, agent_id || null, rating, comment, created_by_admin || 0, is_visible !== undefined ? is_visible : 1).run()
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// API - Mettre à jour un avis
app.patch('/api/admin/reviews/:id', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session || session.userType !== 'admin') {
    return c.json({ error: 'Non autorisé' }, 401)
  }
  
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const { is_visible } = body
    
    await DB.prepare('UPDATE reviews SET is_visible = ? WHERE id = ?')
      .bind(is_visible, id)
      .run()
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// API - Supprimer un avis
app.delete('/api/admin/reviews/:id', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session || session.userType !== 'admin') {
    return c.json({ error: 'Non autorisé' }, 401)
  }
  
  try {
    const id = c.req.param('id')
    await DB.prepare('DELETE FROM reviews WHERE id = ?').bind(id).run()
    return c.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// ============================================
// API CHAT SYSTEM
// ============================================

// API - Créer/Démarrer une session de chat
app.post('/api/chat/start', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session || session.userType !== 'user') {
    return c.json({ error: 'Non autorisé' }, 401)
  }
  
  try {
    const body = await c.req.json()
    const { agent_id } = body
    
    // Vérifier si l'agent existe et est disponible
    const agent = await DB.prepare('SELECT * FROM agents WHERE id = ? AND is_active = 1')
      .bind(agent_id)
      .first()
    
    if (!agent) {
      return c.json({ error: 'Voyant non disponible' }, 400)
    }
    
    // Créer la session de chat
    const result = await DB.prepare(`
      INSERT INTO chat_sessions (user_id, agent_id, status, started_at)
      VALUES (?, ?, 'active', datetime('now'))
    `).bind(session.userId, agent_id).run()
    
    const chatSessionId = result.meta.last_row_id
    
    // Message de bienvenue automatique
    await DB.prepare(`
      INSERT INTO messages (chat_session_id, sender_type, sender_id, message)
      VALUES (?, 'agent', ?, ?)
    `).bind(
      chatSessionId, 
      agent_id, 
      `Bonjour ! Je suis ${agent.prenom}, bienvenue dans votre consultation. Comment puis-je vous aider aujourd'hui ?`
    ).run()
    
    return c.json({ 
      success: true, 
      chatSessionId,
      agent: {
        id: agent.id,
        nom: agent.nom,
        prenom: agent.prenom,
        specialite: agent.specialite,
        tarif_minute: agent.tarif_minute
      }
    })
  } catch (error) {
    console.error('Error starting chat:', error)
    return c.json({ error: 'Erreur lors du démarrage' }, 500)
  }
})

// API - Envoyer un message
app.post('/api/chat/message', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session) {
    return c.json({ error: 'Non autorisé' }, 401)
  }
  
  try {
    const body = await c.req.json()
    const { chat_session_id, message } = body
    
    // Vérifier que la session existe et appartient à l'utilisateur
    const chatSession = await DB.prepare(`
      SELECT * FROM chat_sessions 
      WHERE id = ? AND (user_id = ? OR agent_id = ?) AND status = 'active'
    `).bind(chat_session_id, session.userId, session.userId).first()
    
    if (!chatSession) {
      return c.json({ error: 'Session invalide' }, 400)
    }
    
    // Insérer le message
    const result = await DB.prepare(`
      INSERT INTO messages (chat_session_id, sender_type, sender_id, message, created_at)
      VALUES (?, ?, ?, ?, datetime('now'))
    `).bind(
      chat_session_id,
      session.userType === 'agent' ? 'agent' : 'user',
      session.userId,
      message
    ).run()
    
    return c.json({ 
      success: true,
      messageId: result.meta.last_row_id
    })
  } catch (error) {
    console.error('Error sending message:', error)
    return c.json({ error: 'Erreur lors de l\'envoi' }, 500)
  }
})

// API - Récupérer les messages (polling)
app.get('/api/chat/messages/:sessionId', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session) {
    return c.json({ error: 'Non autorisé' }, 401)
  }
  
  try {
    const sessionId = c.req.param('sessionId')
    const lastMessageId = c.req.query('lastMessageId') || '0'
    
    // Vérifier l'accès à la session
    const chatSession = await DB.prepare(`
      SELECT * FROM chat_sessions 
      WHERE id = ? AND (user_id = ? OR agent_id = ?)
    `).bind(sessionId, session.userId, session.userId).first()
    
    if (!chatSession) {
      return c.json({ error: 'Session invalide' }, 401)
    }
    
    // Récupérer les nouveaux messages
    const messages = await DB.prepare(`
      SELECT m.*, 
        CASE 
          WHEN m.sender_type = 'user' THEN u.prenom || ' ' || u.nom
          WHEN m.sender_type = 'agent' THEN a.prenom || ' ' || a.nom
        END as sender_name
      FROM messages m
      LEFT JOIN users u ON m.sender_type = 'user' AND m.sender_id = u.id
      LEFT JOIN agents a ON m.sender_type = 'agent' AND m.sender_id = a.id
      WHERE m.chat_session_id = ? AND m.id > ?
      ORDER BY m.created_at ASC
    `).bind(sessionId, lastMessageId).all()
    
    // Marquer comme lu
    if (messages.results && messages.results.length > 0) {
      await DB.prepare(`
        UPDATE messages 
        SET is_read = 1 
        WHERE chat_session_id = ? AND sender_type != ?
      `).bind(sessionId, session.userType === 'agent' ? 'agent' : 'user').run()
    }
    
    return c.json({ 
      messages: messages.results || [],
      session: {
        status: chatSession.status,
        duration_minutes: chatSession.duration_minutes,
        total_cost: chatSession.total_cost
      }
    })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// API - Terminer une session de chat
app.post('/api/chat/end', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session) {
    return c.json({ error: 'Non autorisé' }, 401)
  }
  
  try {
    const body = await c.req.json()
    const { chat_session_id } = body
    
    // Récupérer la session
    const chatSession = await DB.prepare(`
      SELECT cs.*, a.tarif_minute
      FROM chat_sessions cs
      JOIN agents a ON cs.agent_id = a.id
      WHERE cs.id = ? AND (cs.user_id = ? OR cs.agent_id = ?)
    `).bind(chat_session_id, session.userId, session.userId).first()
    
    if (!chatSession) {
      return c.json({ error: 'Session invalide' }, 400)
    }
    
    // Calculer la durée et le coût
    const startTime = new Date(chatSession.started_at as string).getTime()
    const endTime = Date.now()
    const durationMs = endTime - startTime
    const durationMinutes = Math.ceil(durationMs / 60000) // Arrondir à la minute supérieure
    const totalCost = durationMinutes * (chatSession.tarif_minute as number)
    
    // Mettre à jour la session
    await DB.prepare(`
      UPDATE chat_sessions 
      SET status = 'closed', 
          ended_at = datetime('now'),
          duration_minutes = ?,
          total_cost = ?
      WHERE id = ?
    `).bind(durationMinutes, totalCost, chat_session_id).run()
    
    // Créer la transaction
    await DB.prepare(`
      INSERT INTO transactions (user_id, agent_id, chat_session_id, amount, transaction_date, status)
      VALUES (?, ?, ?, ?, datetime('now'), 'completed')
    `).bind(chatSession.user_id, chatSession.agent_id, chat_session_id, totalCost).run()
    
    return c.json({ 
      success: true,
      duration_minutes: durationMinutes,
      total_cost: totalCost
    })
  } catch (error) {
    console.error('Error ending chat:', error)
    return c.json({ error: 'Erreur lors de la fermeture' }, 500)
  }
})

// API - Liste des sessions actives (pour voyant)
app.get('/api/agent/sessions', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session || session.userType !== 'agent') {
    return c.json({ error: 'Non autorisé' }, 401)
  }
  
  try {
    const sessions = await DB.prepare(`
      SELECT cs.*, u.prenom as user_prenom, u.nom as user_nom
      FROM chat_sessions cs
      JOIN users u ON cs.user_id = u.id
      WHERE cs.agent_id = ? AND cs.status = 'active'
      ORDER BY cs.started_at DESC
    `).bind(session.userId).all()
    
    return c.json(sessions.results || [])
  } catch (error) {
    console.error('Error:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// API - Historique des sessions (pour client)
app.get('/api/client/sessions', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session || session.userType !== 'user') {
    return c.json({ error: 'Non autorisé' }, 401)
  }
  
  try {
    const sessions = await DB.prepare(`
      SELECT cs.*, a.prenom as agent_prenom, a.nom as agent_nom, a.specialite
      FROM chat_sessions cs
      JOIN agents a ON cs.agent_id = a.id
      WHERE cs.user_id = ?
      ORDER BY cs.started_at DESC
    `).bind(session.userId).all()
    
    return c.json(sessions.results || [])
  } catch (error) {
    console.error('Error:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// API - Statistiques voyant
app.get('/api/agent/stats', async (c) => {
  const { DB } = c.env
  const session = getSessionFromCookie(c.req.header('cookie'))
  
  if (!session || session.userType !== 'agent') {
    return c.json({ error: 'Non autorisé' }, 401)
  }
  
  try {
    // Total consultations
    const totalSessions = await DB.prepare(`
      SELECT COUNT(*) as count FROM chat_sessions WHERE agent_id = ? AND status = 'closed'
    `).bind(session.userId).first()
    
    // Chiffre d'affaires total
    const totalRevenue = await DB.prepare(`
      SELECT SUM(total_cost) as total FROM chat_sessions WHERE agent_id = ? AND status = 'closed'
    `).bind(session.userId).first()
    
    // Sessions actives
    const activeSessions = await DB.prepare(`
      SELECT COUNT(*) as count FROM chat_sessions WHERE agent_id = ? AND status = 'active'
    `).bind(session.userId).first()
    
    // Durée moyenne
    const avgDuration = await DB.prepare(`
      SELECT AVG(duration_minutes) as avg FROM chat_sessions WHERE agent_id = ? AND status = 'closed'
    `).bind(session.userId).first()
    
    return c.json({
      totalSessions: (totalSessions?.count as number) || 0,
      totalRevenue: (totalRevenue?.total as number) || 0,
      activeSessions: (activeSessions?.count as number) || 0,
      avgDuration: Math.round((avgDuration?.avg as number) || 0)
    })
  } catch (error) {
    console.error('Error:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// Pages légales
app.get('/contact', (c) => c.html('<h1>Page de contact - En construction</h1>'))
app.get('/confidentialite', (c) => c.html('<h1>Politique de confidentialité - En construction</h1>'))
app.get('/cgv', (c) => c.html('<h1>Conditions générales - En construction</h1>'))

export default app
