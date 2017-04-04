#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
MODULE_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${MODULE_DIR}/../config.sh"
. "${MODULE_DIR}/../lib/lib-docker.sh"
. "${MODULE_DIR}/../lib/lib-hostile.sh"

"${MODULE_DIR}/../bin/run_mysql.sh"

MODULE_NAME="ui"
MODULE_HOST="${UI_HOST}"
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

    HTTP_ARGS="-e BASE_HOST=${BASE_HOST} -e HOST=${MODULE_HOST}"
    VOL_ARGS="-w /app -v ${MODULE_DIR}:/app -v ${MODULE_DIR}/../common:/common:ro"
    ADD_HOSTS=""

    if [ "production" != "${NODE_ENV}" ];
    then
        api_ip="$(docker_ip ${APP_NAME}_api)"

        if [ -z "${api_ip}" ];
        then
          >&2 echo "ERROR - no running api container"
        else
            ADD_HOSTS=" --add-host ${API_HOST}:${api_ip}"
        fi
    fi

    sudo docker run -d ${VOL_ARGS} ${HTTP_ARGS} --name "${MODULE_DOCKER}" \
        ${ADD_HOSTS} -e NODE_ENV="${NODE_ENV}" \
        merchantgg/node bash -c "npm rebuild && npm run ${NODE_ACTION}"

    [ "development" = "${ENV}" ] && hostile_alias "${MODULE_DOCKER}" "${MODULE_HOST}"
fi

true
