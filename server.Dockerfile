FROM node:22-alpine

WORKDIR /app

RUN npm i -g json-server

COPY src/data/dev-data-junk.json .

EXPOSE 3004

CMD [ "json-server", "--watch", "dev-data-junk.json", "--port", "3004" ]