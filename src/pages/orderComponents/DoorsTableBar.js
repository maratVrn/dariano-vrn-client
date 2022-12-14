import React, {useContext, useEffect, useState} from 'react';

import {Context} from "../../index";
import {deleteDoor, getDoors} from "../../http/directorysApi";
import OrderDoorsEditModal from "./OrderDoorsEditModal";
import {observer} from "mobx-react-lite";

const DoorsTableBar = observer(() => {

    const {doors}           = useContext(Context);
    const {orderDoors}      = useContext(Context);
    const {orderDoorPos}    = useContext(Context);
    const [doorEditVisible, setDoorEditVisible] = useState(false)

    useEffect(() =>{

        // TODO: Загружать список всех дверей неправильно тут слишком большой массив грузить весь прайс постоянно
        try {getDoors().then(data => { doors.setData(data) })
        }
        catch (e) {console.log('ошибка при получении списка   '+ e.message)}
    },[])


    const setOrderDoorPos = (door) => {
        orderDoorPos.isStart = true
        orderDoorPos.collection = door.collection
        orderDoorPos.model = door.model
        orderDoorPos.color = door.color
        orderDoorPos.glass = door.glass
        orderDoorPos.price = door.price
        orderDoorPos.num = door.num
        orderDoorPos.sum = door.sum
        orderDoorPos.height = door.height
        orderDoorPos.width = door.width
        orderDoorPos.comment = door.comment


    }

    const UpdateDorPos = () =>{
        if (orderDoors.selectedNum >-1) {
            orderDoorPos.isNew = false; orderDoorPos.isStart = true; setDoorEditVisible (true)
        }
    }
    const confirmAndDelete = () => {
        if (orderDoors.selectedNum >-1) {
        if (window.confirm(`Вы действительно хотите удалить позицию ${orderDoors.selectedNum+1}`)) {
            orderDoors.Data.splice(orderDoors.selectedNum,1);
            (orderDoors.Data.length>0) ? orderDoors.setSelectedNum(0) : orderDoors.setSelectedNum(-1)
        } }}

    return (

        <div className="border border-1 p-1 mx-2 my-1 border-dark rounded-3 " >
            <OrderDoorsEditModal show={doorEditVisible} onHide={() => setDoorEditVisible(false)}/>
            <div className="d-flex m-0">
                <button className="mx-1 btn-sm btn btn-secondary " style={{height:26, fontSize: 11}}
                        onClick={()=>{ orderDoorPos.isNew = true;  orderDoorPos.isStart = false; setDoorEditVisible (true);  }  }>Добавить</button>

                <button className="  btn-sm btn btn-secondary " style={{height:26, fontSize: 11}}
                        onClick={()=>{ if (orderDoors.selectedNum >-1) {orderDoorPos.isNew = true;  orderDoorPos.isStart = true;
                            setDoorEditVisible (true)}}}>Скопировать</button>

                <button className="mx-1  btn-sm btn btn-secondary " style={{height:26, fontSize: 11}}
                        onClick={()=> UpdateDorPos()} >Изменить</button>

                <button className="  btn-sm btn btn-secondary " style={{height:26, fontSize: 11}} onClick={() => confirmAndDelete() }> Удалить</button>
                <h6 className="pt-2 px-5" style={{fontSize: 12}}>Дверные полотна</h6>
            </div>

                <div>
                    <div style={{ height: 193, overflow: "auto"}} className="text-lg-start">
                        <table className=" table border  table-hover h-25 "  style={{lineHeight: 1, fontSize: 11}}>
                            <thead>
                            <tr>
                                <th scope="col">№</th>
                                <th scope="col">Модель</th>
                                <th scope="col">Цвет</th>
                                <th scope="col">Стекло</th>
                                <th scope="col">Размер</th>
                                <th scope="col">Цена</th>
                                <th scope="col">Кол-во</th>
                                <th scope="col">Сумма</th>
                                <th scope="col">Комментарий</th>

                            </tr>
                            </thead>
                            <tbody>
                            {

                                orderDoors.Data.map((door, idx) =>
                                    <tr
                                        key={idx} className="col-lg"
                                         style={{backgroundColor: idx === orderDoors.selectedNum ? 'LightGray' : 'white', cursor: 'pointer'}}

                                         onDoubleClick={() =>   UpdateDorPos()     }

                                         onClick={() => { orderDoors.setSelectedNum(idx);    setOrderDoorPos(door)}} >
                                        <td> {idx+1} </td>
                                        <td> {door.model}</td>
                                        <td> {door.color}</td>
                                        <td> {door.glass } </td>
                                        <td> {door.height.toString()+'x'+door.width}</td>
                                        <td> {door.price}</td>
                                        <td> {door.num}</td>
                                        <td> {door.sum}</td>
                                        <td> {door.comment}</td>
                                    </tr>)
                            }
                            </tbody>
                        </table>
                    </div>



            </div>
        </div>
    );
});

export default DoorsTableBar;