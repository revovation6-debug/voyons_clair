// Gestion de l'authentification simple
// Note: En production, utilisez des tokens JWT et des mots de passe hashés (bcrypt)

export function hashPassword(password: string): string {
  // Pour MVP: simple hash basique (à remplacer par bcrypt en production)
  return btoa(password)
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  return btoa(password) === hashedPassword
}

export function createSession(userId: number, userType: 'user' | 'agent' | 'admin', email: string): string {
  const sessionData = {
    userId,
    userType,
    email,
    timestamp: Date.now()
  }
  return btoa(JSON.stringify(sessionData))
}

export function verifySession(token: string): any | null {
  try {
    const decoded = atob(token)
    const sessionData = JSON.parse(decoded)
    
    // Vérifier si la session n'a pas expiré (24h)
    const now = Date.now()
    const maxAge = 24 * 60 * 60 * 1000 // 24 heures
    
    if (now - sessionData.timestamp > maxAge) {
      return null
    }
    
    return sessionData
  } catch {
    return null
  }
}

export function getSessionFromCookie(cookieHeader: string | null): any | null {
  if (!cookieHeader) return null
  
  const cookies = cookieHeader.split(';').map(c => c.trim())
  const sessionCookie = cookies.find(c => c.startsWith('session='))
  
  if (!sessionCookie) return null
  
  const token = sessionCookie.split('=')[1]
  return verifySession(token)
}
