
import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

import {
    deleteMoldingPos, getMoldingPos, getMoldings
} from "../../http/directorysApi";
import MoldingEdit from "./modals/MoldingEdit";
import MoldingPosEdit from "./modals/MoldingPosEdit";


const MoldingsBar = observer( () => {
    const {moldings}           = useContext(Context);
    const {moldingPos}         = useContext(Context);
    const {showMoldingPos}      = useContext(Context);
    const [moldingEditVisible, setMoldingEditVisible] = useState(false)
    const [moldingPosEditVisible, setMoldingPosEditVisible] = useState(false)

    const SetSMoldingsPos = (moldingType) => {
        showMoldingPos.setData(moldingPos.Data.filter(   (molding) => {return molding.moldingType === moldingType }))

    }

    const confirmAndDeleteModel= () => {
        if (window.confirm(`Вы действительно хотите удалить цвет ${moldingPos.getSelectedOne().color}`)) {
            //TODO: Изменить
            deleteMoldingPos(moldingPos.getSelectedOne().id).then(()=>{
                getMoldingPos().then(data => {
                    moldingPos.setData(data)
                    showMoldingPos.setData(moldingPos.Data.filter((molding) => {
                        return molding.moldingType === moldings.getSelectedOne().model
                    }))
                } )

            }) } }

    const NewMoldingPos = () => {
        if (moldings.getSelectedOne().id) {
            moldingPos.setIsNew(true)
            setMoldingPosEditVisible(true)
        } else window.confirm(`Необходимо выбрать изделие`)
    }

    useEffect(() =>{
        try {  getMoldings().then(data => {moldings.setData(data)
            if (moldings.Data.length>0) moldings.setSelectedOne(moldings.Data[0])  })
            getMoldingPos().then(data => {   moldingPos.setData(data)
                if (moldings.getSelectedOne().id) SetSMoldingsPos(moldings.getSelectedOne().model)  })}

        catch (e) {console.log('ошибка   '+ e.message)}
    },[])

    return (
        <div >
            <div className="input-group p-2 " >
                <div className="col-3 ">
                    <div className="border border-dark text-center rounded-4" >
                        <h6>Изделие</h6>
                        <MoldingEdit show={moldingEditVisible} onHide={() => setMoldingEditVisible(false)}/>
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
                                    moldings.Data.map((dModel,idx) =>
                                        <tr
                                            key={dModel.id}
                                            className="col-lg"
                                            style={{backgroundColor: dModel.id === moldings.getSelectedOne().id ? 'LightGray' : 'white', cursor: 'pointer'}}
                                            onDoubleClick={() => { moldings.setIsNew(false)
                                                setMoldingEditVisible(true)}}
                                            onClick={() => { SetSMoldingsPos(dModel.model); moldings.setSelectedOne(dModel);
                                            }}
                                        >
                                            <td> {idx+1} </td>
                                            <td> {dModel.model}</td>
                                        </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => { moldings.setIsNew(true)
                            setMoldingEditVisible(true)} } >Добавить</button>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => { moldings.setIsNew(false)
                            setMoldingEditVisible(true)}}>Изменить</button>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => confirmAndDeleteModel() }>Удалить</button>
                    </div>
                </div>

                <div className="col-9">
                    <div className="mx-2 border border-dark text-center rounded-4" >
                        <h6>Покрытия и цены</h6>
                        <MoldingEdit show={moldingEditVisible} onHide={() => setMoldingEditVisible(false)}/>
                        <MoldingPosEdit show={moldingPosEditVisible} onHide={() => setMoldingPosEditVisible(false)}/>

                        <div  style={{position: "relative", height: 450, overflow: "auto"}} className="text-lg-start" >
                            <table className="p-1 border table table-sm table-hover ">
                                <thead>
                                <tr>
                                    <th scope="col">№</th>
                                    <th scope="col">Цвет</th>
                                    <th scope="col">Цена</th>
                                    <th scope="col">Комментарий</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    showMoldingPos.Data.map((dMolding,idx) =>
                                        <tr
                                            key={dMolding.id}
                                            className="col-lg"
                                            style={{backgroundColor: dMolding.id === moldingPos.getSelectedOne().id ? 'LightGray' : 'white', cursor: 'pointer'}}
                                            onDoubleClick={() => { moldingPos.setIsNew(false)
                                                setMoldingPosEditVisible(true)}}
                                            onClick={() => { moldingPos.setSelectedOne(dMolding); }}
                                        >
                                            <td> {idx+1} </td>
                                            <td> {dMolding.color}</td>
                                            <td> {dMolding.price}</td>
                                            <td> {dMolding.comment}</td>
                                        </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => { NewMoldingPos() }} >Добавить</button>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => { moldingPos.setIsNew(false)
                            setMoldingPosEditVisible(true)}}>Изменить</button>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => confirmAndDeleteModel() }>Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default MoldingsBar;