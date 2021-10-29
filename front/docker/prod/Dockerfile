FROM node:16-alpine

WORKDIR /src

COPY . /src/

RUN yarn install --force && yarn cache clean && yarn build

# Criar o container final mais leve com nginx com apenas projeto compilado
FROM nginx:alpine

COPY --from=0 /src/build /usr/share/nginx/html

COPY --from=0 /src/docker/prod/nginx.conf /etc/nginx/conf.d/default.conf