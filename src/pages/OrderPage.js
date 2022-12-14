import React, {useContext, useEffect, useState} from 'react';
import {MAIN_ROUTE, NEW_ORDER_ROUTE, ORDER_STATE} from "../utils/const";
import {observer} from "mobx-react-lite";
import {useLocation, useNavigate} from "react-router-dom";
import {Form} from "react-bootstrap";
import {createOrder, updateOrder} from "../http/ordersApi";
import {Context} from "../index";
import DoorsTableBar from "./orderComponents/DoorsTableBar";
import MoldingsTableBar from "./orderComponents/MoldingsTableBar"
import FittingsTableBar from "./orderComponents/FittingsTableBar"



const OrderPage = observer( ()=> {
    const location = useLocation()
    const navigate = useNavigate()
    const {clients} = useContext(Context);
    const {orderDoors}    = useContext(Context);
    const {orderMoldings} = useContext(Context);
    const {orderFittings} = useContext(Context);

    const [cDate, setCDate] = useState('')
    const [cStatus, setCStatus] = useState('')
    const [cSum, setCSum] = useState(0)
    const [cDoorDiscount, setCDoorDiscount] = useState(0)
    const [cDoorSum, setCDoorSum] = useState(0)
    const [cMoldingDiscount, setCMoldingDiscount] = useState(0)
    const [cMoldingSum, setCMoldingSum] = useState(0)
    const [cFittingDiscount, setCFittingDiscount] = useState(0)
    const [cFittingSum, setCFittingSum] = useState(0)
    const [cComment, setCComment] = useState('')




    const {orders} = useContext(Context);



    const isNewOrder = location.pathname === NEW_ORDER_ROUTE  // Используем страницу универсально для создания нового ордера и редактирования старого

    const addOrder = () => {
        const formData = new FormData()
        formData.append('date', cDate)
        formData.append('status', cStatus)
        formData.append('sum', cSum.toString())
        formData.append('doorDiscount', cDoorDiscount.toString())
        formData.append('doorSum', cDoorSum.toString())
        formData.append('moldingDiscount', cMoldingDiscount.toString())
        formData.append('moldingSum', cMoldingSum.toString())
        formData.append('fittingDiscount', cFittingDiscount.toString())
        formData.append('fittingSum', cFittingSum.toString())
        formData.append('comment', cComment)
        formData.append('clientId', clients.getSelectedClient().id)
        formData.append('doorData',JSON.stringify(orderDoors.Data))
        formData.append('moldingData',JSON.stringify(orderMoldings.Data))
        formData.append('fittingData',JSON.stringify(orderFittings.Data))
        console.log(JSON.stringify(orderFittings.Data));
        createOrder(formData).then(data => {navigate(MAIN_ROUTE)})
    }

    const updateCurOrder = () => {
        updateOrder({ date: cDate, status : cStatus, sum: cSum, clientId : clients.getSelectedClient().id ,
            doorDiscount : cDoorDiscount, doorSum : cDoorSum, moldingDiscount : cMoldingDiscount, moldingSum : cMoldingSum,
            fittingDiscount : cFittingDiscount, fittingSum : cFittingSum, comment : cComment,
            moldingData : JSON.stringify(orderMoldings.Data), fittingData : JSON.stringify(orderFittings.Data),
            doorData : JSON.stringify(orderDoors.Data), id : orders.getSelectedOrder().id}).then(data => {
             navigate(MAIN_ROUTE)
         })
    }

    async function moexTickerLast(ticker) {
        const json = await fetch('https://iss.moex.com/iss/engines/stock/markets/shares/securities/' + ticker + '.json').then(function(res) { return res.json()});
        return json.marketdata.data.filter(function(d) { return ['TQBR', 'TQTF'].indexOf(d[1]) !== -1; })[0][12];
    }
    const doIt = () => {
        moexTickerLast('GAZP').then(console.log);
        moexTickerLast('SBER').then(console.log);
    }

const calcSumData = () => {
    let sumD = 0
    if (orderDoors.Data.length > 0) {
        orderDoors.Data.map((door) => {  sumD += door.sum })
        sumD = sumD*(100-cDoorDiscount)/100}
    if (orders.getSelectedOrder().doorSum !== sumD) {
        orders.getSelectedOrder().doorSum = sumD
        setCDoorSum(sumD) }

    let sumM = 0
    if (orderMoldings.Data.length > 0) {
        orderMoldings.Data.map((door) => {  sumM += door.sum })
        sumM = sumM*(100-cMoldingDiscount)/100}
    if (orders.getSelectedOrder().moldingSum !== sumM) {
        orders.getSelectedOrder().moldingSum = sumM
        setCMoldingSum(sumM) }

    let sumF = 0
    if (orderFittings.Data.length > 0) {
        orderFittings.Data.map((door) => {  sumF += door.sum })
        sumF = sumF*(100-cFittingDiscount)/100}
    if (orders.getSelectedOrder().fittingSum !== sumF) {
        orders.getSelectedOrder().fittingSum = sumF
        setCFittingSum(sumF) }

    const sumAll = sumD + sumM + sumF;
    if (cSum!==sumAll)  setCSum(sumAll)
}
    // При открытии страницы
    useEffect(() =>{
        if (isNewOrder){
            setCDate(new Date().toISOString().substring(0, 10))
            setCStatus("1")
            setCSum(0)
            setCDoorDiscount(0)
            setCDoorSum(0)
            setCMoldingSum(0)
            setCMoldingDiscount(0)
            setCFittingDiscount(0)
            setCFittingSum(0)
            orderDoors.setData([])
            orderMoldings.setData([])
            orderFittings.setData([])
            setCComment('')


        }
        else {
            setCDate(orders.getSelectedOrder().date)
            setCStatus(orders.getSelectedOrder().status)
            setCSum(orders.getSelectedOrder().sum)
            setCDoorDiscount(orders.getSelectedOrder().doorDiscount)
            setCDoorSum(orders.getSelectedOrder().doorSum)
            setCMoldingSum(orders.getSelectedOrder().moldingSum)
            setCMoldingDiscount(orders.getSelectedOrder().moldingDiscount)
            setCFittingDiscount(orders.getSelectedOrder().fittingDiscount)
            setCFittingSum(orders.getSelectedOrder().fittingSum)
            setCComment(orders.getSelectedOrder().comment)

            try {orderMoldings.setData(JSON.parse(orders.getSelectedOrder().moldingData))
            } catch {orderMoldings.setData([])}
            try {orderFittings.setData(JSON.parse(orders.getSelectedOrder().fittingData))
            } catch {orderFittings.setData([])}
            try {orderDoors.setData(JSON.parse(orders.getSelectedOrder().doorData))
               } catch {orderDoors.setData([])}
        }
    },[])

    return (

        <div>
            <button className="mx-1 mt-1 btn-sm btn btn-secondary" onClick={isNewOrder? addOrder : updateCurOrder } >{isNewOrder ? 'Создать заказ' : 'Сохранить изменения'}</button>
            <button className="mx-1 mt-1 btn-sm btn btn-secondary" onClick={() => navigate(MAIN_ROUTE)} >Отмена </button>
            <button className="mx-1 mt-1 btn-sm btn btn-secondary"   onClick={() => doIt()} >Расчет </button>
            <button className="mx-1 mt-1 btn-sm btn btn-secondary" >Договор </button>
            <button className="mx-1 mt-1 btn-sm btn btn-secondary" >Спецификация </button>
            <button className="mx-1 mt-1 btn-sm btn btn-secondary" >Акт приемо-передачи </button>
            <div className="input-group input-group-sm ">
                <div className="col-4 " >


                    <div className=" border border-1 input-group input-group-sm  py-1 m-1  border-dark rounded-3">


                        <div className="col-6  ">


                            <div className="input-group input-group-sm my-1 px-1">
                                <span className="input-group-text col-4" id="inputGroup-sizing-sm" >Дата</span>
                                <Form.Control
                                    className="form-control"
                                    type="date"
                                    value={cDate}
                                    onChange={e=>setCDate(e.target.value)}
                                />
                            </div>

                            <div className="input-group input-group-sm my-1 px-1" >
                                <span className="input-group-text col-8" id="inputGroup-sizing-sm">Скидка полотна %</span>
                                <Form.Control
                                    className="form-control -2"
                                    type="number"
                                    value={cDoorDiscount}
                                    onChange={e=>{ let newD = e.target.valueAsNumber
                                        if (!newD) newD = 0; else  if (newD<0) newD = 0; else  if (newD>100) newD = 100
                                        setCDoorDiscount(newD)  }}
                                />

                            </div>
                            <div className="input-group input-group-sm my-1 px-1" >
                                <span className="input-group-text col-8" id="inputGroup-sizing-sm">Скидка погонаж %</span>
                                <Form.Control
                                    className="form-control -2"
                                    type="number"
                                    value={cMoldingDiscount}
                                    onChange={e=>{ let newD = e.target.valueAsNumber
                                        if (!newD) newD = 0; else  if (newD<0) newD = 0; else  if (newD>100) newD = 100
                                        setCMoldingDiscount(newD)  }}
                                />
                            </div>
                            <div className="input-group input-group-sm my-1 px-1" >
                                <span className="input-group-text col-8" id="inputGroup-sizing-sm">Скидка фурнитура %</span>
                                <Form.Control
                                    className="form-control -2"
                                    type="number"
                                    value={cFittingDiscount}
                                    onChange={e=>{ let newD = e.target.valueAsNumber
                                        if (!newD) newD = 0; else  if (newD<0) newD = 0; else  if (newD>100) newD = 100
                                        setCFittingDiscount(newD)  }}
                                />
                            </div>

                        </div>
                        <div className="col-6 ">

                            <div className="input-group input-group-sm my-1 px-1" >
                                <span className="input-group-text col-5" id="inputGroup-sizing-sm">Сумма</span>
                                <Form.Control
                                    className="form-control -2" disabled
                                    type="number"    value={cSum}

                                />
                            </div>


                            <div className="input-group input-group-sm my-1 px-1" >
                                <span className="input-group-text col-5" id="inputGroup-sizing-sm">Полотна</span>
                                <Form.Control
                                    className="form-control -2" disabled
                                    type="number"  value={cDoorSum}

                                />
                            </div>
                            <div className="input-group input-group-sm my-1 px-1" >
                                <span className="input-group-text col-5" id="inputGroup-sizing-sm">Погонаж</span>
                                <Form.Control
                                    className="form-control -2"  disabled
                                    type="number"  value={cMoldingSum}
                                />
                            </div>
                            <div className="input-group input-group-sm my-1 px-1" >
                                <span className="input-group-text col-5" id="inputGroup-sizing-sm">Фурнитура</span>
                                <Form.Control
                                    className="form-control -2" disabled
                                    type="number"     value={cFittingSum}
                                />
                            </div>

                        </div>

                        <div className="input-group input-group-sm my-1 px-1">
                            <span className="input-group-text col-4" id="inputGroup-sizing-sm">Статус</span>
                            <select className="form-select"  onChange={ e=> setCStatus(e.target.value)}
                                    value={cStatus}>
                                { ORDER_STATE.map((orderState) =>
                                    <option  key={orderState.ID}  value={orderState.ID} >{orderState.State} </option>
                                )}
                            </select>
                        </div>
                        <div className="input-group input-group-sm my-1 px-1">
                            <span className="input-group-text col-4" id="inputGroup-sizing-sm">Комментарий</span>
                            <Form.Control
                                className="form-control -2"
                                value={cComment}
                                onChange={e=>setCComment(e.target.value)}
                            />
                        </div>


                    </div>

                </div>


                <div className="col-8 ">
                    <DoorsTableBar/>
                </div>
            </div>
            <div className="input-group input-group-sm ">

                <div className="col-6 ">
                    <MoldingsTableBar/>
                      {calcSumData()}
                </div>
                <div className="col-6 ">
                    <FittingsTableBar/>
                </div>
            </div>


        </div>


    );
});

export default OrderPage;