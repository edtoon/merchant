#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
MODULE_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${MODULE_DIR}/../config.sh"
. "${MODULE_DIR}/../lib/lib-hostile.sh"

"${MODULE_DIR}/../bin/run_mysql.sh"

MODULE_NAME="api"
MODULE_HOST="${API_HOST}"
MODULE_DOCKER="${MODULE_DOCKER:=${APP_NAME}_${MODULE_NAME}}"
NODE_ACTION="${NODE_ACTION:=dev}"

if [ "production" = "${NODE_ENV}" ];
then
    NODE_ACTION="start"
fi

if [ -z "$(sudo docker ps -a --filter name=^/"${MODULE_DOCKER}"$ --filter status=running --format {{.ID}})" ];
then
    sudo docker stop "${MODULE_DOCKER}" > /dev/null 2>&1 || true
    sudo docker rm "${MODULE_DOCKER}" > /dev/null 2>&1 || true

    sudo docker build -t merchantgg/node "${MODULE_DIR}/../docker/node"

    DB_HOST="$(sudo docker inspect --format "{{.NetworkSettings.IPAddress}}" "${DB_DOCKER}")"
    DB_ARGS="--link ${DB_DOCKER}:${DB_DOCKER} -e DB_HOST=${DB_DOCKER} -e DB_DATABASE=${DB_DATABASE} -e DB_USERNAME=${DB_USERNAME} -e DB_PASSWORD=${DB_PASSWORD}"
    HTTP_ARGS="-e BASE_HOST=${BASE_HOST} -e HOST=${MODULE_HOST}"
    VOL_ARGS="-w /app -v ${MODULE_DIR}:/app -v ${MODULE_DIR}/../common:/common:ro"

    sudo docker run -it --rm ${VOL_ARGS} ${DB_ARGS} merchantgg/node npm run migrate || true
    sudo docker run -d ${VOL_ARGS} ${HTTP_ARGS} ${DB_ARGS} --name "${MODULE_DOCKER}" \
        -e NODE_ENV="${NODE_ENV}" \
        merchantgg/node bash -c "npm rebuild && npm run ${NODE_ACTION}"

    CONTAINER_IP="$(sudo docker inspect --format "{{.NetworkSettings.IPAddress}}" "${MODULE_DOCKER}")"
    hostile_exec set "${CONTAINER_IP}" "${MODULE_HOST}"
fi
