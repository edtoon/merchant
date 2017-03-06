#!/bin/bash

set -o errexit

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
BIN_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${BIN_DIR}/../config.sh"

if ! "${BIN_DIR}/check_mysql.sh";
then
    sudo docker stop "${DB_DOCKER}" > /dev/null 2>&1 || true
    sudo docker rm "${DB_DOCKER}" > /dev/null 2>&1 || true

    sudo docker build -t merchantgg/mysql "${BIN_DIR}/../docker/mysql"

    sudo mkdir -p "${DATA_DIR}"

    sudo docker run -d --name "${DB_DOCKER}" -v "${DATA_DIR}:/var/lib/mysql" -v "${DATA_DIR}:/home/mysql" \
        -e MYSQL_ROOT_PASSWORD="${DB_ROOT_PASSWORD}" merchantgg/mysql

    until "${BASE_DIR}/bin/check_mysql.sh"
    do
        sleep 1
    done

    echo "CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\` CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin" | \
        sudo docker exec -i "${DB_DOCKER}" mysql -uroot -p"${DB_ROOT_PASSWORD}"
    echo "GRANT ALL ON \`${DB_DATABASE}\`.* TO '${DB_USERNAME}'@'%' IDENTIFIED BY '${DB_PASSWORD}'" | \
        sudo docker exec -i "${DB_DOCKER}" mysql -uroot -p"${DB_ROOT_PASSWORD}"
fi
