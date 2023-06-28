FROM node:20-alpine3.17

COPY * /

WORKDIR /

RUN npm install

CMD ["node", "app.js"]