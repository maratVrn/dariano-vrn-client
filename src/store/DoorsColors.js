import {makeAutoObservable} from "mobx";
//----------------------------------- DoorsColors ------------------------------------------------------
export default class DoorsColors{
    constructor() {
        this._doorsColors = []
        this._selectedDColors = {}
        this._isNewDoorsColor = false // Используем для формы создания/редактирвоания клиента
        makeAutoObservable(this) // mobx будет следить за изменением переменных и если что компоненты будут переренд
    }

    setIsNewDoorsColor(isNewDoorsColor){
        this._isNewDoorsColor = isNewDoorsColor
    }

    get isNewDoorsColor(){
        return this._isNewDoorsColor
    }

    setDoorsColors(doorsColors){
        this._doorsColors = doorsColors
    }

    get DoorsColors(){
        return this._doorsColors
    }

    setSelectedDoorsColor(dColor){
        this._selectedDColors = dColor
    }
    getSelectedDoorsColor(){
        return this._selectedDColors
    }

}
