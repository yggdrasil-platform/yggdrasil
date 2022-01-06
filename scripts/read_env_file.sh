#!/usr/bin/env bash

source ./scripts/set_vars.sh

function read_env_file() {
  set -a

  if [ ! -f "${1}/.env.dev" ]; then
    printf "%b env file at ${1} exists \n" "${ERROR_PREFIX}"
    exit 1
  fi

  source "${1}/.env.dev"

  set +a
}
