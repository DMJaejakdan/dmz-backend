FROM node:18-alpine

WORKDIR /app

RUN apk update && apk add --no-cache yarn

COPY ./archive ./archive

COPY ./router ./router

RUN cd ./archive

WORKDIR /app/archive

EXPOSE 3002

RUN yarn install

RUN yarn build

CMD ["yarn","start"]