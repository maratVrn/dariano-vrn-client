import React, {useContext, useState} from 'react';
import {Button, Modal} from "react-bootstrap";

import {Context} from "../../../index";
import {
    createMolding, getMoldings, updateMolding,

} from "../../../http/directorysApi";


const MoldingEdit =  ({show, onHide}) => {

    const {moldings} = useContext(Context);
    const [cModel,     setCModel]      = useState('')


    // При открытии страницы
    const SetParams = () => {
        if (moldings.isNew) {  setCModel('')
        } else {   setCModel(moldings.getSelectedOne().model);        }}

    const createModel = () => {
        createMolding({ model: cModel}).then(data => {
            // После создания клиента запрашиваем обновленный список и выделяем клиента которого создали
            getMoldings().then(data => {
                moldings.setData(data)
                if (moldings.Data.length > 0) {
                    moldings.setSelectedOne(moldings.Data[moldings.Data.length-1])
                }
            })
            onHide()
        })
    }

    const updateModel = () => {
        updateMolding({model : cModel, id:moldings.getSelectedOne().id} ).then(data => {
            // После создания клиента запрашиваем обновленный список и выделяем клиента которого создали

            onHide()
            getMoldings().then(data => { moldings.setData(data) } )
        })
    }

    return (
        <Modal show={show}  onHide={onHide} size="lg" centered  onShow={SetParams} >
            <Modal.Header closeButton>
                <Modal.Title id="">
                    {moldings.isNew? 'Добавить модель' : 'Изменить модель'}
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
                <Button className="m-1 btn-sm btn btn-secondary" onClick={ moldings.isNew? createModel : updateModel}>{moldings.isNew? 'Добавить модель' : 'Изменить модель'}</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default MoldingEdit;