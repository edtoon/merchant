#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
WWW_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${WWW_DIR}/../config.sh"
. "${WWW_DIR}/../lib/lib-hostile.sh"

WWW_DOCKER="${WWW_DOCKER:=${APP_NAME}_www}"

if [ -z "$(sudo docker ps -a --filter name=^/"${WWW_DOCKER}"$ --filter status=running --format {{.ID}})" ];
then
    sudo docker stop "${WWW_DOCKER}" > /dev/null 2>&1 || true
    sudo docker rm "${WWW_DOCKER}" > /dev/null 2>&1 || true

    "${WWW_DIR}/build.sh"

    VOL_ARGS="-w /usr/share/nginx/html -v ${WWW_DIR}/dist:/usr/share/nginx/html"

    sudo docker run -d ${VOL_ARGS} --name "${WWW_DOCKER}" \
        nginx:alpine

    [ "development" = "${ENV}" ] && hostile_alias "${WWW_DOCKER}" "${WWW_HOST}"
fi

true
