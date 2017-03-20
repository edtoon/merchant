#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
COMMON_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${COMMON_DIR}/../config.sh"

VOL_ARGS="-w /app -v ${COMMON_DIR}:/app"

sudo docker build -t merchantgg/node "${COMMON_DIR}/../docker/node"
sudo docker run -it --rm ${VOL_ARGS} merchantgg/node yarn install
sudo docker run -it --rm ${VOL_ARGS} merchantgg/node npm run build
sudo docker run -it --rm ${VOL_ARGS} merchantgg/node npm run test
