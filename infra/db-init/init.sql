
CREATE TABLE utilisateur (
                           id_utilisateur SERIAL PRIMARY KEY,
                           nom VARCHAR(100),
                           prenom VARCHAR(100),
                           email VARCHAR(150) NOT NULL UNIQUE,
                           mot_de_passe VARCHAR(255) NOT NULL,
                           role VARCHAR(20) NOT NULL,
                           date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           CONSTRAINT chk_role_utilisateur
                             CHECK (role IN ('USER', 'ADMIN'))
);

CREATE TABLE spectacle (
                         id_spectacle SERIAL PRIMARY KEY,
                         titre VARCHAR(150) NOT NULL,
                         description TEXT,
                         date_spectacle TIMESTAMP NOT NULL,
                         prix DECIMAL(8,2) NOT NULL,
                         image_url VARCHAR(255),
                         nb_places_total INT NOT NULL,
                         nb_places_restantes INT NOT NULL,
                         CONSTRAINT chk_places_restantes
                           CHECK (nb_places_restantes >= 0)
);

CREATE TABLE reservation (
                           id_reservation SERIAL PRIMARY KEY,
                           date_reservation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           montant_total DECIMAL(8,2),
                           statut VARCHAR(20) NOT NULL,
                           id_utilisateur INT NOT NULL,
                           CONSTRAINT chk_statut_reservation
                             CHECK (statut IN ('CONFIRMEE', 'ANNULEE')),
                           CONSTRAINT fk_reservation_utilisateur
                             FOREIGN KEY (id_utilisateur)
                               REFERENCES utilisateur(id_utilisateur)
                               ON DELETE CASCADE
);

CREATE TABLE billet (
                      id_billet SERIAL PRIMARY KEY,
                      prix_unitaire DECIMAL(8,2) NOT NULL,
                      id_reservation INT NOT NULL,
                      id_spectacle INT NOT NULL,
                      CONSTRAINT fk_billet_reservation
                        FOREIGN KEY (id_reservation)
                          REFERENCES reservation(id_reservation)
                          ON DELETE CASCADE,
                      CONSTRAINT fk_billet_spectacle
                        FOREIGN KEY (id_spectacle)
                          REFERENCES spectacle(id_spectacle)
                          ON DELETE CASCADE
);

