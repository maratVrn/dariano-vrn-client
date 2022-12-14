import React, {useContext, useState} from 'react';
import {Button, Modal} from "react-bootstrap";

import {Context} from "../../../index";
import {
    createFittingsPos,
    getFittingsPos,
 updateFittingsPos
} from "../../../http/directorysApi";

const FittingPosEdit =  ({show, onHide}) => {

    const {fittingPos} = useContext(Context);
    const {fittings}           = useContext(Context);
    const {fittingBrands}         = useContext(Context);
    const {showFittingPos}         = useContext(Context);

    const [cPos,     setCPos]      = useState('')
    const [cPrice,     setCPrice]      = useState(0)

    const SetShowFittingPos = () => {
        if (fittings.getSelectedOne().id) {
            if (fittingBrands.getSelectedOne().id) {
                showFittingPos.setData( fittingPos.Data.filter(   (fit) => {return fit.fitting === fittings.getSelectedOne().fitting &&
                    fit.brand === fittingBrands.getSelectedOne().brand }))
            }}
    }

    // При открытии страницы
    const SetParams = () => {
        if (fittingPos.isNew) {  setCPos('') ; setCPrice(0)
        } else {   setCPos(fittingPos.getSelectedOne().pos);   setCPrice(fittingPos.getSelectedOne().price);       }}

    const createFittingPos = () => {
        createFittingsPos({ pos: cPos, price : cPrice, fitting : fittings.getSelectedOne().fitting,
            brand : fittingBrands.getSelectedOne().brand}).then(data => {
            getFittingsPos().then(data => { fittingPos.setData(data)
                SetShowFittingPos()
                if (fittingPos.Data.length > 0) {
                    fittingPos.setSelectedOne(fittingPos.Data[fittingPos.Data.length-1])}
            })
            onHide()
        })
    }

    const updateFittingPos = () => {
        updateFittingsPos({pos: cPos, price : cPrice, fitting : fittings.getSelectedOne().fitting,
            brand : fittingBrands.getSelectedOne().brand, id:fittingPos.getSelectedOne().id} ).then(data => {
            onHide()
            getFittingsPos().then(data => {  fittingPos.setData(data); SetShowFittingPos() } )
        })
    }

    return (
        <Modal show={show}  onHide={onHide} size="lg" centered  onShow={SetParams} >
            <Modal.Header closeButton>
                <Modal.Title id="">
                    {fittingPos.isNew? 'Добавить позицию' : 'Изменить позицию'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text col-2" id="inputGroup-sizing-sm">Название</span>
                        <input type="text" className="form-control" value={cPos}  onChange={e=>setCPos(e.target.value)}   ></input>
                    </div>
                </form>
                <form>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text col-2" id="inputGroup-sizing-sm">Цена</span>
                        <input type="number" className="form-control" value={cPrice}  onChange={e=>setCPrice(e.target.valueAsNumber)}   ></input>
                    </div>
                </form>

            </Modal.Body>


            <Modal.Footer>
                <Button className="m-1 btn-sm btn btn-secondary" onClick={onHide}>Закрыть</Button>
                <Button className="m-1 btn-sm btn btn-secondary" onClick={ fittingPos.isNew? createFittingPos : updateFittingPos}>
                    {fittingPos.isNew? 'Добавить модель' : 'Изменить модель'}</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default FittingPosEdit;