FROM node:alpine


WORKDIR /src


COPY package.json yarn.lock ./


RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4173

CMD ["yarn", "start"]
