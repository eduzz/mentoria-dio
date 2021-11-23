FROM node:16-alpine

WORKDIR /src

COPY package.json /src/
COPY yarn.lock /src/

RUN yarn install

ADD . /src

RUN set -x \
  && yarn tsc \
  && yarn install --production --force \
  && mv /src/dist /dist \
  && mv /src/node_modules /dist/node_modules \
  && mv /src/package.json /dist/package.json

FROM node:16-alpine

COPY --from=0 /dist /var/www

WORKDIR /var/www

CMD node /var/www/index.js
