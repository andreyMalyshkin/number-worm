FROM node:latest

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
