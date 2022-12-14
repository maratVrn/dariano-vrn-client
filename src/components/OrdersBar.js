import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { useNavigate } from "react-router-dom"
import {ORDER_ROUTE, NEW_ORDER_ROUTE, ORDER_STATE} from "../utils/const";
import {deleteOrder, getOrders, getOrdersOneClient} from "../http/ordersApi";




const OrdersBar = observer( () => {
    const {orders} = useContext(Context);
    const {clients} = useContext(Context);
    const navigate = useNavigate()
    const [oldSelectedClientID, setOldSelectedClientID] = useState('0') // Для отслеживания изменения выбранного клиента
    const [needLoadOrders, setNeedLoadOrders] = useState('true')        // Для отслеживания изменения выбранного клиента



    const confirmAndDelete = () => {
        if (window.confirm(`Вы действительно хотите удалить заказ у клиента  ${clients.getSelectedClient().name}?`)) {
            deleteOrder(orders.getSelectedOrder().id ).then(()=>{
                getOrdersOneClient(clients.getSelectedClient().id).then(data => orders.setOrders(data))
            })
        }
    }

    // Для обновления списка заказов
    if (oldSelectedClientID !== clients.getSelectedClient().id){
        setNeedLoadOrders(true)
        setOldSelectedClientID(clients.getSelectedClient().id)
    }

    if((clients.getSelectedClient().id) && (needLoadOrders)) {

        setNeedLoadOrders(false)
        getOrdersOneClient(clients.getSelectedClient().id).then(data => { orders.setOrders(data) })
    }

    return (

        <div style={{ height: 250, overflow: "auto"}} className=" border border-1 border-dark rounded-3 p-2 m-2">
            <button className="m-1 btn-sm btn btn-secondary" onClick={() => navigate(NEW_ORDER_ROUTE)} >Добавить</button>
            <button className="m-1 btn-sm btn btn-secondary" onClick={() => navigate(ORDER_ROUTE)}>Изменить</button>
            <button className="m-1 btn-sm btn btn-secondary" onClick={() => confirmAndDelete() }>Удалить</button>

        <table className="table border  table-hover h-25 "  style={{lineHeight: 1, fontSize: 12}}>
            <thead>
            <tr>
                <th scope="col">№</th>
                <th scope="col">Дата</th>
                <th scope="col">Статус</th>
                <th scope="col">Сумма</th>
                <th scope="col">Комментарий</th>
            </tr>
            </thead>

            <tbody>
            {

                orders.Orders.map((order, idx) =>
                <tr
                    key={order.id}
                    className="col-lg"
                    style={{backgroundColor: order.id === orders.getSelectedOrder().id ? 'LightGray' : 'white', cursor: 'pointer'}}
                    onClick={() =>  {orders.setSelectedOrder(order)}}
                    onDoubleClick={() => navigate(ORDER_ROUTE)}

                >
                    <th >{idx+1} </th>
                    <td> {order.date}</td>
                    <td> { ORDER_STATE.find(state => state.ID === order.status).State } </td>
                    <td> {order.sum} </td>
                    <td> {order.comment} </td>
                </tr>)

            }
            </tbody>
        </table>
        </div>

    );
});

export default OrdersBar;
