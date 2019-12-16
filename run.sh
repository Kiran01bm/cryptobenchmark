#! /bin/bash

docker stop sboot_cryptocompare && docker rm sboot_cryptocompare && docker rmi node/cryptocompare:latest

docker-compose up -d

docker logs -f sboot_cryptocompare
