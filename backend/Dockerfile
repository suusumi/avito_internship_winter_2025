FROM node:20

WORKDIR /app

COPY backend/package.json ./

RUN npm install

COPY backend/ .

EXPOSE 3001

CMD ["node", "app.js"]
