include make-commands.mk

NODE_ENV ?= development
PROJECT_NAME := sappchat-backend
RUN := run --rm

ifeq ($(USE_NFSMOUNT), true)
	DOCKER_COMPOSE_FILES := -f docker-compose.yml -f docker-compose.nfsmount.yml
else
	DOCKER_COMPOSE_FILES := -f docker-compose.yml
endif

DOCKER_COMPOSE := docker-compose $(DOCKER_COMPOSE_FILES) --project-name $(PROJECT_NAME)
DOCKER_COMPOSE_RUN := $(DOCKER_COMPOSE) $(RUN)

provision: install db-migrate test-migrate

install:
	${DOCKER_COMPOSE_RUN} -e "NODE_ENV=${NODE_ENV}" app yarn install

api:
	${DOCKER_COMPOSE_RUN} -e "NODE_ENV=${NODE_ENV}" --service-ports api

dump:
	${DOCKER_COMPOSE_RUN} -e "NODE_ENV=${NODE_ENV}" app yarn db:dump

db-migrate:
	${DOCKER_COMPOSE_RUN} -e "NODE_ENV=${NODE_ENV}" app yarn db:migrate

db-rollback:
	${DOCKER_COMPOSE_RUN} -e "NODE_ENV=${NODE_ENV}" app yarn db:rollback

test:
	${DOCKER_COMPOSE_RUN} -e "NODE_ENV=test" app yarn test

test-update:
	${DOCKER_COMPOSE_RUN} -e "NODE_ENV=test" app yarn test -u -- schema.spec

test-migrate:
	${DOCKER_COMPOSE_RUN} -e "NODE_ENV=test" app yarn db:migrate

sh:
	${DOCKER_COMPOSE_RUN} -e "NODE_ENV=${NODE_ENV}" app /bin/sh

bash:
	${DOCKER_COMPOSE_RUN} -e "NODE_ENV=${NODE_ENV}" app /bin/bash

down:
	${DOCKER_COMPOSE} down

down-v:
	${DOCKER_COMPOSE} down -v

build:
	${DOCKER_COMPOSE} build

rebuild:
	${DOCKER_COMPOSE} build --force-rm

logs:
	${DOCKER_COMPOSE} logs

psql:
	${DOCKER_COMPOSE_RUN} app psql postgresql://postgres@db/sappchat

psql-test:
	${DOCKER_COMPOSE_RUN} app psql postgresql://postgres@db/sappchat_test
