# Description: Dockerfile for the frontend service
#delopment stage
FROM node:20 as development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY  . .

# production stage