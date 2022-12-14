import React, {useContext, useState} from 'react';
import {Button, Modal, Form} from "react-bootstrap";

import {Context} from "../../../index";
import {createDoorsColor, getDoorsColors, updateDoorsColor} from "../../../http/directorysApi";

const  DoorsColorsEdit =  ({show, onHide}) => {

    const {doorsColors} = useContext(Context);
    const [cColor,     setCColor]      = useState('')


    // При открытии страницы
    const SetParams = () => {
        if (doorsColors.isNewDoorsColor) {  setCColor('')
        } else {   setCColor(doorsColors.getSelectedDoorsColor().color);        }}

    const createDColor = () => {
        createDoorsColor({ color: cColor}).then(data => {
            // После создания клиента запрашиваем обновленный список и выделяем клиента которого создали
            getDoorsColors().then(data => {
                doorsColors.setDoorsColors(data)
                if (doorsColors.DoorsColors.length > 0) {
                    doorsColors.setSelectedDoorsColor(doorsColors.DoorsColors[doorsColors.DoorsColors.length-1])
                }
            })
            onHide()
        })
    }

    const updateDColor = () => {
        updateDoorsColor({color : cColor, id:doorsColors.getSelectedDoorsColor().id} ).then(data => {
            // После создания клиента запрашиваем обновленный список и выделяем клиента которого создали

            onHide()
            getDoorsColors().then(data => {
                doorsColors.setDoorsColors(data)
            } )
        })
    }

    return (
        <Modal show={show}  onHide={onHide} size="lg" centered  onShow={SetParams} >
            <Modal.Header closeButton>
                <Modal.Title id="">
                    {doorsColors.isNewDoorsColor? 'Добавить цвет' : 'Изменить цвет'}
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
                <Button className="m-1 btn-sm btn btn-secondary" onClick={ doorsColors.isNewDoorsColor? createDColor : updateDColor}>{doorsColors.isNewDoorsColor? 'Добавить цвет' : 'Изменить цвет'}</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default DoorsColorsEdit;