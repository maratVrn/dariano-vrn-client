//----------------------------------- FittingColors ------------------------------------------------------
import {makeAutoObservable} from "mobx";
// TODO: Сделать универсальным
export default class DataStore{
    constructor() {
        this._data = []
        this._selectOne= {}
        this._isNew = false // Используем для формы создания/редактирвоания клиента

        this._selectedNum = -1; // Используем для списков где нет ИД там используем номер элемента в массиве (списки дверей погонажа и фурнитуры в заказе)
        makeAutoObservable(this) // mobx будет следить за изменением переменных и если что компоненты будут переренд
    }

    setIsNew(isNew){
        this._isNew = isNew
    }

    get isNew(){
        return this._isNew
    }

    setSelectedNum(num){
        if (num < 0) num = 0
        if (num >  this._data.length-1 ) num = this._data.length-1
        this._selectedNum = num
    }

    get selectedNum(){
        return this._selectedNum
    }


    setData(data) {

        this._data = data
    }

    get Data(){
        return this._data
    }

    setSelectedOne(oneData){
        this._selectOne = oneData
    }
    getSelectedOne(){
        return this._selectOne
    }

}