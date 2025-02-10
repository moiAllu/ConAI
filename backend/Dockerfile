#devlopment stage
FROM node:20 as devlopment

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY  . .

CMD ["npm","run", "dev"]

