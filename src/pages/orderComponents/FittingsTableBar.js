import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {
    getFittingBrands,
    getFittingColors,
    getFittings,
    getFittingsPos,
    getMoldingPos,
    getMoldings
} from "../../http/directorysApi";
import OrderFittingEditModal from "./OrderFittingEditModal";
import {observer} from "mobx-react-lite";

import styles from '../../style/style.css'

const FittingsTableBar = observer(() => {

    const {fittings}           = useContext(Context);
    const {fittingBrands}      = useContext(Context);
    const {fittingPos}         = useContext(Context);
    const {orderFittings}      = useContext(Context);
    const {orderFittingPos}    = useContext(Context);
    const {fittingColors}    = useContext(Context);


    const [fittingEditVisible, setFittingEditVisible] = useState(false)

    useEffect(() =>{
        try {  getFittings().then(data => {fittings.setData(data)})
            getFittingBrands().then(data => { fittingBrands.setData(data)})
            getFittingsPos().then(data => { fittingPos.setData(data)})
            getFittingColors().then(data => fittingColors.setData(data))

        }
        catch (e) {console.log('ошибка   '+ e.message)}
    },[])



    const setFittingDoorPos = (fitting) => {
        orderFittingPos.isStart     = true
        orderFittingPos.fitting     = fitting.fitting
        orderFittingPos.brand       = fitting.brand
        orderFittingPos.model       = fitting.model
        orderFittingPos.color       = fitting.color
        orderFittingPos.price       = fitting.price
        orderFittingPos.num         = fitting.num
        orderFittingPos.sum         = fitting.sum
        orderFittingPos.comment     = fitting.comment
    }

    const UpdateFittingPos = () =>{
        if (orderFittings.selectedNum >-1) {
            orderFittingPos.isNew = false; orderFittingPos.isStart = true; setFittingEditVisible (true)
        }
    }
    const confirmAndDelete = () => {
        if (orderFittings.selectedNum >-1) {
        if (window.confirm(`Вы действительно хотите удалить позицию ${orderFittings.selectedNum+1}`)) {
            orderFittings.Data.splice(orderFittings.selectedNum,1);
            (orderFittings.Data.length>0) ? orderFittings.setSelectedNum(0) : orderFittings.setSelectedNum(-1)
        } }}

    return (

        <div className="border border-1 p-1 mx-1 my-1 border-dark rounded-3 " >
            <OrderFittingEditModal show={fittingEditVisible} onHide={() => setFittingEditVisible(false)}/>
            <div className="d-flex m-0">
                <button className="mx-1 btn-sm btn btn-secondary " style={{height:26, fontSize: 11}}
                        onClick={()=>{ orderFittingPos.isNew = true;  orderFittingPos.isStart = false; setFittingEditVisible (true);  }  }>Добавить</button>

                <button className="  btn-sm btn btn-secondary " style={{height:26, fontSize: 11}}
                        onClick={()=>{ if (orderFittings.selectedNum >-1) {orderFittingPos.isNew = true;  orderFittingPos.isStart = true;
                            setFittingEditVisible (true)}}}>Скопировать</button>

                <button className="mx-1  btn-sm btn btn-secondary " style={{height:26, fontSize: 11}}
                        onClick={()=> UpdateFittingPos()} >Изменить</button>

                <button className="  btn-sm btn btn-secondary " style={{height:26, fontSize: 11}} onClick={() => confirmAndDelete() }> Удалить</button>
                <h6 className="myFont" >Фурнитура</h6>
            </div>

                <div>
                    <div style={{ height: 193, overflow: "auto"}} className="text-lg-start">
                        <table className=" table border  table-hover h-25 "  style={{lineHeight: 1, fontSize: 11}}>
                            <thead>
                            <tr>
                                <th scope="col">№</th>
                                <th scope="col">Наименование</th>
                                <th scope="col">Цвет</th>
                                <th scope="col">Цена</th>
                                <th scope="col">Кол-во</th>
                                <th scope="col">Сумма</th>
                                <th scope="col">Комментарий</th>

                            </tr>
                            </thead>
                            <tbody>
                            {

                                orderFittings.Data.map((fitting, idx) =>
                                    <tr
                                        key={idx} className="col-lg"
                                         style={{backgroundColor: idx === orderFittings.selectedNum ? 'LightGray' : 'white', cursor: 'pointer'}}

                                         onDoubleClick={() =>   UpdateFittingPos()     }

                                         onClick={() => { orderFittings.setSelectedNum(idx);    setFittingDoorPos(fitting)}} >
                                        <td> {idx+1} </td>

                                        <td> {`${fitting.fitting} (${fitting.brand}, ${fitting.pos})`}</td>
                                        <td> {fitting.color}</td>
                                        <td> {fitting.price}</td>
                                        <td> {fitting.num}</td>
                                        <td> {fitting.sum}</td>
                                        <td> {fitting.comment}</td>
                                    </tr>)
                            }
                            </tbody>
                        </table>
                    </div>



            </div>
        </div>
    );
});

export default FittingsTableBar;