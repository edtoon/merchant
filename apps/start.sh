#!/bin/bash

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
BASE_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

cd "${BASE_DIR}"

APP="${APP:=${1}}"

for dir in $(find -mindepth 1 -maxdepth 1 -type d)
do
  dir="${dir:2}"

  if [[ -z "${APP}" || "${APP}" = "${dir}" ]];
  then
    echo "Starting app: ${dir}"
    cd "${dir}"
    react-native start
    exit 0
  fi
done

[ ! -z "${APP}" ] && 2>&1 echo "Could not find app: ${APP}" && exit 1

2>&1 echo "No app available" && exit 1
