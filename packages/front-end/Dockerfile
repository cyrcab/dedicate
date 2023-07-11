FROM node:19 as builder
WORKDIR /app


COPY package.json ./
COPY package-lock.json ./
COPY lerna.json ./
COPY nx.json ./

COPY /packages/front-end ./packages/front-end

EXPOSE 3000

RUN npm run install:all:build
RUN npm run build:front