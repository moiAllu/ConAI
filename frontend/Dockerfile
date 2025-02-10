# Description: Dockerfile for the frontend service
#delopment stage
FROM node:20 as development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY  . .

RUN npm run build

# production stage
FROM node:20 as production

COPY --from=development /app/.next .

CMD [ "npm", "start"]