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
