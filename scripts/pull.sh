#!/usr/bin/env bash

###
# Pulls or clones the required service repos, as specified in the services.json file.
###

source scripts/set_vars.sh

##
# Main function
##
function main() {
  set_vars
  mapfile -t service_names < <(jq -r '.[].name' services.json)
  mapfile -t service_source_urls < <(jq -r '.[].source_url' services.json)

  for ((idx=0; idx<${#service_names[@]}; ++idx)); do
    local name=${service_names[${idx}]}
    local repo_dir="../${name}/"
    local source_url=${service_source_urls[${idx}]}

    # Check if the repo exists at the root level, if it doesn't clone it.
    if [ -d "${repo_dir}" ]; then
      if [ -z "$(cd "${repo_dir}" && git status --porcelain)" ]; then
        cd "${repo_dir}"
        {
          git pull origin "$(git symbolic-ref --short -q HEAD)"
        } || {
          printf "%b Unable to pull: ${repo_dir}\n\n" "${ERROR_PREFIX}"
          continue
        }

        printf "\n%b Successfully pulled: ${name}\n\n" "${INFO_PREFIX}"
      else
        printf "%b Not pulling ${name} because local repo has been modified\n\n" "${INFO_PREFIX}"
      fi
    else
      git clone "${source_url}" "${repo_dir}"
    fi
  done
}

# And so, it begins...
main
