FROM node:18-alpine

WORKDIR /app

RUN apk update && apk add --no-cache yarn

COPY ./dmzlib ./dmzlib

COPY ./router ./router

RUN cd ./dmzlib

WORKDIR /app/dmzlib

EXPOSE 3002

RUN yarn install

RUN yarn build

CMD ["yarn","start"]