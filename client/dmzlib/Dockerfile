FROM node:18-alpine

WORKDIR /app

RUN apk update && apk add --no-cache yarn

COPY ./ ./dmzlib

COPY ../router ./router

EXPOSE 3001

RUN yarn install

RUN yarn build

CMD ["yarn","start"]