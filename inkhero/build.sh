#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
UI_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${UI_DIR}/../config.sh"

sudo docker build -t merchantgg/caddy "${UI_DIR}/../docker/caddy"
