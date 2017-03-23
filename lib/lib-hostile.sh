#!/bin/bash

if [ -z "${LIB_DIR}" ];
then
  SOURCE="${BASH_SOURCE[0]}"
  while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
  LIB_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"
fi

. "${LIB_DIR}/lib-command.sh"

if [ -z "${_LIB_HOSTILE_}" ];
then
  _LIB_HOSTILE_=1

  [ -f "${LIB_DIR}/../node_modules/.bin/hostile" ] || (cd "${LIB_DIR}/.."; npm install hostile)
fi

function hostile_exec {
  command_sudo_or_reg "${LIB_DIR}/../node_modules/.bin/hostile" $*
}

function hostile_alias {
  local container_name="$1"
  shift
  local container_ip="$(sudo docker inspect --format "{{.NetworkSettings.IPAddress}}" "${container_name}")"
  hostile_exec set "${container_ip}" $*
}
