FROM node:alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package.json yarn.lock ./

RUN yarn install


COPY . .

RUN yarn build


CMD ["yarn","start"]
