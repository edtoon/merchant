#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
BASE_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${BASE_DIR}/config.sh"

MODULES="api login ui"

if [ "production" = "${ENV}" ];
then
    MODULES="${MODULES} www caddy"
fi

for module in ${MODULES}
do
    echo "======================"
    echo "Running: ${module}"
    echo "======================"
    "${BASE_DIR}/${module}/run.sh"
done
