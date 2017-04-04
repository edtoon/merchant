#!/bin/bash

SOURCE="${BASH_SOURCE[0]}"
while [ -h "${SOURCE}" ]; do SOURCE="$(readlink "${SOURCE}")"; done
BASE_DIR="$( cd -P "$( dirname "${SOURCE}" )" && pwd )"

. "${BASE_DIR}/lib/lib-command.sh"

NODE_ENV="${NODE_ENV}"
ENV="${ENV:=${NODE_ENV}}"
APP_NAME="${APP_NAME:=mgg_saas}"
BASE_HOST="${BASE_HOST}"
DATA_DIR="/mnt/gg/merchant/${APP_NAME}/data"

if [ -z "${ENV}" ];
then
    if [ -f "/etc/ec2_version" ];
    then
        ENV="production"
    else
        ENV="development"
    fi
fi

[ -z "${NODE_ENV}" ] && NODE_ENV="${ENV}"

if [ -z "${BASE_HOST}" ];
then
    if [ "production" = "${ENV}" ];
    then
        BASE_HOST="merchant.gg"
    else
        BASE_HOST="merchant.local"
    fi
fi

export NODE_ENV ENV APP DATA_DIR
export DB_DATABASE="${APP_NAME}"
export DB_USERNAME="${APP_NAME}_user"
export DB_PASSWORD="${APP_NAME}_pass"
export DB_ROOT_PASSWORD="${APP_NAME}_root"
export DB_DOCKER="${APP_NAME}_db"
export WWW_HOST="www.${BASE_HOST}"
export LOGIN_HOST="login.${BASE_HOST}"
export API_HOST="api.${BASE_HOST}"
export UI_HOST="app.${BASE_HOST}"
