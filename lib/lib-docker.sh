#!/bin/bash

if [ -z "${LIB_DIR}" ];
then
  SOURCE="${BASH_SOURCE[0]}"
  while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
  LIB_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"
fi

. "${LIB_DIR}/lib-command.sh"

if [ -z "${_LIB_DOCKER_}" ];
then
  _LIB_DOCKER_=1
fi

function docker_ip {
  sudo docker inspect --format "{{.NetworkSettings.IPAddress}}" "$1" | tr -d '\040\011\012\015'
}
