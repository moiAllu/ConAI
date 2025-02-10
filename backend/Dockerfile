# Development stage
FROM node:20 as development 

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]

# Production stage
FROM node:20 as production

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production 

# Corrected stage reference (development, not devlopment)
COPY --from=development /app/dist ./dist  

CMD ["node", "dist/src/index.js"]
