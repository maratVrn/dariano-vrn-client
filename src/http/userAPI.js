// Функция регистрации, авторизации, роверка токена на валидность
import  {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";  // npm i jwt-decode Для того чтобы распарсить токен



export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
// Вызывается при обновлении страницы и проверяется что если пользователь тот же его не выкидывает
// Проверяет на валидность токена если невалид то разлогинивается
export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const userDone = () => {
    localStorage.setItem('token', '')
 //   return jwtDecode(data.token)
}