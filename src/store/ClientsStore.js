import {makeAutoObservable} from "mobx";

export default class Clients{
    constructor() {
        this._clients = []
        this._selectedClient = {}
        this._selectedNum = -1   // Номер элемента который выбран
        this._isNewClient = false // Используем для формы создания/редактирвоания клиента
        makeAutoObservable(this) // mobx будет следить за изменением переменных и если что компоненты будут переренд
    }

    setIsNewClient(isNewClient){
        this._isNewClient = isNewClient
    }

    get IsNewClient(){
        return this._isNewClient
    }

    setClient(clients){
        this._clients = clients
        this.setSelectedClientByNum()
    }

    get Clients(){
        return this._clients
    }

    setSelectedClients(client){
        this._selectedClient = client
        this._selectedNum = this._clients.indexOf(client)
    }
    getSelectedClient(){
        return this._selectedClient
    }

    setSelectedClientByNum(){
        if ((this._selectedNum >-1) && (this._selectedNum < this._clients.length)) {
            this.setSelectedClients(this._clients[this._selectedNum])
        } else if (this._clients.length>0) {
            this.setSelectedClients(this._clients[0])
        }
    }


}
