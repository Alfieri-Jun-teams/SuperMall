######################
start:
	@docker run --name supermall_pro -d -p 4000:4000 \
		-v /home/supermall/node_modules \
		-v /home/supermall/logs \
		super \
		npm start
  
remove:
	@docker rm -f supermall_pro

# master
update:
	@git checkout master
	@git pull
	@$(RUN) supermall_pro npm install
	@docker restart supermall_pro