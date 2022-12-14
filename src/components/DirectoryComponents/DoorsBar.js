import React, {useContext, useEffect, useState} from 'react';
import {DOORS_COLLECTIONS} from "../../utils/const";
import {Tab, Tabs} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {
    deleteDoor,
    getClassicModel,
    getDoors,
    getDoorsColors,
    getModernModel,
    getNeoClassicModel
} from "../../http/directorysApi";
import DoorsEdit from "./modals/DoorEdit";


const DoorsBar = observer( () => {

    const {doors}           = useContext(Context);
    const {classicModels}   = useContext(Context);
    const {newDoorInfo}     = useContext(Context);
    const {showDoors}       = useContext(Context);

    const [doorsEditVisible, setDoorsEditVisible] = useState(false)
    const [cCollection, setCCollection] = useState('')





    const confirmAndDelete = () => {
        if (window.confirm(`Вы действительно хотите удалить цвет ${doors.getSelectedOne().name}`)) {
            deleteDoor(doors.getSelectedOne().id).then(()=>{
                const delNum = doors.Data.findIndex( dx => dx.id === doors.getSelectedOne().id)
                doors.Data.splice(delNum,1)
                newDoorInfo.endID = doors.Data.at(-1)?.id
                showDoors.setData(doors.Data.filter(   (door) => {return door.collection === newDoorInfo.collection && door.name === newDoorInfo.model }))
                if (showDoors.Data.length>0) {doors.setSelectedOne(showDoors.Data[0])} else doors.setSelectedOne(null)
            })
        }
    }



    // При открытии страницы делаем запрос на сервер и получаем список клиентов через хук
    useEffect(() =>{

        try {getDoors().then(data => { doors.setData(data)
            newDoorInfo.endID = doors.Data.at(-1)?.id
            setCCollection(DOORS_COLLECTIONS[0].State)
            SetCollection(DOORS_COLLECTIONS[0].State)
        })

        }
        catch (e) {console.log('ошибка при получении списка   '+ e.message)}
    },[])

    const SetCollection = (value) => {
        setCCollection(value)
        if (value === DOORS_COLLECTIONS[0].State) getClassicModel().then(data => {
            classicModels.setData(data)
            if (classicModels.Data.length > 0 )  { SetData(value, classicModels.Data[0].model) }
        })
        if (value === DOORS_COLLECTIONS[1].State) getNeoClassicModel().then(data => {
            classicModels.setData(data)
            if (classicModels.Data.length > 0 )  { SetData(value, classicModels.Data[0].model) }
        })
        if (value === DOORS_COLLECTIONS[2].State) getModernModel().then(data => {
            classicModels.setData(data)
            if (classicModels.Data.length > 0 )  { SetData(value, classicModels.Data[0].model) }
        })
   }



   const SetData = (dCollection, dModel) => {
        // Фоормируем список дверей на отображение
       newDoorInfo.collection = dCollection
       newDoorInfo.model = dModel
       showDoors.setData(doors.Data.filter(   (door) => {return door.collection === newDoorInfo.collection && door.name === newDoorInfo.model }))
       if (showDoors.Data.length>0) {doors.setSelectedOne(showDoors.Data[0])} else doors.setSelectedOne(null)
   }


    return (
        <div>
            <div className="input-group p-3  align-items-lg-baseline">
                <p className="">Выбрать по коллекции </p>
                <div className="col-2 px-2">
                    <select className="form-select form-select-sm"  value={cCollection} onChange={ e=> SetCollection(e.target.value)} >
                        {DOORS_COLLECTIONS.map((collection) =>
                            <option key={collection.ID} value={collection.State}>{collection.State} </option> )}
                    </select>
                </div>
                <p className=""> и Модели </p>
                <div className="col-2 mx-2">
                    <select className="form-select form-select-sm"  value={newDoorInfo.model} onChange={ e=> { SetData(cCollection, e.target.value) }} >
                        {classicModels.Data.map((dModel) =>
                            <option key={dModel.id} value={dModel.model}>{dModel.model} </option> )}
                    </select>
                </div>

                <button className="btn-sm btn mx-2 btn-secondary" onClick={() => { SetData() } } >Ok</button>

            </div>
                  <div >
                        <div className="m-2 border border-dark text-center rounded-4" >


                            <DoorsEdit show={doorsEditVisible} onHide={() => setDoorsEditVisible(false)}/>

                            <div  style={{position: "relative", height: 400, overflow: "auto"}} className="text-lg-start" >
                                <table className=" table table-sm table-hover ">
                                    <thead>
                                    <tr>
                                        <th scope="col">№</th>
                                        <th scope="col">Kоллекция</th>
                                        <th scope="col">Модель</th>
                                        <th scope="col">Цвет</th>
                                        <th scope="col">Стекло</th>
                                        <th scope="col">Цена</th>
                                        <th scope="col">Комментарий</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        showDoors.Data.map(door =>
                                            <tr
                                                key={door.id} className="col-lg"  style={{backgroundColor: door.id === doors.getSelectedOne().id ? 'LightGray' : 'white', cursor: 'pointer'}}
                                                onDoubleClick={() => {
                                                    if (doors.getSelectedOne()) {
                                                    doors.setIsNew(false); setDoorsEditVisible(true)}}
                                            }
                                                onClick={() => { doors.setSelectedOne(door); }}    >
                                                <td> {door.id} </td>
                                                <td> {door.collection}</td>
                                                <td> {door.name}</td>
                                                <td> {door.color } </td>
                                                <td> {door.glass}</td>
                                                <td> {door.price}</td>
                                                <td> {door.comment}</td>
                                            </tr>)
                                    }
                                    </tbody>
                                </table>
                            </div>

                            <button className="m-1 btn-sm btn btn-secondary" onClick={() => { doors.setIsNew(true)
                                setDoorsEditVisible(true)} } >Добавить</button>
                            <button className="m-1 btn-sm btn btn-secondary" onClick={() => {if (doors.getSelectedOne()) {
                                doors.setIsNew(false); setDoorsEditVisible(true)}}}>Изменить</button>
                            <button className="m-1 btn-sm btn btn-secondary" onClick={() => confirmAndDelete() }>Удалить</button>
                        </div>
                    </div>


        </div>
    );
});

export default DoorsBar;