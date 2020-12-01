# Usage:
# make        	# Pulls the repos, installs the dependencies and creates the env files.
# make env      # Checks each service in the services.json file for an env file and creates a local version.
# make pull		# Pulls repos that are specified in the services.json file.
# make install	# Installs dependencies for all the repos specified in services.json.
# make update	# Pulls the latest and re-installs dependencies.

.PHONY: all pull install env

SCRIPT_DIR = ./scripts

all: pull install env

env:
	${SCRIPT_DIR}/env.sh

install:
	${SCRIPT_DIR}/install.sh

pull:
	${SCRIPT_DIR}/pull.sh

update: pull install
