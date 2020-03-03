FROM node:lts-alpine AS builder

# définit le dossier 'app' comme dossier de travail
WORKDIR /app

# copie 'package.json' et 'package-lock.json' (si disponible)
COPY package*.json ./

# installe les dépendances du projet
RUN npm install

# copie les fichiers et dossiers du projet dans le dossier de travail (par exemple : le dossier 'app')
COPY . .

# construit l'app pour la production
RUN npm run build

FROM node:lts-alpine

WORKDIR /app
COPY --from=builder /app/dist .
EXPOSE 2345
CMD [ "npx", "http-server", ".", "-p 2345" ]