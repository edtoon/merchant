#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
MODULE_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${MODULE_DIR}/../config.sh"

VOL_ARGS="-w /app -v ${MODULE_DIR}:/app -v ${MODULE_DIR}/../common:/common:ro"

sudo docker build -t merchantgg/node "${MODULE_DIR}/../docker/node"
sudo rm -rf "${MODULE_DIR}/node_modules/gg-*"
sudo docker run -it --rm ${VOL_ARGS} merchantgg/node yarn add --force file:/common
sudo docker run -it --rm ${VOL_ARGS} merchantgg/node yarn install
sudo bash -c 'for dir in $(ls -d '${MODULE_DIR}'/node_modules/gg-*); do cp -rf $dir/dist/* $dir/; done'
sudo docker run -it --rm ${VOL_ARGS} merchantgg/node npm run test
