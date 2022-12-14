import React, {useContext, useState} from 'react';
import {Button, Modal} from "react-bootstrap";

import {Context} from "../../../index";
import {
    createFittings,
    createMolding, getFittings, getMoldings, updateFittings, updateMolding,

} from "../../../http/directorysApi";


const FittingEdit =  ({show, onHide}) => {

    const {fittings} = useContext(Context);
    const [cModel,     setCModel]      = useState('')


    // При открытии страницы
    const SetParams = () => {
        if (fittings.isNew) {  setCModel('')
        } else {   setCModel(fittings.getSelectedOne().fitting);        }}

    const createFitting = () => {
        createFittings({ fitting: cModel}).then(data => {
            getFittings().then(data => {
                fittings.setData(data)
                if (fittings.Data.length > 0) {
                    fittings.setSelectedOne(fittings.Data[fittings.Data.length-1])
                }
            })
            onHide()
        })
    }

    const updateFitting = () => {
        updateFittings({fitting : cModel, id:fittings.getSelectedOne().id} ).then(data => {
            // После создания клиента запрашиваем обновленный список и выделяем клиента которого создали
            onHide()
            getFittings().then(data => { fittings.setData(data) } )
        })
    }

    return (
        <Modal show={show}  onHide={onHide} size="lg" centered  onShow={SetParams} >
            <Modal.Header closeButton>
                <Modal.Title id="">
                    {fittings.isNew? 'Добавить модель' : 'Изменить модель'}
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
                <Button className="m-1 btn-sm btn btn-secondary" onClick={ fittings.isNew? createFitting : updateFitting}>{fittings.isNew? 'Добавить модель' : 'Изменить модель'}</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default FittingEdit;