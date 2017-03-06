#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
UI_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${UI_DIR}/../config.sh"
. "${UI_DIR}/../lib/lib-hostile.sh"

"${UI_DIR}/../bin/run_mysql.sh"

UI_DOCKER="${UI_DOCKER:=${APP_NAME}_ui}"
NODE_ACTION="${NODE_ACTION:=dev}"

if [ "production" = "${NODE_ENV}" ];
then
    NODE_ACTION="start"
fi

if [ -z "$(sudo docker ps -a --filter name=^/"${UI_DOCKER}"$ --filter status=running --format {{.ID}})" ];
then
    sudo docker stop "${UI_DOCKER}" > /dev/null 2>&1 || true
    sudo docker rm "${UI_DOCKER}" > /dev/null 2>&1 || true

    sudo docker build -t merchantgg/node "${UI_DIR}/../docker/node"

    HTTP_ARGS="-e BASE_HOST=${BASE_HOST} -e HOST=${UI_HOST}"
    VOL_ARGS="-w /app -v ${UI_DIR}:/app"

    sudo docker run -d ${VOL_ARGS} ${HTTP_ARGS} --name "${UI_DOCKER}" \
        -e NODE_ENV="${NODE_ENV}" \
        merchantgg/node bash -c "npm rebuild && npm run ${NODE_ACTION}"

    CONTAINER_IP="$(sudo docker inspect --format "{{.NetworkSettings.IPAddress}}" "${UI_DOCKER}")"
    hostile_exec set "${CONTAINER_IP}" "${UI_HOST}"
fi
