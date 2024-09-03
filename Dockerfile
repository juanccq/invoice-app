# syntax=docker/dockerfile:1
FROM node:lts-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]