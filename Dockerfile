#Dockerfile文件
FROM docker.io/node:8.9.4-alpine

RUN mkdir /app
WORKDIR /app
ADD . /app
RUN npm install
RUN npm install production

EXPOSE 3000
EXPOSE 4000