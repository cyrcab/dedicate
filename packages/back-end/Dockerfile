FROM node:19 as builder
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY lerna.json ./
COPY nx.json ./

COPY /packages/back-end ./packages/back-end

EXPOSE 5001

RUN npm run install:all:build
RUN npm run init:prisma
RUN npm install pm2 -g


CMD ["pm2-runtime", "app.js"]