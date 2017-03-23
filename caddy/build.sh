#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
CADDY_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${CADDY_DIR}/../config.sh"

sudo docker build -t merchantgg/caddy "${CADDY_DIR}/../docker/caddy"
