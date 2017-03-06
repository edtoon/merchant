#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
BASE_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${BASE_DIR}/config.sh"

for module in api login ui www
do
    echo "======================"
    echo "Running: ${module}"
    echo "======================"
    "${BASE_DIR}/${module}/run.sh"
done
