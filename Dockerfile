FROM node:8
WORKDIR /app
CMD ls -ltr && npm install && npm start