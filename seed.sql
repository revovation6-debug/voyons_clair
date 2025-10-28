-- Données de test pour le développement
-- Note: Les mots de passe sont hashés avec btoa() (Base64)

-- Insérer un admin par défaut
-- Password: admin123 (hashé: YWRtaW4xMjM=)
INSERT OR IGNORE INTO admins (email, password, nom, prenom) VALUES 
  ('admin@voyance.fr', 'YWRtaW4xMjM=', 'Dupont', 'Jean');

-- Insérer quelques agents de voyance
-- Password: agent123 (hashé: YWdlbnQxMjM=)
INSERT OR IGNORE INTO agents (email, password, nom, prenom, specialite, description, tarif_minute, is_online) VALUES 
  ('marie@voyance.fr', 'YWdlbnQxMjM=', 'Martin', 'Marie', 'Tarot', 'Experte en lecture de tarot avec 15 ans d''expérience', 2.50, 1),
  ('sophie@voyance.fr', 'YWdlbnQxMjM=', 'Bernard', 'Sophie', 'Astrologie', 'Spécialiste en astrologie et thème astral', 3.00, 1),
  ('lucas@voyance.fr', 'YWdlbnQxMjM=', 'Dubois', 'Lucas', 'Numérologie', 'Expert en numérologie et guidance spirituelle', 2.80, 0),
  ('emma@voyance.fr', 'YWdlbnQxMjM=', 'Moreau', 'Emma', 'Médiumnité', 'Médium pure avec don de voyance depuis l''enfance', 3.50, 1);

-- Insérer quelques clients de test
-- Password: client123 (hashé: Y2xpZW50MTIz)
INSERT OR IGNORE INTO users (email, password, nom, prenom, telephone) VALUES 
  ('client1@test.fr', 'Y2xpZW50MTIz', 'Lefebvre', 'Pierre', '0612345678'),
  ('client2@test.fr', 'Y2xpZW50MTIz', 'Simon', 'Julie', '0623456789'),
  ('client3@test.fr', 'Y2xpZW50MTIz', 'Laurent', 'Marc', '0634567890');

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
