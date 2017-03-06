#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
API_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${API_DIR}/../config.sh"

sudo docker build -t merchantgg/node "${API_DIR}/../docker/node"
sudo docker run -it --rm -v "${API_DIR}":/app -w /app merchantgg/node yarn install
sudo docker run -it --rm -v "${API_DIR}":/app -w /app merchantgg/node npm run test
