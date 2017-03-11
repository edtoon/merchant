#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
BIN_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${BIN_DIR}/../config.sh"

rsync -Pav -e 'ssh -C' ${excludes} "${BIN_DIR}/../" "inkhero.merchant.gg:/mnt/gg/merchant/${APP_NAME}/src/current"
