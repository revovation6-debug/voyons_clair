// Pages HTML pour l'application de voyance

export const loginPage = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - Voyance Premium</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
      .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    </style>
</head>
<body class="gradient-bg min-h-screen flex items-center justify-center p-6">
    <div class="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <div class="text-center mb-8">
            <i class="fas fa-moon text-purple-600 text-5xl mb-4"></i>
            <h1 class="text-3xl font-bold text-gray-800">Connexion</h1>
            <p class="text-gray-600 mt-2">Accédez à votre espace personnel</p>
        </div>

        <div id="error-message" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"></div>

        <form id="login-form" class="space-y-6">
            <div>
                <label class="block text-gray-700 font-semibold mb-2">Type de compte</label>
                <select id="user-type" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="user">Client</option>
                    <option value="agent">Voyant</option>
                    <option value="admin">Administrateur</option>
                </select>
            </div>

            <div>
                <label class="block text-gray-700 font-semibold mb-2">Email</label>
                <input type="email" id="email" required 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                       placeholder="votre@email.fr">
            </div>

            <div>
                <label class="block text-gray-700 font-semibold mb-2">Mot de passe</label>
                <input type="password" id="password" required 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                       placeholder="••••••••">
            </div>

            <button type="submit" 
                    class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                <i class="fas fa-sign-in-alt mr-2"></i>
                Se connecter
            </button>
        </form>

        <div class="mt-6 text-center">
            <p class="text-gray-600">
                Pas encore de compte ? 
                <a href="/register" class="text-purple-600 font-semibold hover:text-purple-700">Inscrivez-vous</a>
            </p>
            <a href="/" class="text-gray-500 hover:text-gray-700 mt-4 inline-block">
                <i class="fas fa-arrow-left mr-2"></i>
                Retour à l'accueil
            </a>
        </div>

        <div class="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p class="font-semibold mb-2">Comptes de test :</p>
            <p>👤 Client: client1@test.fr / client123</p>
            <p>🔮 Voyant: marie@voyance.fr / agent123</p>
            <p>⚙️ Admin: admin@voyance.fr / admin123</p>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
      document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const errorDiv = document.getElementById('error-message');
        errorDiv.classList.add('hidden');
        
        const userType = document.getElementById('user-type').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
          const response = await axios.post('/api/auth/login', {
            userType,
            email,
            password
          });
          
          if (response.data.success) {
            // Rediriger selon le type d'utilisateur
            if (userType === 'admin') {
              window.location.href = '/admin/dashboard';
            } else if (userType === 'agent') {
              window.location.href = '/agent/dashboard';
            } else {
              window.location.href = '/client/dashboard';
            }
          }
        } catch (error) {
          errorDiv.textContent = error.response?.data?.error || 'Erreur de connexion';
          errorDiv.classList.remove('hidden');
        }
      });
    </script>
</body>
</html>
`;

export const registerPage = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription - Voyance Premium</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
      .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    </style>
</head>
<body class="gradient-bg min-h-screen flex items-center justify-center p-6">
    <div class="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <div class="text-center mb-8">
            <i class="fas fa-user-plus text-purple-600 text-5xl mb-4"></i>
            <h1 class="text-3xl font-bold text-gray-800">Inscription</h1>
            <p class="text-gray-600 mt-2">Créez votre compte client</p>
        </div>

        <div id="error-message" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"></div>
        <div id="success-message" class="hidden bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"></div>

        <form id="register-form" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">Prénom</label>
                    <input type="text" id="prenom" required 
                           class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                           placeholder="Jean">
                </div>
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">Nom</label>
                    <input type="text" id="nom" required 
                           class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                           placeholder="Dupont">
                </div>
            </div>

            <div>
                <label class="block text-gray-700 font-semibold mb-2">Email</label>
                <input type="email" id="email" required 
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                       placeholder="votre@email.fr">
            </div>

            <div>
                <label class="block text-gray-700 font-semibold mb-2">Téléphone</label>
                <input type="tel" id="telephone" 
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                       placeholder="06 12 34 56 78">
            </div>

            <div>
                <label class="block text-gray-700 font-semibold mb-2">Mot de passe</label>
                <input type="password" id="password" required minlength="6"
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                       placeholder="••••••••">
                <p class="text-xs text-gray-500 mt-1">Minimum 6 caractères</p>
            </div>

            <div>
                <label class="block text-gray-700 font-semibold mb-2">Confirmer le mot de passe</label>
                <input type="password" id="confirm-password" required 
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                       placeholder="••••••••">
            </div>

            <div class="flex items-center">
                <input type="checkbox" id="terms" required class="mr-2">
                <label for="terms" class="text-sm text-gray-700">
                    J'accepte les <a href="/cgv" class="text-purple-600 hover:underline">conditions générales</a>
                </label>
            </div>

            <button type="submit" 
                    class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                <i class="fas fa-user-plus mr-2"></i>
                S'inscrire
            </button>
        </form>

        <div class="mt-6 text-center">
            <p class="text-gray-600">
                Déjà un compte ? 
                <a href="/login" class="text-purple-600 font-semibold hover:text-purple-700">Connectez-vous</a>
            </p>
            <a href="/" class="text-gray-500 hover:text-gray-700 mt-4 inline-block">
                <i class="fas fa-arrow-left mr-2"></i>
                Retour à l'accueil
            </a>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
      document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const errorDiv = document.getElementById('error-message');
        const successDiv = document.getElementById('success-message');
        errorDiv.classList.add('hidden');
        successDiv.classList.add('hidden');
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (password !== confirmPassword) {
          errorDiv.textContent = 'Les mots de passe ne correspondent pas';
          errorDiv.classList.remove('hidden');
          return;
        }
        
        const formData = {
          prenom: document.getElementById('prenom').value,
          nom: document.getElementById('nom').value,
          email: document.getElementById('email').value,
          telephone: document.getElementById('telephone').value,
          password: password
        };
        
        try {
          const response = await axios.post('/api/auth/register', formData);
          
          if (response.data.success) {
            successDiv.textContent = 'Inscription réussie ! Redirection vers la connexion...';
            successDiv.classList.remove('hidden');
            
            setTimeout(() => {
              window.location.href = '/login';
            }, 2000);
          }
        } catch (error) {
          errorDiv.textContent = error.response?.data?.error || 'Erreur lors de l\'inscription';
          errorDiv.classList.remove('hidden');
        }
      });
    </script>
</body>
</html>
`;
