#!/bin/bash

PROJECT=${PWD##*/}

if [[ $1 = 'config' ]]; then

    cat ./kernel/.env.example >> ./kernel/.env
    echo "Don't forget to change your SECRET_KEY"
    echo "https://djecrety.ir/ can help you!"
    cat ./kernel/config/local_settings.example >> ./kernel/config/local_settings.py

    exit 0
fi

if [[ $1 = 'ssl' ]]; then
    wget https://acme-v02.api.letsencrypt.org/directory
    mv directory letsencrypt
    exit 0
fi

if [[ $1 = 'build' ]]; then
    docker-compose up -d --build webclient
    docker exec ${PROJECT}_webclient_1 npm i
    docker exec ${PROJECT}_webclient_1 npm run build
    docker-compose down

    cp -r client/dist kernel/weblient/
    rm -rf client/dist/
    exit 0
fi

rm -rf docs/
rm -rf kernel/.devcontainer/
rm -rf client/.devcontainer/

docker-compose up -d --build nginx
echo "Deployed with <3 by PBD"


