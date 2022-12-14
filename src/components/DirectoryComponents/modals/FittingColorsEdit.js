import React, {useContext, useState} from 'react';
import {Button, Modal} from "react-bootstrap";

import {Context} from "../../../index";
import {createFittingColor, getFittingColors, updateFittingColor} from "../../../http/directorysApi";

const FittingColorsEdit =  ({show, onHide}) => {

    const {fittingColors} = useContext(Context);
    const [cColor,     setCColor]      = useState('')


    // При открытии страницы
    const SetParams = () => {
        if (fittingColors.isNew) {  setCColor('')
        } else {   setCColor(fittingColors.getSelectedOne().color);        }}

    const createDColor = () => {
        createFittingColor({ color: cColor}).then(data => {
            // После создания клиента запрашиваем обновленный список и выделяем клиента которого создали
            getFittingColors().then(data => {
                fittingColors.setData(data)
                if (fittingColors.Data.length > 0) {
                         fittingColors.setSelectedOne(fittingColors.Data[fittingColors.Data.length-1])
                }
            })
            onHide()
        })
    }

    const updateDColor = () => {
        updateFittingColor({color : cColor, id:fittingColors.getSelectedOne().id} ).then(data => {
            // После создания клиента запрашиваем обновленный список и выделяем клиента которого создали

            onHide()
            getFittingColors().then(data => {
                fittingColors.setData(data)
            } )
        })
    }

    return (
        <Modal show={show}  onHide={onHide} size="lg" centered  onShow={SetParams} >
            <Modal.Header closeButton>
                <Modal.Title id="">
                    {fittingColors.isNew? 'Добавить цвет' : 'Изменить цвет'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text col-2" id="inputGroup-sizing-sm">Название</span>
                        <input type="text" className="form-control" value={cColor}  onChange={e=>setCColor(e.target.value)}   ></input>
                    </div>
                </form>

            </Modal.Body>


            <Modal.Footer>
                <Button className="m-1 btn-sm btn btn-secondary" onClick={onHide}>Закрыть</Button>
                <Button className="m-1 btn-sm btn btn-secondary" onClick={ fittingColors.isNew? createDColor : updateDColor}>{fittingColors.isNew? 'Добавить цвет' : 'Изменить цвет'}</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default FittingColorsEdit;