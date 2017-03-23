#!/bin/bash

AVD_DIR="${AVD_DIR:=${HOME}/.android/avd}"

[ ! -d "${AVD_DIR}" ] && >&2 echo "Can't find directory: ${AVD_DIR}" && exit 1

EMULATOR="${EMULATOR:=${1}}"

for avd in $(cd "${AVD_DIR}" && find -mindepth 1 -maxdepth 1 -type d)
do
  avd="${avd:2:-4}"

  if [[ -z "${EMULATOR}" || "${EMULATOR}" = "${avd}" ]];
  then
    echo "Starting emulator: ${avd}" && emulator -avd "${avd}" && exit 0
  fi
done

[ ! -z "${EMULATOR}" ] && >&2 echo "Could not find emulator: ${EMULATOR}" && exit 1

>&2 echo "No emulator available" && exit 1
