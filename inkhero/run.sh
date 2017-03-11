#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
SITE_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${SITE_DIR}/../config.sh"

SITE_DOCKER="${SITE_DOCKER:=${APP_NAME}_inkhero}"

if [ "production" != "${NODE_ENV}" ];
then
    exit 0
fi

if [ -z "$(sudo docker ps -a --filter name=^/"${SITE_DOCKER}"$ --filter status=running --format {{.ID}})" ];
then
    sudo docker stop "${SITE_DOCKER}" > /dev/null 2>&1 || true
    sudo docker rm "${SITE_DOCKER}" > /dev/null 2>&1 || true

    sudo docker build -t merchantgg/caddy "${SITE_DIR}/../docker/caddy"

    sudo mkdir -p "${DATA_DIR}/inkhero/caddy"
    sudo mkdir -p "${DATA_DIR}/inkhero/upload"
    sudo docker run -d --name "${SITE_DOCKER}" \
        -v "${SITE_DIR}/Caddyfile:/etc/Caddyfile" \
        -v "${DATA_DIR}/inkhero/caddy:/root/.caddy" \
        -v "${DATA_DIR}/inkhero/upload:/srv/content" \
        -p 80:80 -p 443:443 \
        merchantgg/caddy
fi
