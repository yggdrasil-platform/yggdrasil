#!/usr/bin/env bash

###
# Creates the platform in docker containers and runs tests against them.
###

source ./scripts/set_vars.sh

##
# Main function
##
function main {
  local attempt
  local health
  local service_name

  attempt=0
  health=starting
  service_name=heimdallr_test

  EXTERNAL_APP_PORT=3001
  EXTERNAL_DB_PASSWORD="password"
  EXTERNAL_DB_PORT=5433
  EXTERNAL_DB_USER="admin"
  export EXTERNAL_APP_PORT EXTERNAL_DB_PASSWORD EXTERNAL_DB_PORT EXTERNAL_DB_USER

  set_vars

  # start the services
  docker-compose \
    -p yggdrasil_test \
    -f docker-compose.test.yml \
    up \
    -d

  while [ ${attempt} -le 29 ]; do
    attempt=$(( attempt + 1 ))

    printf "%b waiting for docker healthcheck (%b), attempt: %b...\n" "${INFO_PREFIX}" "${health}" "${attempt}"

    health=$(docker inspect -f "{{.State.Health.Status}}" "${service_name}")

    if [[ "${health}" == "healthy" || "${health}" == "unhealthy" ]]; then
      printf "%b docker service %b status: %b\n" "${INFO_PREFIX}" "${service_name}" "${health}"
      break
    fi

    sleep 5
  done

  # if the services are up and running, we can run tests
  if [[ "${health}" == "healthy" ]]; then
    "${BIN_PATH}"/jest --runInBand
  else
    docker logs --details "${service_name}"
  fi

  # stop the services and remove
  docker-compose \
    -p yggdrasil_test \
    -f docker-compose.test.yml \
    down
}

# And so, it begins...
main
