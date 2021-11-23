FROM node:16-alpine

WORKDIR /src

COPY package.json yarn.lock /src/

RUN yarn

CMD yarn start
