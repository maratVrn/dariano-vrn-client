import React, {useContext, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";


const OrderFittingEditModal = observer(({show, onHide}) => {


    const {fittings}           = useContext(Context);   // Виды фурнитуры
    const {fittingBrands}      = useContext(Context);   // Виды брендов
    const {fittingPos}         = useContext(Context);   // Прайс лист фурнитуры
    const {orderFittings}      = useContext(Context);   // Список фурнитуры в заказе
    const {orderFittingPos}    = useContext(Context);   // Выбранная позиция
    const {fittingColors}      = useContext(Context);   // Список цветов фурнитуры
    const {showFittingPos}     = useContext(Context);   // Список вариантов на отображении в соотв м видом и брендом


    const [cFitting, setCFitting] = useState('')
    const [cBrand,   setCBrand] = useState('')
    const [cModel,   setCModel] = useState('')
    const [cColor, setCColor] = useState('')
    const [cPrice,   setCPrice] = useState(0)
    const [cNum,   setCNum]   = useState(1)
    const [cSum,   setCSum]   = useState(0)
    const [cComment, setCComment] = useState('')

    const setNewData = () =>{
        orderFittingPos.fitting = cFitting
        orderFittingPos.brand = cBrand
        orderFittingPos.model = cModel
        orderFittingPos.color = cColor
        orderFittingPos.price = cPrice
        orderFittingPos.num = cNum
        orderFittingPos.sum = cSum
        orderFittingPos.comment = cComment
    }


    const createNewFittingPos = () => {
        setNewData()
        orderFittings.Data.push(orderFittingPos);
        orderFittings.setSelectedNum(orderFittings.Data.length-1)
        onHide()

    }

    const updateFittingPos = () => {
        setNewData()
        orderFittings.Data[orderFittings.selectedNum] = orderFittingPos;
        onHide()
    }


    const SetFittingAndBrand = (fitting, brand) => {
        setCFitting(fitting)
        setCBrand(brand)

        orderFittingPos.fitting = fitting
        orderFittingPos.brand   = brand

        showFittingPos.setData( fittingPos.Data.filter( (fit) => {return fit.fitting === fitting &&
            fit.brand === brand }))

        const startModel = (showFittingPos.Data.length > 0) ? showFittingPos.Data[0].pos : '';

        (orderFittingPos.isStart) ?  SetModel(orderFittingPos.pos) : SetModel(startModel)

    }

    const SetModel = (pos) => {
        const index = showFittingPos.Data.findIndex(fitting => (fitting.pos === pos) );
        const startPrice = (index>-1) ? showFittingPos.Data[index].price : 0;
        setCModel(pos);
        (orderFittingPos.isStart) ?  CalcSum (orderFittingPos.price, orderFittingPos.num) : CalcSum(startPrice,1)
    }


    const CalcSum = (price, num) => {
        setCPrice(price)
        setCNum(num)
        const sum = price*num
        setCSum(sum)
        orderFittingPos.isStart = false
    }



    const SetParams = () => {
        if (orderFittingPos.isStart) {
            SetFittingAndBrand(orderFittingPos.fitting, orderFittingPos.brand)
            setCColor(orderFittingPos.color)
            setCComment(orderFittingPos.comment)
        } else {

            SetFittingAndBrand(fittings.Data[0].fitting, fittingBrands.Data[0].brand)
            setCColor(fittingColors.Data[0].color)
            setCComment('')
        }

    }

    return (
        <div>
            <Modal show={show} onHide={onHide} size="lg" centered onShow={SetParams}>
                <Modal.Header closeButton>
                    <Modal.Title id="">
                        {orderFittingPos.isNew ? 'Добавить позицию' : 'Изменить позицию'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>

                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text col-3" id="inputGroup-sizing-sm">Изделие</span>
                            <select className="form-select" onChange={e => {SetFittingAndBrand(e.target.value, cBrand)}}
                                    value={cFitting}>
                                {fittings.Data.map((fitting) =>
                                    <option key={fitting.id} value={fitting.fitting} >{fitting.fitting} </option>
                                )}
                            </select>
                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text col-3" id="inputGroup-sizing-sm">Бренд</span>
                            <select className="form-select" onChange={e => {SetFittingAndBrand(cFitting, e.target.value)}}
                                    value={cBrand}>
                                {fittingBrands.Data.map((fitting) =>
                                    <option key={fitting.id} value={fitting.brand} >{fitting.brand} </option>
                                )}
                            </select>
                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text col-3" id="inputGroup-sizing-sm">Модельный ряд</span>
                            <select className="form-select" value={cColor}
                                    onChange={ e=>{SetModel(e.target.value)}} >
                                {showFittingPos.Data.map((pos, index) =>
                                    <option key={index} value={pos.pos}>  {pos.pos} </option>)}
                            </select>

                        </div>

                        <div className="input-group input-group-sm mb-2">
                            <span className="input-group-text col-3" id="inputGroup-sizing-sm">Цвет</span>
                            <select className="form-select" value={cColor}
                                    onChange={ e=>{setCColor(e.target.value)}} >
                                {fittingColors.Data.map((color) =>
                                    <option key={color.id} value={color.color}>  {color.color} </option>)}
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
                            onClick={() =>
                            { orderFittingPos.isNew ? createNewFittingPos() : updateFittingPos()

                            }}>{orderFittingPos.isNew ? 'Добавить позицию' : 'Изменить позицию'}</Button>
                </Modal.Footer>

            </Modal>
        </div>
    );
});

export default OrderFittingEditModal;