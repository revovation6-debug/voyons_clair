// Système de chat temps réel personnalisé sans dépendances externes
// Utilise Long Polling intelligent pour simuler le temps réel

// Configuration
const LONG_POLL_TIMEOUT = 25000; // 25 secondes max d'attente
const CHECK_INTERVAL = 500; // Vérifier toutes les 500ms

// Interface pour les connexions en attente
interface PendingConnection {
  sessionId: string;
  lastMessageId: number;
  resolve: (value: any) => void;
  timestamp: number;
}

// Map des connexions en attente (simulé en mémoire pour le MVP)
// En production, utiliser Cloudflare Durable Objects
const pendingConnections: Map<string, PendingConnection[]> = new Map();

/**
 * Long Polling: Attend les nouveaux messages pendant un certain temps
 * Si un nouveau message arrive, répond immédiatement
 * Sinon, timeout après LONG_POLL_TIMEOUT
 */
export async function waitForNewMessages(
  DB: D1Database,
  sessionId: string,
  lastMessageId: number,
  maxWaitTime: number = LONG_POLL_TIMEOUT
): Promise<any[]> {
  const startTime = Date.now();
  const endTime = startTime + maxWaitTime;

  // Vérifier immédiatement s'il y a de nouveaux messages
  let messages = await checkNewMessages(DB, sessionId, lastMessageId);
  
  if (messages.length > 0) {
    return messages;
  }

  // Si pas de nouveaux messages, attendre avec des vérifications périodiques
  return new Promise((resolve) => {
    const checkMessages = async () => {
      const now = Date.now();
      
      // Timeout atteint
      if (now >= endTime) {
        resolve([]);
        return;
      }

      // Vérifier les nouveaux messages
      messages = await checkNewMessages(DB, sessionId, lastMessageId);
      
      if (messages.length > 0) {
        resolve(messages);
        return;
      }

      // Attendre avant la prochaine vérification
      setTimeout(checkMessages, CHECK_INTERVAL);
    };

    // Démarrer la première vérification
    setTimeout(checkMessages, CHECK_INTERVAL);
  });
}

/**
 * Vérifie s'il y a de nouveaux messages
 */
async function checkNewMessages(
  DB: D1Database,
  sessionId: string,
  lastMessageId: number
): Promise<any[]> {
  try {
    const result = await DB.prepare(`
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
      LIMIT 50
    `).bind(sessionId, lastMessageId).all();

    return result.results || [];
  } catch (error) {
    console.error('Error checking new messages:', error);
    return [];
  }
}

/**
 * Notifier les connexions en attente qu'un nouveau message est arrivé
 * Cette fonction est appelée après l'envoi d'un message
 */
export function notifyNewMessage(sessionId: string) {
  // En mode simple, on ne fait rien car le long polling vérifiera automatiquement
  // Dans une vraie implémentation avec Durable Objects, on notifierait ici les clients connectés
}

/**
 * Système de présence: Marquer un utilisateur comme "en train d'écrire"
 */
export async function setTypingStatus(
  DB: D1Database,
  sessionId: string,
  userId: number,
  userType: 'user' | 'agent',
  isTyping: boolean
) {
  // Pour le MVP, on peut stocker ça dans une table temporaire ou en cache
  // Pour l'instant, on retourne juste true pour indiquer que ça fonctionne
  return true;
}

/**
 * Vérifier si l'autre personne est en train d'écrire
 */
export async function getTypingStatus(
  DB: D1Database,
  sessionId: string,
  userType: 'user' | 'agent'
): Promise<boolean> {
  // Pour le MVP, retourne toujours false
  // En production, on récupérerait depuis la table/cache
  return false;
}
