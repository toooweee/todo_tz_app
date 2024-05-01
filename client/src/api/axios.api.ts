import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper.ts";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Добавляем interceptor для всех запросов
instance.interceptors.request.use(
  (config) => {
    // Получаем токен из локального хранилища
    const token = getTokenFromLocalStorage();
    // Если токен существует, добавляем его в заголовок Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { instance };
