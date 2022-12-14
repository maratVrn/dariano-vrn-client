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


const OrderDoorsEditModal = observer(({show, onHide}) => {

    const {orderDoorPos} = useContext(Context);
    const {orderDoors} = useContext(Context);
    const {doors} = useContext(Context);
    const {classicModels} = useContext(Context);
    const {showDoors} = useContext(Context);


    const [colors, SetDColors] = useState([])
    const [glasses, setCGlasses] = useState([])

    const [cGlass, setCGlass] = useState('')
    const [cPrice, setCPrice] = useState(0)
    const [cNum,   setCNum]   = useState(1)
    const [cSum,   setCSum]   = useState(0)
    const [cHeight,setCHeight]= useState(2000)
    const [cWidth, setCWidth] = useState(800)
    const [cComment, setCComment] = useState('')


    const setNewData = () =>{
        orderDoorPos.glass = cGlass
        orderDoorPos.price = cPrice
        orderDoorPos.num = cNum
        orderDoorPos.sum = cSum
        orderDoorPos.height = cHeight
        orderDoorPos.width = cWidth
        orderDoorPos.comment = cComment
    }


    const createNewDoorPos = () => {
        setNewData()
        orderDoors.Data.push(orderDoorPos);
        orderDoors.setSelectedNum(orderDoors.Data.length-1)
        onHide()

    }

    const updateDoorPos = () => {
        setNewData()
        orderDoors.Data[orderDoors.selectedNum] = orderDoorPos;
        // orderDoors.setSelectedNum(orderDoors.Data.length-1)
        onHide()

    }


    const SetCollection = (value) => {

        orderDoorPos.collection = value


        if (value === DOORS_COLLECTIONS[0].State) getClassicModel().then(data => {
            classicModels.setData(data)
            if (classicModels.Data.length > 0) {

                (orderDoorPos.isStart)? SetModel(orderDoorPos.model) : SetModel(classicModels.Data[0].model)
            }
        })
        if (value === DOORS_COLLECTIONS[1].State) getNeoClassicModel().then(data => {
            classicModels.setData(data)
            if (classicModels.Data.length > 0) {
                (orderDoorPos.isStart)? SetModel(orderDoorPos.model) : SetModel(classicModels.Data[0].model)
            }
        })
        if (value === DOORS_COLLECTIONS[2].State) getModernModel().then(data => {
            classicModels.setData(data)
            if (classicModels.Data.length > 0) {

                (orderDoorPos.isStart)? SetModel(orderDoorPos.model) : SetModel(classicModels.Data[0].model)
            }
        })
    }

    const SetModel = (dModel) => {
        // Фоормируем список дверей на отображение выбираем только одну модель и коллекцию
        orderDoorPos.model = dModel
        // console.log(dModel);

        showDoors.setData(doors.Data.filter((door) => {
            return door.collection === orderDoorPos.collection  && door.name === dModel
        }))
        SetColors()


    }

    const SetColors = () => {
        const newColors2 = []

        showDoors.Data.map((door) => {
            if (!newColors2.includes(door.color))  newColors2.push(door.color); })
        SetDColors(newColors2)
        const newColor = (newColors2.length > 0) ? newColors2[0] : '';
        // { console.log(orderDoorPos);}

        (!orderDoorPos.isStart) ? SetGlasses(newColor) : SetGlasses(orderDoorPos.color)
    }



    const SetGlasses = (color) => {

        // console.log(color);

        orderDoorPos.color = color
        const newGlasses = []
        showDoors.Data.map((door) => {
            if (door.color === color) newGlasses.push(door.glass)
        })
        setCGlasses(newGlasses);
        const newGlass = (newGlasses.length > 0) ? newGlasses[0] : '';

        (orderDoorPos.isStart) ? SetGlass(orderDoorPos.glass) :  SetGlass(newGlass)


    }

    const SetGlass = (glass) => {
        setCGlass(glass)
        orderDoorPos.glass = glass
        const index = showDoors.Data.findIndex(door => door.color === orderDoorPos.color && door.glass === glass );
        const newPrice = (index>-1) ? showDoors.Data[index].price : 0;

        (orderDoorPos.isStart) ? CalcSum(orderDoorPos.price, orderDoorPos.num) :  CalcSum(newPrice, 1)
    }

    const CalcSum = (price, num) => {
        setCPrice(price)
        setCNum(num)
        const sum = price*num
        setCSum(sum)
        orderDoorPos.isStart = false
    }



    const SetParams = () => {

        if (orderDoorPos.isStart) {
            SetCollection( orderDoorPos.collection)
            setCHeight(orderDoorPos.height)
            setCWidth(orderDoorPos.width)
            setCComment(orderDoorPos.comment)

        } else {
            SetCollection(DOORS_COLLECTIONS[0].State)
            setCHeight(2000)
            setCWidth(800)
            setCComment('')
        }

    }

    return (
        <div>
            <Modal show={show} onHide={onHide} size="lg" centered onShow={SetParams}>
                <Modal.Header closeButton>
                    <Modal.Title id="">
                        {orderDoorPos.isNew ? 'Добавить позицию' : 'Изменить позицию'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>

                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text col-3" id="inputGroup-sizing-sm">Коллекция</span>
                            <select className="form-select" onChange={e => {SetCollection(e.target.value, false)}}  value={orderDoorPos.collection}>
                                {DOORS_COLLECTIONS.map((collection) =>
                                    <option key={collection.ID} value={collection.State} >{collection.State} </option>
                                )}
                            </select>

                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text col-3" id="inputGroup-sizing-sm">Название</span>
                            <select className="form-select form-select-sm" value={orderDoorPos.model} onChange={e => {
                                SetModel(e.target.value)
                            }}>
                                {classicModels.Data.map((dModel) =>
                                    <option key={dModel.id} value={dModel.model}>{dModel.model} </option>)}
                            </select>
                        </div>
                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text col-3" id="inputGroup-sizing-sm">Цвет</span>
                            <select className="form-select" value={orderDoorPos.color}
                                    onChange={e => {
                                       // orderDoorPos.color = e.target.value
                                        SetGlasses(e.target.value)}}>
                                {colors.map((color, index) =>
                                    <option key={index} value={color}>  {color} </option>)}
                            </select>

                        </div>
                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text col-3" id="inputGroup-sizing-sm">Стекло</span>
                            <select className="form-select" value={cGlass}
                                 onChange={e => {SetGlass(e.target.value)}}  >

                                {glasses.map((glass, index) =>
                                        <option key={index} value={glass}> {glass} </option> )}
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

                        <div className="input-group input-group-sm py-2">
                            <div className="col-4  ">
                                <div className="input-group input-group-sm  ">
                                    <span className="input-group-text col-6" id="inputGroup-sizing-sm" >Высота</span>
                                    <input type="number" className="form-control" value={cHeight}  onChange={e=>setCHeight(e.target.valueAsNumber)} ></input>
                                </div>
                            </div>
                            <div className="col-4  ">
                                <div className="input-group input-group-sm  px-2">
                                    <span className="input-group-text col-6" id="inputGroup-sizing-sm" >Ширина</span>
                                    <input type="number" className="form-control" value={cWidth}  onChange={e=>setCWidth(e.target.valueAsNumber)}   ></input>
                                </div>
                            </div>

                        </div>

                        <div className="input-group input-group-sm ">
                            <span className="input-group-text col-2" id="inputGroup-sizing-sm" >Комментарий</span>
                            <input  className="form-control" value={cComment}  onChange={e=>setCComment(e.target.value)}   ></input>
                        </div>


                    </form>


                </Modal.Body>

                <Modal.Footer>
                    <Button className="m-1 btn-sm btn btn-secondary" onClick={onHide}>Закрыть</Button>
                    <Button className="m-1 btn-sm btn btn-secondary"
                            onClick={() =>//doors.isNew ? createNewDoor : updateCrDoor
                            { orderDoorPos.isNew ? createNewDoorPos() : updateDoorPos()

                            }}>{orderDoorPos.isNew ? 'Добавить позицию' : 'Изменить позицию'}</Button>
                </Modal.Footer>

            </Modal>
        </div>
    );
});

export default OrderDoorsEditModal;