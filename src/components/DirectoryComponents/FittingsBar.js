import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";



import {
    deleteFittingBrands,
    deleteFittings, deleteFittingsPos,
    getFittingBrands, getFittings, getFittingsPos,
} from "../../http/directorysApi";
import FittingEdit from "./modals/FittingEdit";

import FittingBrandEdit from "./modals/FittingBrandEdit";
import FittingPosEdit from "./modals/FittingsPosEdit";


const FittingsBar = observer( () => {

    const {fittings}           = useContext(Context);
    const {fittingBrands}   = useContext(Context);
    const {fittingPos}      = useContext(Context);
    const {showFittingPos}  = useContext(Context);

    const [fittingEditVisible, setFittingEditVisible] = useState(false)


    const [fittingBrandEditVisible, setFittingBrandEditVisible] = useState(false)
    const [fittingPosEditVisible, setFittingPosEditVisible] = useState(false)

    const SetShowFittingPos = () => {
        if (fittings.getSelectedOne().id) {
            if (fittingBrands.getSelectedOne().id) {
                showFittingPos.setData( fittingPos.Data.filter(   (fit) => {return fit.fitting === fittings.getSelectedOne().fitting &&
                    fit.brand === fittingBrands.getSelectedOne().brand }))
            }}
        }


    const confirmAndDeleteFitting= () => {
        if (window.confirm(`Вы действительно хотите удалить позицию ${fittings.getSelectedOne().fitting}`)) {
          //TODO: Изменить
            deleteFittings(fittings.getSelectedOne().id).then(()=>{
                    getFittings().then(data => {
                        fittings.setData(data)
                        SetShowFittingPos()
                } )
            }) }
    }
    const confirmAndDeleteFittingBrand = () => {
        if (window.confirm(`Вы действительно хотите удалить позицию ${fittingBrands.getSelectedOne().brand}`)) {
            //TODO: Изменить
            deleteFittingBrands(fittingBrands.getSelectedOne().id).then(()=>{
                getFittingBrands().then(data => {
                    fittingBrands.setData(data)
                    SetShowFittingPos()
                } )
            }) }
    }

    const confirmAndDeleteFittingPos= () => {
        if (window.confirm(`Вы действительно хотите удалить позицию ${fittingPos.getSelectedOne().pos}`)) {
            //TODO: Изменить
            deleteFittingsPos(fittingPos.getSelectedOne().id).then(()=>{
                getFittingsPos().then(data => {  fittingPos.setData(data)
                    SetShowFittingPos()
                } )
            }) }
    }

    const NewFittingPos = () => {
        if (fittings.getSelectedOne().id) {
            if (fittingBrands.getSelectedOne().id) {
                fittingPos.setIsNew(true)
                setFittingPosEditVisible(true)
            }else window.confirm(`Необходимо выбрать брэнд`)


        } else window.confirm(`Необходимо выбрать изделие`)
    }

    useEffect(() =>{
        try {  getFittings().then(data => {fittings.setData(data)})
            getFittingBrands().then(data => { fittingBrands.setData(data)})
            getFittingsPos().then(data => { fittingPos.setData(data)})

        }
        catch (e) {console.log('ошибка   '+ e.message)}
    },[])


    return (
        <div >
            <div className="input-group p-2 " >

                <div className="col-3 ">
                    <div className="border mx-2 border-dark text-center rounded-4" >
                        <h6>Изделие</h6>
                        <FittingEdit show={fittingEditVisible} onHide={() => setFittingEditVisible(false)}/>
                        <div  style={{position: "relative", height: 450, overflow: "auto"}} className="text-lg-start" >
                            <table className="p-1 border table table-sm table-hover ">
                                <thead>
                                <tr>
                                    <th scope="col">№</th>
                                    <th scope="col">Модель</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    fittings.Data.map((dFitting,idx) =>
                                        <tr
                                            key={dFitting.id}
                                            className="col-lg"
                                            style={{backgroundColor: dFitting.id === fittings.getSelectedOne().id ? 'LightGray' : 'white', cursor: 'pointer'}}
                                            onDoubleClick={() => { fittings.setIsNew(false)
                                                setFittingEditVisible(true)}}
                                            onClick={() => {
                                                fittings.setSelectedOne(dFitting);
                                                SetShowFittingPos()

                                            }}
                                        >
                                            <td> {idx+1} </td>
                                            <td> {dFitting.fitting}</td>
                                        </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => { fittings.setIsNew(true)
                            setFittingEditVisible(true)} } >Добавить</button>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => { fittings.setIsNew(false)
                            setFittingEditVisible(true)}}>Изменить</button>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => confirmAndDeleteFitting() }>Удалить</button>
                    </div>
                </div>

                <div className="col-3  ">
                    <div className="border border-dark text-center rounded-4" >
                        <h6>Бренд</h6>
                        <FittingBrandEdit show={fittingBrandEditVisible} onHide={() => setFittingBrandEditVisible(false)}/>
                        <div  style={{position: "relative", height: 450, overflow: "auto"}} className="text-lg-start" >
                            <table className="p-1 border table table-sm table-hover ">
                                <thead>
                                <tr>
                                    <th scope="col">№</th>
                                    <th scope="col">Бренд</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    fittingBrands.Data.map((dFitting,idx) =>
                                        <tr
                                            key={dFitting.id}
                                            className="col-lg"
                                            style={{backgroundColor: dFitting.id === fittingBrands.getSelectedOne().id ? 'LightGray' : 'white', cursor: 'pointer'}}
                                            onDoubleClick={() => { fittingBrands.setIsNew(false)
                                                setFittingBrandEditVisible(true)}}
                                            onClick={() => {
                                                fittingBrands.setSelectedOne(dFitting);
                                                SetShowFittingPos()
                                            }}
                                        >
                                            <td> {idx+1} </td>
                                            <td> {dFitting.brand}</td>
                                        </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => { fittingBrands.setIsNew(true)
                            setFittingBrandEditVisible(true)} } >Добавить</button>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => { fittingBrands.setIsNew(false)
                            setFittingBrandEditVisible(true)}}>Изменить</button>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => confirmAndDeleteFittingBrand() }>Удалить</button>
                    </div>
                </div>

                <div className="col-6">
                    <div className="border mx-2  border-dark text-center rounded-4" >
                        <h6>Модели и цены</h6>

                        <FittingPosEdit show={fittingPosEditVisible} onHide={() => setFittingPosEditVisible(false)}/>

                        <div  style={{position: "relative", height: 450, overflow: "auto"}} className="text-lg-start" >
                            <table className="p-1 border table table-sm table-hover ">
                                <thead>
                                <tr>
                                    <th scope="col">№</th>
                                    <th scope="col">Модельный ряд</th>
                                    <th scope="col">Цена</th>

                                </tr>
                                </thead>
                                <tbody>
                                {
                                    showFittingPos.Data.map((dPos,idx) =>
                                        <tr
                                            key={dPos.id}
                                            className="col-lg"
                                            style={{backgroundColor: dPos.id === fittingPos.getSelectedOne().id ? 'LightGray' : 'white', cursor: 'pointer'}}
                                            onDoubleClick={() => { fittingPos.setIsNew(false)
                                                setFittingPosEditVisible(true)}}
                                            onClick={() => { fittingPos.setSelectedOne(dPos); }}
                                        >
                                            <td> {idx+1} </td>
                                            <td> {dPos.pos}</td>
                                            <td> {dPos.price}</td>

                                        </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => { NewFittingPos() }} >Добавить</button>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => { fittingPos.setIsNew(false)
                            setFittingPosEditVisible(true)}}>Изменить</button>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => confirmAndDeleteFittingPos() }>Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default FittingsBar;