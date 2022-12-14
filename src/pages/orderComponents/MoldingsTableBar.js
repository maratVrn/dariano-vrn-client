import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {getMoldingPos, getMoldings} from "../../http/directorysApi";
import OrderMoldingEditModal from "./OrderMoldingEditModal";
import {observer} from "mobx-react-lite";

const MoldingsTableBar = observer(() => {

    const {moldings}           = useContext(Context);
    const {orderMoldings}      = useContext(Context);
    const {orderMoldingPos}    = useContext(Context);
    const {moldingPos}         = useContext(Context);
    const [moldingEditVisible, setMoldingEditVisible] = useState(false)

    useEffect(() =>{
        try {getMoldings().then(data => {moldings.setData(data)})
            getMoldingPos().then(data =>  moldingPos.setData(data))
        } catch (e) {console.log('ошибка при получении списка   '+ e.message)} },[])


    const setMoldingDoorPos = (molding) => {
        orderMoldingPos.isStart = true
        orderMoldingPos.model = molding.model
        orderMoldingPos.color = molding.color
        orderMoldingPos.price = molding.price
        orderMoldingPos.num = molding.num
        orderMoldingPos.sum = molding.sum
        orderMoldingPos.comment = molding.comment
    }

    const UpdateMoldingPos = () =>{
        if (orderMoldings.selectedNum >-1) {
            orderMoldingPos.isNew = false; orderMoldingPos.isStart = true; setMoldingEditVisible (true)
        }
    }
    const confirmAndDelete = () => {
        if (orderMoldings.selectedNum >-1) {
        if (window.confirm(`Вы действительно хотите удалить позицию ${orderMoldings.selectedNum+1}`)) {
            orderMoldings.Data.splice(orderMoldings.selectedNum,1);
            (orderMoldings.Data.length>0) ? orderMoldings.setSelectedNum(0) : orderMoldings.setSelectedNum(-1)
        } }}

    return (

        <div className="border border-1 p-1 m-1 border-dark rounded-3 " >
            <OrderMoldingEditModal show={moldingEditVisible} onHide={() => setMoldingEditVisible(false)}/>
            <div className="d-flex m-0">
                <button className="mx-1 btn-sm btn btn-secondary " style={{height:26, fontSize: 11}}
                        onClick={()=>{ orderMoldingPos.isNew = true;  orderMoldingPos.isStart = false; setMoldingEditVisible (true);  }  }>Добавить</button>

                <button className="  btn-sm btn btn-secondary " style={{height:26, fontSize: 11}}
                        onClick={()=>{ if (orderMoldings.selectedNum >-1) {orderMoldingPos.isNew = true;  orderMoldingPos.isStart = true;
                            setMoldingEditVisible (true)}}}>Скопировать</button>

                <button className="mx-1  btn-sm btn btn-secondary " style={{height:26, fontSize: 11}}
                        onClick={()=> UpdateMoldingPos()} >Изменить</button>

                <button className="  btn-sm btn btn-secondary " style={{height:26, fontSize: 11}} onClick={() => confirmAndDelete() }> Удалить</button>
                <h6 className="pt-2 px-5" style={{fontSize: 12}}>Погонажные изделия</h6>
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

                                orderMoldings.Data.map((molding, idx) =>
                                    <tr
                                        key={idx} className="col-lg"
                                         style={{backgroundColor: idx === orderMoldings.selectedNum ? 'LightGray' : 'white', cursor: 'pointer'}}

                                         onDoubleClick={() =>   UpdateMoldingPos()     }

                                         onClick={() => { orderMoldings.setSelectedNum(idx);    setMoldingDoorPos(molding)}} >
                                        <td> {idx+1} </td>
                                        <td> {molding.model}</td>
                                        <td> {molding.color}</td>
                                        <td> {molding.price}</td>
                                        <td> {molding.num}</td>
                                        <td> {molding.sum}</td>
                                        <td> {molding.comment}</td>
                                    </tr>)
                            }
                            </tbody>
                        </table>
                    </div>



            </div>
        </div>
    );
});

export default MoldingsTableBar;