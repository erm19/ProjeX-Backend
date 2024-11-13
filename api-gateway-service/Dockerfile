FROM node:22.11.0-alpine3.19 as base

WORKDIR /home/node/api-gw

COPY package.json .

RUN npm i

COPY . .

FROM base as production

ENV NODE_PATH=./dist

RUN npm run build