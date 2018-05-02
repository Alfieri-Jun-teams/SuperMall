RUN = docker exec

clean:
	@echo "clean docker images..."
	@docker ps -aqf status=exited | xargs docker rm && docker images -qf dangling=true | xargs docker rmi
build:
	@docker build -t knex .
rebuild:
	@make clean
	@make build

#################################################

start:
	@docker run --name knex-app -d \
		-p 5000:5000 \
		-d knex
remove:
	@docker rm -f knex-app
update:
	@git checkout develop
	@git pull
	@docker restart knex-app
restart:
	@make remove
	@make start
	@make update
update-only-server:
	@git pull
	@docker restart knex-app
