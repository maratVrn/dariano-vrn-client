import React, {useContext, useState} from 'react';
import {Button, Modal} from "react-bootstrap";

import {Context} from "../../../index";
import {
    createNeoClassicModel,
    getNeoClassicModel,
    updateNeoClassicModel
} from "../../../http/directorysApi";


const NeoClassicEdit =  ({show, onHide}) => {

    const {neoClassicModels} = useContext(Context);
    const [cModel,     setCModel]      = useState('')


    // При открытии страницы
    const SetParams = () => {

        if (neoClassicModels.isNew) {  setCModel('')
        } else {   setCModel(neoClassicModels.getSelectedOne().model);        }

    }

    const createModel = () => {
        createNeoClassicModel({ model: cModel}).then(data => {
            // После создания клиента запрашиваем обновленный список и выделяем клиента которого создали
            getNeoClassicModel().then(data => {
                neoClassicModels.setData(data)
                if (neoClassicModels.Data.length > 0) {
                    neoClassicModels.setSelectedOne(neoClassicModels.Data[neoClassicModels.Data.length-1])
                }
            })
            onHide()
        })
    }

    const updateModel = () => {
        updateNeoClassicModel({model : cModel, id:neoClassicModels.getSelectedOne().id} ).then(data => {
            // После создания клиента запрашиваем обновленный список и выделяем клиента которого создали

            onHide()
            getNeoClassicModel().then(data => {
                neoClassicModels.setData(data)
            } )
        })
    }

    return (
        <Modal show={show}  onHide={onHide} size="lg" centered  onShow={SetParams} >
            <Modal.Header closeButton>
                <Modal.Title id="">
                    {neoClassicModels.isNew? 'Добавить модель' : 'Изменить модель'}
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
                <Button className="m-1 btn-sm btn btn-secondary" onClick={ neoClassicModels.isNew? createModel : updateModel}>{neoClassicModels.isNew? 'Добавить модель' : 'Изменить модель'}</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default NeoClassicEdit;