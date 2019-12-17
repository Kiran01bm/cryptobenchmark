#! /bin/bash

docker stop sboot_javacrypto && docker rm sboot_javacrypto && docker rmi springboot:javacrypto

docker-compose up -d

docker logs -f sboot_javacrypto
