RUN = docker exec

clean:
	@echo "clean docker images..."
	@docker ps -aqf status=exited | xargs docker rm && docker images -qf dangling=true | xargs docker rmi
build:
	@docker build -t super .
rebuild:
	@make clean
	@make build

#################################################

start:
	@docker run --name supermall -d \
		-p 5000:5000 \
		-d super
stop:
	@docker stop supermall
remove:
	@docker rm -f supermall
update:
	@git checkout develop
	@git pull
	@make stop
	@make remove
	@make start
restart:
	@make stop
	@make remove
	@make start
