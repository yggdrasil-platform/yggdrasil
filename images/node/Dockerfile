FROM node:16.13.0-alpine AS dependencies

COPY package.json .
COPY yarn.lock .
RUN yarn install

FROM node:16.13.0-alpine AS application

ARG app_name

WORKDIR /usr/app

COPY package.json /usr/app
COPY tsconfig.json /usr/app
COPY nest-cli.json /usr/app
COPY ./apps/${app_name} /usr/app/apps/${app_name}
COPY ./libs /usr/app/libs

