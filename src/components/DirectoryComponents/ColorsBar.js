import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {deleteDoorsColor, deleteFittingColor, getDoorsColors, getFittingColors} from "../../http/directorysApi";
import DoorsColorsEdit from "./modals/DoorsColorsEdit";
import {observer} from "mobx-react-lite";
import FittingColorsEdit from "./modals/FittingColorsEdit";



const ColorsBar = observer (() => {
    const {doorsColors} = useContext(Context);
    const [doorsColorEditVisible, setDoorsColorEditVisible] = useState(false)

    const {fittingColors} = useContext(Context);
    const [fittingColorEditVisible, setFittingColorEditVisible] = useState(false)

    const confirmAndDelete = () => {
        if (window.confirm(`Вы действительно хотите удалить цвет ${doorsColors.getSelectedDoorsColor().color}`)) {
            deleteDoorsColor(doorsColors.getSelectedDoorsColor().id).then(()=>{
                getDoorsColors().then(data => doorsColors.setDoorsColors(data) )
            })
        }
    }

    const confirmAndDeleteFColor = () => {
        if (window.confirm(`Вы действительно хотите удалить цвет ${fittingColors.getSelectedOne().color}`)) {
            deleteFittingColor(fittingColors.getSelectedOne().id).then(()=>{
                getFittingColors().then(data => fittingColors.setData(data) )
            })
        }
    }

    // При открытии страницы делаем запрос на сервер и получаем список клиентов через хук
    useEffect(() =>{
        try {  getDoorsColors().then(data => doorsColors.setDoorsColors(data) );
               getFittingColors().then(data => fittingColors.setData(data) ) }
        catch (e) {console.log('ошибка при получении списка цветов   '+ e.message)}
    },[])


    return (
        <div >
            <div className="input-group  " >
                <div className="col-4">
                    <div className="m-2 border border-dark text-center rounded-4" >
                    <h6>Цвета покрытий Дариано</h6>


                    <DoorsColorsEdit show={doorsColorEditVisible} onHide={() => setDoorsColorEditVisible(false)}/>

                    <div  style={{position: "relative", height: 450, overflow: "auto"}} className="text-lg-start" >
                        <table className="p-1 border table table-sm table-hover ">
                            <thead>
                            <tr>
                                <th scope="col">№</th>
                                <th scope="col">Цвет</th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                doorsColors.DoorsColors.map(dColor =>
                                    <tr
                                        key={dColor.id}
                                        className="col-lg"
                                        style={{backgroundColor: dColor.id === doorsColors.getSelectedDoorsColor().id ? 'LightGray' : 'white', cursor: 'pointer'}}
                                        onDoubleClick={() => { doorsColors.setIsNewDoorsColor(false)
                                            setDoorsColorEditVisible(true)}}
                                        onClick={() => { doorsColors.setSelectedDoorsColor(dColor);
                                        }}
                                    >
                                        <td> {dColor.id} </td>
                                        <td> {dColor.color}</td>
                                    </tr>)
                            }
                            </tbody>
                        </table>
                    </div>

                    <button className="m-1 btn-sm btn btn-secondary" onClick={() => { doorsColors.setIsNewDoorsColor(true)
                        setDoorsColorEditVisible(true)} } >Добавить</button>
                    <button className="m-1 btn-sm btn btn-secondary" onClick={() => { doorsColors.setIsNewDoorsColor(false)
                        setDoorsColorEditVisible(true)}}>Изменить</button>
                    <button className="m-1 btn-sm btn btn-secondary" onClick={() => confirmAndDelete() }>Удалить</button>
                </div>
                </div>
                <div className="col-4">
                    <div className="m-2 border border-dark text-center  rounded-4" >
                    <h6>Цвета покрытий Фурнитура</h6>


                    <FittingColorsEdit show={fittingColorEditVisible} onHide={() => setFittingColorEditVisible(false)}/>

                    <div  style={{position: "relative", height: 450, overflow: "auto"}} className="text-lg-start" >
                        <table className="p-1 border table table-sm table-hover ">
                            <thead>
                            <tr>
                                <th scope="col">№</th>
                                <th scope="col">Цвет</th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                fittingColors.Data.map(dColor =>
                                    <tr
                                        key={dColor.id}
                                        className="col-lg"
                                        style={{backgroundColor: dColor.id === fittingColors.getSelectedOne().id ? 'LightGray' : 'white', cursor: 'pointer'}}
                                        onDoubleClick={() => { fittingColors.setIsNew(false)
                                            setFittingColorEditVisible(true)}}
                                        onClick={() => { fittingColors.setSelectedOne(dColor);
                                        }}
                                    >
                                        <td> {dColor.id} </td>
                                        <td> {dColor.color}</td>
                                    </tr>)
                            }
                            </tbody>
                        </table>
                    </div>

                    <button className="m-1 btn-sm btn btn-secondary" onClick={() => { fittingColors.setIsNew(true)
                        setFittingColorEditVisible(true)} } >Добавить</button>
                    <button className="m-1 btn-sm btn btn-secondary" onClick={() => { fittingColors.setIsNew(false)
                        setFittingColorEditVisible(true)}}>Изменить</button>
                    <button className="m-1 btn-sm btn btn-secondary" onClick={() => confirmAndDeleteFColor() }>Удалить</button>
                </div>
                </div>

            </div>
        </div>
    );
});

export default ColorsBar;