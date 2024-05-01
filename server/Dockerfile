# Используем образ Node.js
FROM node:latest

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости и устанавливаем их
COPY server/package*.json ./
RUN npm install

# Копируем все файлы сервера
COPY server/ .

# Устанавливаем глобальные зависимости
RUN npm install -g @nestjs/cli

# Экспортируем порт приложения
EXPOSE 5000

# Команда для запуска сервера
CMD ["npm", "run", "start:dev"]
