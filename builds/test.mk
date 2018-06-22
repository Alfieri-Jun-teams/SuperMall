##########################
start-test:
	@docker run --name supermall -d -p 3000:3000 \
		-v /home/supermall/node_modules \
		-v /home/supermall/logs:/app/logs \
		super \
		npm run dev

remove-test:
	@docker rm -f supermall

# develop
update-test:
	@git checkout develop
	@git pull
	@$(RUN) supermall npm install
	@docker restart supermall