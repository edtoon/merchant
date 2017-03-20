#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
BASE_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${BASE_DIR}/config.sh"

"${BASE_DIR}/bin/run_mysql.sh"

for module in common api login ui www inkhero
do
    echo "======================"
    echo "Building: ${module}"
    echo "======================"
    "${BASE_DIR}/${module}/build.sh"
done
