# Yggdrasil

The monorepo that contains all the services that make up the Yggdrasil platform.

#### Table of contents


- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Getting started](#getting-started)
  - [Creating a new application](#creating-a-new-application)
  - [Generating a migration](#generating-a-migration)
- [Testing](#testing)
  - [Running the e2e tests](#running-the-e2e-tests)

## Development

### Prerequisites

* Install [NodeJS v16.13.0+](https://nodejs.org/en/download/).
* Install [Yarn](https://yarnpkg.com/).
* Install [Docker 17.12.0+](https://docs.docker.com/install/).
* Install [Docker Compose](https://docs.docker.com/compose/install/).

<sup>[Back to top ^](#table-of-contents)</sup>

### Getting started

1. Install dependencies:

```shell
yarn install
```

2. Run Docker compose:
```shell
docker-compose up
```

<sup>[Back to top ^](#table-of-contents)</sup>

### Creating a new application

1. TBC

2. Add the new application to the [docker-compose.yml](./docker-compose.yml) using the format similar to the others:
```yaml
awesome_service:
  build:
    context: .
    dockerfile: images/node/Dockerfile # or another custom image
    target: application
  container_name: awesome_service
  depends_on:
    - db
  entrypoint: "yarn start:watch"
  env_file:
    - apps/container_name/.env.dev
  image: yggdrasil/container_name
  networks:
    - yggdrasil # this is the internal network
  ports:
    - "3000"
  volumes:
    - ./node_modules:/usr/app/node_modules:cached # use the local node_modules
    - ./apps/awesome_service:/usr/app/apps/awesome_service:cached
    - ./libs:/usr/app/libs:cached
```

<sup>[Back to top ^](#table-of-contents)</sup>

### Generating a migration

1. To generate a new migration use the following command:
```bash
yarn migrations:generate valhalla InsertMigrationNameHere
```

<sup>[Back to top ^](#table-of-contents)</sup>

## Testing

### Running the e2e tests

1. The following command will perform several actions;
   * it will start the (testing) docker containers,
   * wait for a health check on the `heimdallr` application,
   * run the tests against the docker containers,
   * stop and remove all the containers
```shell
yarn test:e2e
```

> 💡 **TIP:** If you want to not run all tests in the script, for instance you want to use an external test runner in your IDE, you can start the testing docker containers using:
> ```shell
> docker-compose -f docker-compose.test.yml -p yggdrasil_test up
> ```
> Then once the containers are up and running, you can use `jest` (ensure you use the `--runInBand` flag because a database is used and will cause data integrity problems):
> ```shell
> jest --runInBand
> ```

<sup>[Back to top ^](#table-of-contents)</sup>
