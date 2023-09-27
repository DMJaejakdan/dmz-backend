FROM node:18-alpine

WORKDIR /app

RUN apk update && apk add --no-cache yarn

COPY ./ ./

EXPOSE 3000

RUN yarn install

RUN yarn build

CMD ["yarn","start"]