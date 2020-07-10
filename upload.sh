#!/bin/bash
rootPath=$PWD


# 把某文件夹(nginx) 放到 某文件夹下(etc)(服务器上)
rsync -av -e ssh --exclude='node_modules' --exclude='.git' --exclude='package-*' --exclude='dist' --exclude='upload.sh' ${rootPath} root@39.106.53.163:/root/www/


