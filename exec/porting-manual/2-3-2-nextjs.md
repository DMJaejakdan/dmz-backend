# Server - Next.js

본 프로젝트에서는 총 4개의 Next.js 서버와 1개의 디펜던시를 사용함.

1. **frame** (ServerA:3000)
2. **dmzlib** (ServerA:3001)
3. **archive** (ServerA:3002)
4. **map** (ServerB:3000)
5. **shared**

**Dockerfile**

4개의 서버에 대해 각각 작성해줘야함.

```docker
FROM node:18-alpine

WORKDIR /app

RUN apk update && apk add --no-cache yarn

COPY ./<폴더명> ./<폴더명>

# 공유 디펜던시
COPY ./shared ./shared

RUN cd ./<폴더명>

WORKDIR /app/<폴더명>

EXPOSE <포트번호>

RUN yarn install

RUN yarn build

CMD ["yarn","start"]
```