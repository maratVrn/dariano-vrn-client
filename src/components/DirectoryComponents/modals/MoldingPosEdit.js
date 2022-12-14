import React, {useContext, useState} from 'react';
import {Button, Modal} from "react-bootstrap";

import {Context} from "../../../index";
import {
    createMoldingPos,

    getMoldingPos, updateMoldingPos,

} from "../../../http/directorysApi";
import {DOORS_COLLECTIONS} from "../../../utils/const";


const MoldingPosEdit =  ({show, onHide}) => {


    const {moldingPos}                      = useContext(Context);
    const {moldings}                        = useContext(Context);
    const {doorsColors}                     = useContext(Context);
    const {showMoldingPos}                  = useContext(Context);
    const [cMoldingType, setCMoldingType]   = useState('')
    const [cColor,     setCColor]           = useState('')
    const [cPrice,     setCPrice]           = useState(0)
    const [cComment,   setCComment]         = useState('')


    // При открытии страницы
    const SetParams = () => {



        const startColor = (doorsColors.DoorsColors.length >0) ? doorsColors.DoorsColors[0].color : '';

        if (moldingPos.isNew) {  setCMoldingType(moldings.getSelectedOne().model); setCColor(startColor); setCPrice(0); setCComment('')

        } else {   setCMoldingType(moldingPos.getSelectedOne().moldingType);
            setCColor(moldingPos.getSelectedOne().color);
            setCPrice(moldingPos.getSelectedOne().price);
            setCComment(moldingPos.getSelectedOne().comment); }

    }

    const createMoldingPosNew = () => {
        createMoldingPos({ moldingType: cMoldingType, price : cPrice, color : cColor,
            comment : cComment}).then(data => {
            // После создания клиента запрашиваем обновленный список и выделяем клиента которого создали
            getMoldingPos().then(data => {
                moldingPos.setData(data)
                if (moldingPos.Data.length > 0) {
                    moldingPos.setSelectedOne(moldingPos.Data[moldingPos.Data.length-1])
                    showMoldingPos.setData(moldingPos.Data.filter(   (molding) => {return molding.moldingType === moldings.getSelectedOne().model }))
                }
            })
            onHide()
        })
    }

    const updateMolding = () => {
        updateMoldingPos({moldingType: cMoldingType, price : cPrice, color : cColor,
            comment : cComment, id:moldingPos.getSelectedOne().id} ).then(data => {
            // После создания клиента запрашиваем обновленный список и выделяем клиента которого создали

            onHide()
            getMoldingPos().then(data => {
                moldingPos.setData(data)
                showMoldingPos.setData(moldingPos.Data.filter(   (molding) => {return molding.moldingType === moldings.getSelectedOne().model }))
            } )
        })
    }

    return (
        <Modal show={show}  onHide={onHide} size="lg" centered  onShow={SetParams} >
            <Modal.Header closeButton>
                <Modal.Title id="">
                    {moldingPos.isNew? 'Добавить модель' : 'Изменить модель'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text col-2" id="inputGroup-sizing-sm">Модель</span>
                        <select className="form-select" disabled onChange={e => setCMoldingType(e.target.value)}
                                value={cMoldingType}>
                            {moldings.Data.map((dModel) =>
                                <option key={dModel.id} value={dModel.model}>{dModel.model} </option>
                            )}
                        </select>

                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text col-2" id="inputGroup-sizing-sm">Цвет</span>
                        <select className="form-select" onChange={e => setCColor(e.target.value)}
                                value={cColor}>
                            {doorsColors.DoorsColors.map((color) =>
                                <option key={color.id} value={color.color}>{color.color} </option>
                            )}
                        </select>

                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text col-2" id="inputGroup-sizing-sm">Цена</span>
                        <input type="text" className="form-control" value={cPrice}  onChange={e=>setCPrice(e.target.value)}   ></input>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text col-2" id="inputGroup-sizing-sm">Коментарий</span>
                        <input type="text" className="form-control" value={cComment}  onChange={e=>setCComment(e.target.value)}   ></input>

                    </div>
                </form>

            </Modal.Body>


            <Modal.Footer>
                <Button className="m-1 btn-sm btn btn-secondary" onClick={onHide}>Закрыть</Button>
                <Button className="m-1 btn-sm btn btn-secondary" onClick={ moldingPos.isNew? createMoldingPosNew : updateMolding}>
                    {moldingPos.isNew? 'Добавить модель' : 'Изменить модель'}</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default MoldingPosEdit;