FROM node:14-alpine3.13

WORKDIR /app

RUN apk --no-cache add --virtual builds-deps build-base python3 curl git

COPY package.json yarn.lock .yarnrc.yml .dockerignore ./
COPY .yarn ./.yarn/
COPY apidoc.config.js .sequelizerc jest.config.js tsconfig.json ./
COPY .env .env.test ./
COPY db ./db/
COPY src ./src/
COPY misc ./misc/
COPY static ./static/

ENV TZ 'UTC'

RUN yarn set version 3.1.1
RUN yarn install

RUN yarn build
RUN yarn apidoc

EXPOSE 80

CMD ["yarn", "start"]
