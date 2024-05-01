# Используем образ Node.js
FROM node:latest

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости и устанавливаем их
COPY client/package*.json ./
RUN npm install

# Копируем все файлы клиента
COPY client/ .

# Экспортируем порт приложения
EXPOSE 5173

# Команда для запуска клиента
CMD [ "npm", "run", "dev" ]
