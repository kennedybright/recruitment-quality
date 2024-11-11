# webinfra-example-app-backend

![Alt text](https://cloud.githubusercontent.com/assets/1668687/17767926/a4b9f6a0-653a-11e6-9be5-fd42657ac185.png)

## FrontEnd
[FrontEnd Repo](https://gitlab.com/nielsen-media/maf/examples/webinfra-example-app-frontend)

## Available Scripts

### `npm start`

Starts the app using [nodemon](https://github.com/remy/nodemon).<br>

### `npm test`

Runs tests with [tape](https://github.com/substack/tape). And coverage using [nyc](https://github.com/istanbuljs/nyc/).<br>

### `npm lint`

Runs [Standard](https://github.com/feross/standard).<br>

### `npm lint:fix`

[Standard](https://github.com/feross/standard) fixes.<br>

### `npm dbMigrate:prod`

Creates a schema and runs [dbMigrate](https://github.com/db-migrate/node-db-migrate) for prod.<br>

### `npm dbMigrate`

Creates a schema and runs [dbMigrate](https://github.com/db-migrate/node-db-migrate) for dev/ci.<br>

### `npm dbMigrate:add <name>`

Adds a new [dbMigrate](https://github.com/db-migrate/node-db-migrate) migration.<br>

## Example calls

### app to app calls

inside the `app2appCall` module controller

### infra configuration service calls

inside the `configCall` module controller

### infra notification service calls

inside the `notificationCall` module controller

### multiple versions calls

inside the `versionedCall` module controller

### db calls

inside the `dbCall` module controller

### echo calls

inside the `echo` module controller

## How to run project

```
cd app
yarn install
yarn run dbMigrate
yarn start
```

## How to Setup
Follow the [instructions using maf-cli](https://nielsen-media.gitlab.io/maf/maf-public/media-application-framework/docs/in-depth/guide-setup-maf-env-with-example-app))

## Build the app to use the docker compose

```
docker build -t exmpl_app .
docker-compose up
```

The `docker-compose-prod.yml` file is meant to be used with docker stack.
Currently docker stack [doesn't support an env file](https://github.com/moby/moby/issues/29133) so the usage is:

```
env $(cat .env | grep ^[A-Z] | xargs) docker stack deploy --compose-file=docker-compose-prod.yml --with-registry-auth exmpl
```
