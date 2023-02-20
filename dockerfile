FROM node:lts-alpine

WORKDIR /app

COPY ./package.json /app

RUN npm install
RUN npm install -g http-server

COPY . .

ENTRYPOINT [ "http-server" ]