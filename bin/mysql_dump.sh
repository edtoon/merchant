#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
BIN_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${BIN_DIR}/../config.sh"

sudo docker exec -it "${DB_DOCKER}" mysqldump --default-character-set=utf8 \
    -uroot -p${DB_ROOT_PASSWORD} $*
