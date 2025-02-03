# Base image
FROM node:22.11.0-alpine AS base
WORKDIR /ent-tenders-service
COPY package*.json ./

# Development Stage
FROM base AS development
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# Build Stage
FROM base AS build
ENV NODE_ENV=production
RUN npm ci
COPY . .
RUN npm run build

# Production Stage
FROM node:22.11.0-alpine AS production
WORKDIR /ent-tenders-service
ENV NODE_ENV=production
COPY --from=build /ent-tenders-service/dist ./dist
COPY --from=build /ent-tenders-service/package*.json ./
RUN npm ci
CMD ["node", "dist/server.js"]
