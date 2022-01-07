#FROM node:16.13.0-alpine AS dependencies
#
#COPY package.json .
#COPY yarn.lock .
#RUN yarn install

FROM node:16.13.0-alpine AS application

RUN apk --no-cache add curl

WORKDIR /usr/app

COPY package.json /usr/app
COPY tsconfig.json /usr/app
COPY nest-cli.json /usr/app
COPY ./apps/${APP_NAME} /usr/app/apps/${APP_NAME}
COPY ./libs /usr/app/libs

