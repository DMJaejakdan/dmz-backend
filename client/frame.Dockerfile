FROM node:18-alpine

WORKDIR /app

RUN apk update && apk add --no-cache yarn

COPY ./frame ./frame

COPY ./shared ./shared

RUN cd ./frame

WORKDIR /app/frame

EXPOSE 3000

RUN yarn install

RUN yarn build

CMD ["yarn","start"]