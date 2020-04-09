FROM node:12.16.1

RUN apt-get update
RUN apt-get -y install poppler-utils mysql-server

WORKDIR /app
COPY ./package*.json ./
RUN npm ci

COPY ./src/scripts/wait-for-db.sh ./
RUN chmod +x ./wait-for-db.sh

EXPOSE 3000

CMD ["sh","./src/scripts/wait-for-db.sh", "npm", "run", "dev"]