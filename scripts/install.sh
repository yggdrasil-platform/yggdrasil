#!/usr/bin/env bash

###
# Installs all the dependencies for each of the services.
###

source scripts/set_vars.sh

##
# Main function
##
function main() {
  set_vars
  mapfile -t service_names < <(jq -r '.[].name' services.json)

  for ((idx=0; idx<${#service_names[@]}; ++idx)); do
    local name=${service_names[${idx}]}
    local repo_dir="../${name}/"

    # Check if the repo exists.
    if [ -d "${repo_dir}" ]; then
      cd "${repo_dir}" || continue

      printf "\n%b Installing dependencies for ${name}...\n\n" "${INFO_PREFIX}"
      yarn install
    fi
  done
}

# And so, it begins...
main
