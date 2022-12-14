import React, {useContext, useState} from 'react';
import {Button, Modal} from "react-bootstrap";

import {Context} from "../../../index";
import {
    createModernModel,
    getModernModel,
    updateModernModel
} from "../../../http/directorysApi";


const ModernEdit =  ({show, onHide}) => {

    const {modernModels} = useContext(Context);
    const [cModel,     setCModel]      = useState('')


    // При открытии страницы
    const SetParams = () => {

        if (modernModels.isNew) {  setCModel('')
        } else {   setCModel(modernModels.getSelectedOne().model);        }

    }

    const createModel = () => {
        createModernModel({ model: cModel}).then(data => {
            // После создания клиента запрашиваем обновленный список и выделяем клиента которого создали
            getModernModel().then(data => {
                modernModels.setData(data)
                if (modernModels.Data.length > 0) {
                    modernModels.setSelectedOne(modernModels.Data[modernModels.Data.length-1])
                }
            })
            onHide()
        })
    }

    const updateModel = () => {
        updateModernModel({model : cModel, id:modernModels.getSelectedOne().id} ).then(data => {
            // После создания клиента запрашиваем обновленный список и выделяем клиента которого создали

            onHide()
            getModernModel().then(data => {
                modernModels.setData(data)
            } )
        })
    }

    return (
        <Modal show={show}  onHide={onHide} size="lg" centered  onShow={SetParams} >
            <Modal.Header closeButton>
                <Modal.Title id="">
                    {modernModels.isNew? 'Добавить модель' : 'Изменить модель'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text col-2" id="inputGroup-sizing-sm">Название</span>
                        <input type="text" className="form-control" value={cModel}  onChange={e=>setCModel(e.target.value)}   ></input>
                    </div>
                </form>

            </Modal.Body>


            <Modal.Footer>
                <Button className="m-1 btn-sm btn btn-secondary" onClick={onHide}>Закрыть</Button>
                <Button className="m-1 btn-sm btn btn-secondary" onClick={ modernModels.isNew? createModel : updateModel}>{modernModels.isNew? 'Добавить модель' : 'Изменить модель'}</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default ModernEdit;