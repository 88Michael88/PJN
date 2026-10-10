build:
	sudo docker build -t pjn-lab1 .

run: 
	sudo docker run --rm -it \
		--name pjn-app \
		-p 3000:3000 \
		-v "$(CURDIR)/project:/usr/local/project" \
		-v pjn-node-modules:/usr/local/project/node_modules \
		pjn-lab1



