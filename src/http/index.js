import axios from "axios"; // Библиотека для запросов на сервер

// API запросов на сервер для авторизации логина и чека пользователя

//Для обычных запросов
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL

})

// Для Авторизованных запросов
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// Достаем токен для запросов от авторищзованных пользователей

const authInterceptor = config =>{
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}
//Добавляем токен в запрос
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}