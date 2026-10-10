FROM node:26-alpine3.23
LABEL descryption="PJN_Lab1"

WORKDIR /usr/local/project

RUN npm install -g nodemon

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

CMD ["sh", "/usr/local/bin/entrypoint.sh"]
