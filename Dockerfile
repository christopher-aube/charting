FROM node:16

WORKDIR /dist

COPY ./ ./

RUN npm install

CMD ["node", "dist/server/index.js"]