#!/bin/bash
# update apt-get just in case
apt-get update -y
# get node into apt-get
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
# install node and npm in one line
apt-get install nodejs
# install pm2 to restart node app
npm install pm2 -g
