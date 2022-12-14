// Функция регистрации, авторизации, роверка токена на валидность
import  {$authHost, $host} from "./index";




export const createClient = async (client) => {
    try {
        const {data} = await $authHost.post('api/client', client)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}

export const updateClient = async (client) => {
    try {
        const {data} = await $authHost.put('api/client', client)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}
}

export const getClients = async () => {
    try {
        const {data} = await $authHost.get('api/client')
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}
}

export const delClient = async (clientId) => {
    const {data} = await $host.delete('api/client/'+clientId.toString())
    return data
}