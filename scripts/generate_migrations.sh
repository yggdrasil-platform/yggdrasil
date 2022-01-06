#!/usr/bin/env bash

###
# Generates a migration for the specified application.
###

source ./scripts/set_vars.sh
source ./scripts/read_env_file.sh

##
# Main function
##
function main {
  local application_directory

  set_vars

  if [ -z "$1" ]; then
    printf "%b no application specified, use: yarn migrations:generate [application] \n" "${ERROR_PREFIX}"
    exit 1
  fi

  application_directory="apps/${1}"

  if [ ! -d "${application_directory}" ]; then
    printf "%b invalid application \n" "${ERROR_PREFIX}"
    exit 1
  fi

  if [ -z "$2" ]; then
    printf "%b no migration name specified, use: yarn migrations:generate ${1} [name] \n" "${ERROR_PREFIX}"
    exit 1
  fi

  # get the env vars from the apps/<application_name>/.env.dev
  read_env_file "${application_directory}"

  # use local host - we are accessing from outside the docker container
  DB_HOST=127.0.0.1
  export DB_HOST

  printf "%b Generating migrations for ${application_directory}... \n" "${INFO_PREFIX}"

  node \
    -r ts-node/register \
    -r tsconfig-paths/register \
    node_modules/typeorm/cli.js \
    --config "${application_directory}/ormconfig.ts" \
    migration:generate -n "${2}"
}

# And so, it begins...
main "$1" "$2"
