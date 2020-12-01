# Local Yggdrasil Platform

Runs the local Yggdrasil platform using Docker Compose.

#### Table of contents

- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Misc](#misc)
  - [Updating dependencies](#updating-dependencies)
  - [Adding a new service](#adding-a-new-service)
  - [Database access](#database-access)

## Prerequisites

* Install [NodeJS 12.6.0+](https://nodejs.org/en/download/).
* Install [Yarn](https://yarnpkg.com/).
* Install [Docker 17.12.0+](https://docs.docker.com/install/).
* Install [Docker Compose](https://docs.docker.com/compose/install/).
* Install [jq](https://stedolan.github.io/jq/download/).

## Usage

1. Run the Makefile to set up dependencies and configurations.
* This pulls all the repos that are needed;
* installs all the necessary dependencies, and;
* creates the `.env` files in a `.config` directory that is used by Docker.
```bash
make
```

2. To start the services, simply run:
```bash
docker-compose up
```

## Misc

### Updating dependencies

As the services change, you will need to pull again and update any dependencies. Simply run:

```shell script
make update
```

### Adding a new service

1. Add a new JSON object to the array stored in the [services.json](./services.json), this ensures the `Makefile` scripts know where to find the service.

```json
{
  "name": "REPO_NAME",
  "source_url": "git@github.com:USER/REPO_NAME.git"
}
```

2. Add the new service to the [docker-compose.yml](./docker-compose.yml) using the format similar to the others:
```yaml
awesome-service:
    container_name: awesome_service
    image: kieraroneill/awesome_service
    build:
      context: ./images/node12.6.0-alpine # Use one of the images in the ./images directory, or roll your own!
    volumes:
      - ../awesome-service-repo-name:/usr/app:delegated
    env_file:
      - ./.config/awesome-service-repo-name/.env # An optional step, if the env file is needed.
    working_dir: /usr/app
    ports:
      - "1337:1337"
    command: yarn start # This is the step that start the dev/watch process.
    depends_on:
      - awesome_service_db
```

### Database access

Each database can be accessed locally using the below host and ports. For each connection use the following credentials:
- Username: `admin`
- Password: `password`

| Service                 | Host + port                                    |
| :---------------------- | :--------------------------------------------- |
| `valkyrie`              | [http://localhost:3011](http://localhost:3011) |

**NOTE:** When adding a new service database, ensure you don't use a conflicting port in the `docker-compose.yml` configuration.

