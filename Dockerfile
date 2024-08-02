FROM node:21

COPY package.json .

RUN npm install && npm install -g nodemon 

COPY . .

CMD [ "nodemon","server.js" ]