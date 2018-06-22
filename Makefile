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

include ./builds/test.mk
include ./builds/prod.mk
