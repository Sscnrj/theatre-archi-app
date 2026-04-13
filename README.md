# TheatreArchiApp

Application de gestion de theatre composee de :
- `apps/backend` : API Spring Boot (spectacles, reservations, admin).
- `apps/web` : frontend Angular (refait a neuf, sans Nx).
- `services/auth-service` : microservice NestJS d'authentification.
- `services/payment-service` : microservice NestJS de paiement.
- `infra` : Docker Compose pour PostgreSQL.

## Prerequis
- Node.js 20+
- Java 21+
- Maven 3.9+
- Docker (pour la base locale)

## Demarrage local
Depuis la racine du repo :

1. Base de donnees :
   ```bash
   npm run dev:db
   ```
2. Backend Spring :
   ```bash
   npm run dev:back
   ```
3. Microservice auth (optionnel si front en mode demo) :
   ```bash
   npm run dev:auth
   ```
4. Frontend Angular :
   ```bash
   npm run dev:web
   ```

### Frontend sans microservice auth
Pour lancer le front en mode demo (bypass auth + session locale simulee) :
```bash
npm run dev:web:no-auth
```

## Tests
- Frontend (integration Angular) :
  ```bash
  npm run test:web
  ```
- Backend Spring :
  ```bash
  npm run test:back
  ```
- Auth-service :
  ```bash
  npm run test:auth
  ```
- Payment-service :
  ```bash
  npm run test:payment
  ```

## Migration et seed Liquibase (manuel)
Le backend est configure pour une execution **manuelle** des migrations Liquibase.

1. Demarrer PostgreSQL :
   ```bash
   npm run dev:db
   ```
2. Appliquer la structure + le seed fake :
   ```bash
   cd apps/backend
   mvn clean resources:resources liquibase:update
   ```

Le seed injecte un jeu de donnees de test sur le schema backend actuel :
- 12 fake spectacles (mix passe + futur)
- 120 reservations
- 30 utilisateurs simules via `userId`/`userEmail`
- 240 billets simules via `nombrePlaces`
