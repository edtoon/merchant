#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
CADDY_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${CADDY_DIR}/../config.sh"
. "${CADDY_DIR}/../lib/lib-docker.sh"

CADDY_DOCKER="${CADDY_DOCKER:=${APP_NAME}_caddy}"

if [ "production" != "${ENV}" ];
then
    exit 0
fi

if [ -z "$(sudo docker ps -a --filter name=^/"${CADDY_DOCKER}"$ --filter status=running --format {{.ID}})" ];
then
    sudo docker stop "${CADDY_DOCKER}" > /dev/null 2>&1 || true
    sudo docker rm "${CADDY_DOCKER}" > /dev/null 2>&1 || true

    sudo docker build -t merchantgg/caddy "${CADDY_DIR}/../docker/caddy"

    sudo mkdir -p "${DATA_DIR}/caddy"
    sudo mkdir -p "${DATA_DIR}/inkhero/upload"
    mkdir -p "${CADDY_DIR}/dist"

    TMP_DIR="$(mktemp -d)"

    for file in $(ls ${CADDY_DIR}/*.caddy)
    do
        perl -p -e 's/\$\{([^}]+)\}/defined $ENV{$1} ? $ENV{$1} : $&/eg' \
            < "${file}" \
            > "${TMP_DIR}/$(basename ${file})"
    done

    for site in api login ui
    do
        caddy_host=$(echo "${site}" | awk '{print toupper($0)}')
        host_var="${caddy_host}_HOST"
        caddy_host="${!host_var}"
        site_ip="$(docker_ip ${APP_NAME}_${site})"

        if [ -z "${site_ip}" ];
        then
          >&2 echo "ERROR - no running container for site: ${site}"
        else
            cat > "${TMP_DIR}/${site}.caddy" << __EOF__
                ${caddy_host} {
                    log stdout
                    tls support@merchant.gg
                    gzip
                    proxy / ${site_ip}:80 {
                        transparent
                    }
                }
__EOF__
        fi
    done

    mkdir -p "${CADDY_DIR}/dist"
    cat ${TMP_DIR}/*.caddy > ${TMP_DIR}/Caddyfile
    mv ${TMP_DIR}/Caddyfile "${CADDY_DIR}/dist/Caddyfile"
    rm -rf ${TMP_DIR}

    sudo docker run -d --name "${CADDY_DOCKER}" \
        -v "${CADDY_DIR}/dist/Caddyfile:/etc/Caddyfile" \
        -v "${DATA_DIR}/caddy:/root/.caddy" \
        -v "${DATA_DIR}/inkhero/upload:/srv/content" \
        -p 80:80 -p 443:443 \
        merchantgg/caddy
fi
