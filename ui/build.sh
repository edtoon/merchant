#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
UI_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${UI_DIR}/../config.sh"

sudo docker build -t merchantgg/node "${UI_DIR}/../docker/node"
sudo docker run -it --rm -v "${UI_DIR}":/app -w /app merchantgg/node yarn install
sudo docker run -it --rm -v "${UI_DIR}":/app -w /app merchantgg/node npm run build
sudo docker run -it --rm -v "${UI_DIR}":/app -w /app merchantgg/node npm run test
