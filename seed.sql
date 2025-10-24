-- Données de test pour le développement

-- Insérer un admin par défaut
INSERT OR IGNORE INTO admins (email, password, nom, prenom) VALUES 
  ('admin@voyance.fr', 'admin123', 'Dupont', 'Jean');

-- Insérer quelques agents de voyance
INSERT OR IGNORE INTO agents (email, password, nom, prenom, specialite, description, tarif_minute, is_online) VALUES 
  ('marie@voyance.fr', 'agent123', 'Martin', 'Marie', 'Tarot', 'Experte en lecture de tarot avec 15 ans d''expérience', 2.50, 1),
  ('sophie@voyance.fr', 'agent123', 'Bernard', 'Sophie', 'Astrologie', 'Spécialiste en astrologie et thème astral', 3.00, 1),
  ('lucas@voyance.fr', 'agent123', 'Dubois', 'Lucas', 'Numérologie', 'Expert en numérologie et guidance spirituelle', 2.80, 0),
  ('emma@voyance.fr', 'agent123', 'Moreau', 'Emma', 'Médiumnité', 'Médium pure avec don de voyance depuis l''enfance', 3.50, 1);

-- Insérer quelques clients de test
INSERT OR IGNORE INTO users (email, password, nom, prenom, telephone) VALUES 
  ('client1@test.fr', 'client123', 'Lefebvre', 'Pierre', '0612345678'),
  ('client2@test.fr', 'client123', 'Simon', 'Julie', '0623456789'),
  ('client3@test.fr', 'client123', 'Laurent', 'Marc', '0634567890');

-- Insérer quelques avis
INSERT OR IGNORE INTO reviews (agent_id, user_name, rating, comment, is_visible, created_by_admin) VALUES 
  (1, 'Marie L.', 5, 'Excellente consultation ! Marie a su me guider avec précision. Je recommande vivement.', 1, 1),
  (1, 'Pierre D.', 5, 'Très professionnelle et à l''écoute. Merci pour vos précieux conseils.', 1, 1),
  (2, 'Sophie M.', 5, 'Sophie est incroyable ! Son analyse astrologique était très juste.', 1, 1),
  (4, 'Jean B.', 5, 'Emma a un vrai don. Ses prédictions se sont réalisées !', 1, 1),
  (NULL, 'Caroline P.', 5, 'Plateforme très sérieuse et professionnelle. Je suis ravie de mes consultations.', 1, 1);

-- Initialiser les statistiques de visites pour aujourd'hui
INSERT OR IGNORE INTO visit_stats (visit_date, page_views, unique_visitors, new_registrations) VALUES 
  (date('now'), 0, 0, 0);
