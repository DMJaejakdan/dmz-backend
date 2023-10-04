FROM node:18-alpine

WORKDIR /app

RUN apk update && apk add --no-cache yarn

COPY ./map ./map

COPY ./shared ./shared

RUN cd ./map

WORKDIR /app/map

EXPOSE 3000

RUN yarn install

RUN yarn build

CMD ["yarn","start"]