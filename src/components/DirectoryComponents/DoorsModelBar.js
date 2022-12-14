import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import ClassicEdit from "./modals/ClassicEdit";
import NeoClassicEdit from "./modals/NeoClassicEdit";
import {Context} from "../../index";
import {
    deleteClassicModel,
    deleteNeoClassicModel,
    getClassicModel,
    getNeoClassicModel,
    deleteModernModel,
    getModernModel
} from "../../http/directorysApi";
import ModernEdit from "./modals/ModernEdit";

const DoorsModelBar = observer(() => {

    const {classicModels} = useContext(Context);
    const {neoClassicModels} = useContext(Context);
    const {modernModels} = useContext(Context);
    const [doorsNeoClassicEditVisible, setNeoClassicEditVisible] = useState(false)
    const [doorsClassicEditVisible, setClassicEditVisible] = useState(false)
    const [doorsModernEditVisible, setModernEditVisible] = useState(false)

    const confirmAndDeleteClassic = () => {
        if (window.confirm(`Вы действительно хотите удалить модель ${classicModels.getSelectedOne().name}`)) {
            deleteClassicModel(classicModels.getSelectedOne().id).then(()=>{
                getClassicModel().then(data => classicModels.setData(data) )
            }) } }

    const confirmAndDeleteNeoClassic = () => {
        if (window.confirm(`Вы действительно хотите удалить модель ${neoClassicModels.getSelectedOne().name}`)) {
            deleteNeoClassicModel(neoClassicModels.getSelectedOne().id).then(()=>{
                getNeoClassicModel().then(data => neoClassicModels.setData(data) )
            }) } }

    const confirmAndDeleteModern = () => {
        if (window.confirm(`Вы действительно хотите удалить модель ${modernModels.getSelectedOne().name}`)) {
            deleteModernModel(modernModels.getSelectedOne().id).then(()=>{
                getModernModel().then(data => modernModels.setData(data) )

            }) } }


    // При открытии страницы делаем запрос на сервер и получаем список клиентов через хук
    useEffect(() =>{
        try {   getClassicModel().then(data =>  classicModels.setData(data) )
                getNeoClassicModel().then(data => neoClassicModels.setData(data) )
                getModernModel().then(data => modernModels.setData(data) )
        }
        catch (e) {console.log('ошибка при получении списка   '+ e.message)}
    },[])


    return (
        <div >
            <div className="input-group  " >
                <div className="col-4">
                    <div className="m-2 border border-dark text-center rounded-4" >
                        <h6>Классика</h6>
                        <ClassicEdit show={doorsClassicEditVisible} onHide={() => setClassicEditVisible(false)}/>
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
                                    classicModels.Data.map(dModel =>
                                        <tr
                                            key={dModel.id}
                                            className="col-lg"
                                            style={{backgroundColor: dModel.id === classicModels.getSelectedOne().id ? 'LightGray' : 'white', cursor: 'pointer'}}
                                            onDoubleClick={() => { classicModels.setIsNew(false)
                                                setClassicEditVisible(true)}}
                                            onClick={() => { classicModels.setSelectedOne(dModel);
                                            }}
                                        >
                                            <td> {dModel.id} </td>
                                            <td> {dModel.model}</td>
                                        </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => { classicModels.setIsNew(true)
                            setClassicEditVisible(true)} } >Добавить</button>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => { classicModels.setIsNew(false)
                            setClassicEditVisible(true)}}>Изменить</button>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => confirmAndDeleteClassic() }>Удалить</button>
                    </div>
                </div>
                {/*  ------------------   */}
                <div className="col-4">
                    <div className="m-2 border border-dark text-center rounded-4" >
                        <h6>Неоклассика</h6>
                        <NeoClassicEdit show={doorsNeoClassicEditVisible} onHide={() => setNeoClassicEditVisible(false)}/>
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
                                    neoClassicModels.Data.map(dModel =>
                                        <tr
                                            key={dModel.id}
                                            className="col-lg"
                                            style={{backgroundColor: dModel.id === neoClassicModels.getSelectedOne().id ? 'LightGray' : 'white', cursor: 'pointer'}}
                                            onDoubleClick={() => { neoClassicModels.setIsNew(false)
                                                setNeoClassicEditVisible(true)}}
                                            onClick={() => {

                                                neoClassicModels.setSelectedOne(dModel);

                                            }}
                                        >
                                            <td> {dModel.id} </td>
                                            <td> {dModel.model}</td>
                                        </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => { neoClassicModels.setIsNew(true)
                            setNeoClassicEditVisible(true)} } >Добавить</button>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => { neoClassicModels.setIsNew(false)
                            setNeoClassicEditVisible(true)}}>Изменить</button>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => confirmAndDeleteNeoClassic() }>Удалить</button>
                    </div>
                </div>
                {/*  ------------------   */}
                <div className="col-4">
                    <div className="m-2 border border-dark text-center rounded-4" >
                        <h6>Модерн</h6>
                        <ModernEdit show={doorsModernEditVisible} onHide={() => setModernEditVisible(false)}/>
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
                                    modernModels.Data.map(dModel =>
                                        <tr
                                            key={dModel.id}
                                            className="col-lg"
                                            style={{backgroundColor: dModel.id === modernModels.getSelectedOne().id ? 'LightGray' : 'white', cursor: 'pointer'}}
                                            onDoubleClick={() => { modernModels.setIsNew(false)
                                                setModernEditVisible(true)}}
                                            onClick={() => { modernModels.setSelectedOne(dModel);
                                            }}
                                        >
                                            <td> {dModel.id} </td>
                                            <td> {dModel.model}</td>
                                        </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => { modernModels.setIsNew(true)
                            setModernEditVisible(true)} } >Добавить</button>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => { modernModels.setIsNew(false)
                            setModernEditVisible(true)}}>Изменить</button>
                        <button className="m-1 btn-sm btn btn-secondary" onClick={() => confirmAndDeleteClassic() }>Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default DoorsModelBar;