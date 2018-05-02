#Dockerfile文件
FROM docker.io/node

# Create app directory
RUN mkdir -p /home/demo
WORKDIR /home/demo

# Bundle app source
COPY . /home/demo

RUN npm install

EXPOSE 5000

CMD [ "npm", "start" ]