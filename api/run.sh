#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
API_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${API_DIR}/../config.sh"
. "${API_DIR}/../lib/lib-hostile.sh"

"${API_DIR}/../bin/run_mysql.sh"

API_DOCKER="${API_DOCKER:=${APP_NAME}_api}"
NODE_ACTION="${NODE_ACTION:=dev}"

if [ "production" = "${NODE_ENV}" ];
then
    NODE_ACTION="start"
fi

if [ -z "$(sudo docker ps -a --filter name=^/"${API_DOCKER}"$ --filter status=running --format {{.ID}})" ];
then
    sudo docker stop "${API_DOCKER}" > /dev/null 2>&1 || true
    sudo docker rm "${API_DOCKER}" > /dev/null 2>&1 || true

    sudo docker build -t merchantgg/node "${API_DIR}/../docker/node"

    DB_HOST="$(sudo docker inspect --format "{{.NetworkSettings.IPAddress}}" "${DB_DOCKER}")"
    DB_ARGS="--link ${DB_DOCKER}:${DB_DOCKER} -e DB_HOST=${DB_DOCKER} -e DB_DATABASE=${DB_DATABASE} -e DB_USERNAME=${DB_USERNAME} -e DB_PASSWORD=${DB_PASSWORD}"
    HTTP_ARGS="-e BASE_HOST=${BASE_HOST} -e HOST=${API_HOST}"
    VOL_ARGS="-w /app -v ${API_DIR}:/app -v ${API_DIR}/../common:/common:ro"

    sudo docker run -it --rm ${VOL_ARGS} ${DB_ARGS} merchantgg/node npm run migrate || true
    sudo docker run -d ${VOL_ARGS} ${DB_ARGS} ${HTTP_ARGS} --name "${API_DOCKER}" \
        -e NODE_ENV="${NODE_ENV}" \
        merchantgg/node bash -c "npm rebuild && npm run ${NODE_ACTION}"

    CONTAINER_IP="$(sudo docker inspect --format "{{.NetworkSettings.IPAddress}}" "${API_DOCKER}")"
    hostile_exec set "${CONTAINER_IP}" "${API_HOST}"
fi
