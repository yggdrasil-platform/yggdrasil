#!/usr/bin/env bash

###
# Creates .env files for each service.
###

source scripts/set_vars.sh

CONFIG_DIR=.config

##
# Main function
##
function main() {
  set_vars
  mapfile -t service_names < <(jq -r '.[].name' services.json)

  # Remove the previous config dir and create a new one.
  rm -rf "${CONFIG_DIR}"
  mkdir "${CONFIG_DIR}"

  for ((idx=0; idx<${#service_names[@]}; ++idx)); do
    local name=${service_names[${idx}]}
    local repo_dir="../${name}/"
    local dir="${CONFIG_DIR}"/"${name}"

    # Check if the repo exists and it has a .env.dev file.
    if [ -d "${repo_dir}" ] && [ -f "${repo_dir}"/.env.dev ]; then
      printf "%b Creating .env file for ${name}...\n" "${INFO_PREFIX}"
      [ -d "${dir}" ] || mkdir "${dir}"
      [ -f "${dir}"/.env ] || cp "${repo_dir}"/.env.dev "${dir}"/.env
    fi
  done
}

# And so, it begins...
main
