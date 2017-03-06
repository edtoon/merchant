#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
LOGIN_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${LOGIN_DIR}/../config.sh"
. "${LOGIN_DIR}/../lib/lib-hostile.sh"

"${LOGIN_DIR}/../bin/run_mysql.sh"

LOGIN_DOCKER="${LOGIN_DOCKER:=${APP_NAME}_login}"
NODE_ACTION="${NODE_ACTION:=dev}"

if [ "production" = "${NODE_ENV}" ];
then
    NODE_ACTION="start"
fi

if [ -z "$(sudo docker ps -a --filter name=^/"${LOGIN_DOCKER}"$ --filter status=running --format {{.ID}})" ];
then
    sudo docker stop "${LOGIN_DOCKER}" > /dev/null 2>&1 || true
    sudo docker rm "${LOGIN_DOCKER}" > /dev/null 2>&1 || true

    sudo docker build -t merchantgg/node "${LOGIN_DIR}/../docker/node"

    HTTP_ARGS="-e BASE_HOST=${BASE_HOST} -e HOST=${LOGIN_HOST}"
    VOL_ARGS="-w /app -v ${LOGIN_DIR}:/app"

    sudo docker run -d ${VOL_ARGS} ${HTTP_ARGS} --name "${LOGIN_DOCKER}" \
        -e NODE_ENV="${NODE_ENV}" \
        merchantgg/node bash -c "npm rebuild && npm run ${NODE_ACTION}"

    CONTAINER_IP="$(sudo docker inspect --format "{{.NetworkSettings.IPAddress}}" "${LOGIN_DOCKER}")"
    hostile_exec set "${CONTAINER_IP}" "${LOGIN_HOST}"
fi
