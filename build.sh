#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
BASE_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${BASE_DIR}/config.sh"

"${BASE_DIR}/bin/run_mysql.sh"

for build_file in `ls ${BASE_DIR}/*/build.sh`
do
    echo "======================"
    echo "Running: ${build_file}"
    echo "======================"
    "${build_file}"
done
