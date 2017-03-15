#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
BASE_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${BASE_DIR}/config.sh"

for container in inkhero www ui login api
do
    echo "======================"
    echo "Stopping: ${container}"
    echo "======================"
    sudo docker stop "${APP_NAME}_${container}" > /dev/null 2>&1 || true
done

sudo docker stop mgg_saas_db