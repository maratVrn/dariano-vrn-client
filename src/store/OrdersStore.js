import {makeAutoObservable} from "mobx";

export default class Orders{
    constructor() {
        this._orders = []
        this._selectedOrder = {}
        makeAutoObservable(this) // mobx будет следить за изменением переменных и если что компоненты будут переренд
    }

    setOrders(orders){
        this._orders = orders
    }

    get Orders(){
        return this._orders
    }

    setSelectedOrder(order){
        this._selectedOrder = order
    }
    getSelectedOrder(){
        return this._selectedOrder
    }

}