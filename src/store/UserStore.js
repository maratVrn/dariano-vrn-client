import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this) // mobx будет следить за изменением переменных и если что компоненты будут переренд
    }

    setIsAuth(bool){
        this._isAuth = bool
    }

    setUser(user){
        this._user = user
    }

    get isAuth(){
        return this._isAuth
    }


    get user(){
        return this._user
    }
}