import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {DOORS_COLLECTIONS} from "../../utils/const";

import {Context} from "../../index";
import {

    getClassicModel,
    getModernModel,
    getNeoClassicModel
} from "../../http/directorysApi";
import {observer} from "mobx-react-lite";


const OrderMoldingEditModal = observer(({show, onHide}) => {

    const {moldings}           = useContext(Context);  // Виды погонажа
    const {moldingPos}         = useContext(Context);  // Прайс лист погонажа
    const {orderMoldings}      = useContext(Context);  // Список погонажа в заказе
    const {orderMoldingPos}    = useContext(Context);  // Выбранная позиция



    const [colors, SetDColors] = useState([])

    const [cModel, setCModel] = useState(0)
    const [cPrice, setCPrice] = useState(0)
    const [cColor, setCColor] = useState(0)
    const [cNum,   setCNum]   = useState(1)
    const [cSum,   setCSum]   = useState(0)
    const [cComment, setCComment] = useState('')


    const setNewData = () =>{
        orderMoldingPos.price = cPrice
        orderMoldingPos.num = cNum
        orderMoldingPos.sum = cSum
        orderMoldingPos.color = cColor
        orderMoldingPos.comment = cComment
    }


    const createNewMoldingPos = () => {
        setNewData()
        orderMoldings.Data.push(orderMoldingPos);
        orderMoldings.setSelectedNum(orderMoldings.Data.length-1)
        onHide()

    }

    const updateMoldingPos = () => {
        setNewData()
        orderMoldings.Data[orderMoldings.selectedNum] = orderMoldingPos;
        onHide()
    }


    const SetMolding = (value) => {


        setCModel(value)
        orderMoldingPos.model = value
        const newShow = []

        moldingPos.Data.map(   (molding) => { if (molding.moldingType === value)  newShow.push(molding.color);})

        SetDColors(newShow)

        const newColor = (newShow.length > 0) ? newShow[0] : '';

        (orderMoldingPos.isStart) ? SetColor(orderMoldingPos.color) :  SetColor(newColor)

    }

    const SetColor = (color) => {
        setCColor(color)
        const index = moldingPos.Data.findIndex(molding => (molding.color === color) && (molding.moldingType === orderMoldingPos.model) );
        const newPrice = (index>-1) ? moldingPos.Data[index].price : 0;
        (orderMoldingPos.isStart) ? CalcSum(orderMoldingPos.price, orderMoldingPos.num) :  CalcSum(newPrice, 1)
    }


    const CalcSum = (price, num) => {
        setCPrice(price)
        setCNum(num)
        const sum = price*num
        setCSum(sum)
        orderMoldingPos.isStart = false
    }



    const SetParams = () => {
        if (orderMoldingPos.isStart) {
            SetMolding(orderMoldingPos.model)
            setCComment(orderMoldingPos.comment)

        } else {

            SetMolding(moldings.Data[0].model)
            setCComment('')
        }

    }

    return (
        <div>
            <Modal show={show} onHide={onHide} size="lg" centered onShow={SetParams}>
                <Modal.Header closeButton>
                    <Modal.Title id="">
                        {orderMoldingPos.isNew ? 'Добавить позицию' : 'Изменить позицию'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>

                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text col-3" id="inputGroup-sizing-sm">Изделие</span>
                            <select className="form-select" onChange={e => {SetMolding(e.target.value)}}  value={cModel}>
                                {moldings.Data.map((molding) =>
                                    <option key={molding.id} value={molding.model} >{molding.model} </option>
                                )}
                            </select>

                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text col-3" id="inputGroup-sizing-sm">Цвет</span>
                            <select className="form-select" value={cColor}
                                    onChange={ e=>{SetColor(e.target.value)}} >
                                {colors.map((color, index) =>
                                    <option key={index} value={color}>  {color} </option>)}
                            </select>

                        </div>

                        <div className="input-group input-group-sm">
                            <div className="col-4  ">
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text col-4" id="inputGroup-sizing-sm" >Цена</span>
                                    <input type="number" className="form-control" value={cPrice}  onChange={e=>CalcSum(e.target.value, cNum)}   ></input>
                                </div>
                            </div>
                            <div className="col-4  ">
                                <div className="input-group input-group-sm  px-2">
                                    <span className="input-group-text col-6" id="inputGroup-sizing-sm" >Колличество</span>
                                    <input type="number" className="form-control" value={cNum}  onChange={e=>CalcSum(cPrice, e.target.value)}   ></input>
                                </div>
                            </div>
                            <div className="col-4  ">
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text col-4" id="inputGroup-sizing-sm" >Сумма</span>
                                    <input type="number" disabled className="form-control" value={cSum} ></input>
                                </div>
                            </div>
                        </div>


                        <div className="input-group input-group-sm my-2">
                            <span className="input-group-text col-2" id="inputGroup-sizing-sm" >Комментарий</span>
                            <input  className="form-control" value={cComment}  onChange={e=>setCComment(e.target.value)}   ></input>
                        </div>


                    </form>


                </Modal.Body>

                <Modal.Footer>
                    <Button className="m-1 btn-sm btn btn-secondary" onClick={onHide}>Закрыть</Button>
                    <Button className="m-1 btn-sm btn btn-secondary"
                            onClick={() =>//doors.isNew ? createNewDoor : updateCrDoor
                            { orderMoldingPos.isNew ? createNewMoldingPos() : updateMoldingPos()

                            }}>{orderMoldingPos.isNew ? 'Добавить позицию' : 'Изменить позицию'}</Button>
                </Modal.Footer>

            </Modal>
        </div>
    );
});

export default OrderMoldingEditModal;