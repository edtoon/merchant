#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
WWW_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${WWW_DIR}/../config.sh"

TMP_DIR="$(mktemp -d)"

for file in $(ls "${WWW_DIR}/src")
do
    perl -p -e 's/\$\{([^}]+)\}/defined $ENV{$1} ? $ENV{$1} : $&/eg' \
        < "${WWW_DIR}/src/${file}" \
        > "${TMP_DIR}/${file}"
done

rm -rf "${WWW_DIR}/dist"
mv "${TMP_DIR}" "${WWW_DIR}/dist"
chmod 755 "${WWW_DIR}/dist"
