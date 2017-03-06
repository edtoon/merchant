#!/bin/bash

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
BIN_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${BIN_DIR}/../config.sh"

status="0"

if [ "dev" = "${ENV}" ];
then
    if [ ! -z "$(sudo docker ps -a --filter name=^/"${DB_DOCKER}"$ --filter status=running --format {{.ID}})" ];
    then
        sudo docker exec "${DB_DOCKER}" mysqladmin ping --silent
        status="$?"
    else
        status="1"
    fi
else
    >2 echo "Skipping ${DB_DOCKER}, ${APP_NAME} uses RDS in non-dev environments"
fi

exit "${status}"
