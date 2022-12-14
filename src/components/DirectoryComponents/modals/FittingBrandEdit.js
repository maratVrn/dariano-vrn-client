import React, {useContext, useState} from 'react';
import {Button, Modal} from "react-bootstrap";

import {Context} from "../../../index";
import {
    createFittingBrands, getFittingBrands, updateFittingBrands


} from "../../../http/directorysApi";


const FittingBrandEdit =  ({show, onHide}) => {

    const {fittingBrands} = useContext(Context);
    const [cModel,     setCModel]      = useState('')


    // При открытии страницы
    const SetParams = () => {
        if (fittingBrands.isNew) {  setCModel('')
        } else {   setCModel(fittingBrands.getSelectedOne().fitting);        }}

    const createFittingBrand = () => {
        createFittingBrands({ brand: cModel}).then(data => {
            getFittingBrands().then(data => {
                fittingBrands.setData(data)
                if (fittingBrands.Data.length > 0) {
                    fittingBrands.setSelectedOne(fittingBrands.Data[fittingBrands.Data.length-1])
                }
            })
            onHide()
        })
    }

    const updateFittingBrand = () => {
        updateFittingBrands({brand : cModel, id:fittingBrands.getSelectedOne().id} ).then(data => {
            // После создания клиента запрашиваем обновленный список и выделяем клиента которого создали
            onHide()
            getFittingBrands().then(data => { fittingBrands.setData(data) } )
        })
    }

    return (
        <Modal show={show}  onHide={onHide} size="lg" centered  onShow={SetParams} >
            <Modal.Header closeButton>
                <Modal.Title id="">
                    {fittingBrands.isNew? 'Добавить бренд' : 'Изменить бренд'}
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
                <Button className="m-1 btn-sm btn btn-secondary" onClick={ fittingBrands.isNew? createFittingBrand : updateFittingBrand}>
                    {fittingBrands.isNew? 'Добавить бренд' : 'Изменить бренд'}</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default FittingBrandEdit;