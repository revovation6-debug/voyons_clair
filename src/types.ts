// Types pour l'application de voyance

export type Bindings = {
  DB: D1Database;
}

export interface User {
  id: number;
  email: string;
  password: string;
  nom: string;
  prenom: string;
  telephone?: string;
  date_naissance?: string;
  created_at: string;
  last_login?: string;
  is_active: number;
}

export interface Agent {
  id: number;
  email: string;
  password: string;
  nom: string;
  prenom: string;
  specialite?: string;
  description?: string;
  photo_url?: string;
  tarif_minute: number;
  is_online: number;
  created_at: string;
  last_login?: string;
  is_active: number;
}

export interface Admin {
  id: number;
  email: string;
  password: string;
  nom: string;
  prenom: string;
  created_at: string;
  last_login?: string;
}

export interface ChatSession {
  id: number;
  user_id: number;
  agent_id: number;
  status: 'active' | 'closed' | 'pending';
  started_at: string;
  ended_at?: string;
  duration_minutes: number;
  total_cost: number;
}

export interface Message {
  id: number;
  chat_session_id: number;
  sender_type: 'user' | 'agent';
  sender_id: number;
  message: string;
  created_at: string;
  is_read: number;
}

export interface Review {
  id: number;
  agent_id?: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
  is_visible: number;
  created_by_admin: number;
}

export interface VisitStat {
  id: number;
  visit_date: string;
  page_views: number;
  unique_visitors: number;
  new_registrations: number;
  created_at: string;
}

export interface Transaction {
  id: number;
  user_id: number;
  agent_id: number;
  chat_session_id?: number;
  amount: number;
  transaction_date: string;
  status: string;
}

export interface SessionData {
  userId?: number;
  agentId?: number;
  adminId?: number;
  userType: 'user' | 'agent' | 'admin';
  email: string;
}
