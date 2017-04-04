#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
BIN_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${BIN_DIR}/../config.sh"

SITE="${SITE:=inkhero.merchant.gg}"
SRC_DIR="${SRC_DIR:=${BIN_DIR}/../}"
TARGET_DIR="${TARGET_DIR:=/mnt/gg/merchant/${APP_NAME}/src/current}"

sudo chown -R "${USER}" "${SRC_DIR}"
ssh "${SITE}" -- sudo chown -R ubuntu:ubuntu "${TARGET_DIR}"
rsync -Pav -e 'ssh -C' \
  --exclude 'apps' --exclude 'dist' --exclude 'node_modules' --exclude '.next' \
  --exclude 'yarn.lock' --exclude 'npm-debug.log' \
  "${SRC_DIR}/" "${SITE}:${TARGET_DIR}"
