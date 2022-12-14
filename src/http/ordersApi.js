import {$authHost, $host} from "./index";

export const createOrder = async (order) => {
    try {

        const {data} = await $authHost.post('api/orders', order)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}
export const getOrders= async (clientId) => {
    const {data} = await $authHost.get('api/orders', clientId)
    return data
}

export const getOrdersOneClient= async (clientId) => {
    const {data} = await $authHost.get('api/orders/'+clientId.toString())
   // console.log(JSON.parse(data[1].doorData));
    return data
}

export const updateOrder = async (order) => {
    try {
        const {data} = await $authHost.put('api/orders', order)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}

export const deleteOrder = async (orderId) => {
    const {data} = await $host.delete('api/orders/'+orderId.toString())
    return data
}