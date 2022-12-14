import React, {useContext, useEffect, useState} from 'react';
import {Button, Modal, Form} from "react-bootstrap";

import {Context} from "../../../index";
import {createDoor, getDoors, getDoorsColors, updateDoor} from "../../../http/directorysApi";
import {DOORS_COLLECTIONS} from "../../../utils/const";

const DoorsEdit =  ({show, onHide}) => {

    const {doors} = useContext(Context);
    const {doorsColors} = useContext(Context);
    const {newDoorInfo} = useContext(Context);
    const {showDoors} = useContext(Context);

    const [cCollection, setCCollection] = useState('')
    const [cName,       setCName]       = useState('')
    const [cColor,      setCColor]      = useState('')
    const [cGlass,      setCGlass]      = useState('Глухая')
    const [cPrice,      setCPrice]      = useState('0')
    const [cComment,    setCComment]    = useState(' ')

    useEffect(() =>{
        try { getDoorsColors().then(data => {doorsColors.setDoorsColors(data)
            if (data.length>0)  setCColor(data[0].color);} )  }
        catch (e) {console.log('ошибка при получении списка   '+ e.message)}
    },[])

    // При открытии страницы
    const SetParams = () => {
        const sDoor = doors.getSelectedOne()

        if (doors.isNew) {   setCCollection(newDoorInfo.collection.toString()); setCName(newDoorInfo.model.toString());
            setCGlass('Глухая'); setCPrice('0') ; setCComment(' ')
        } else {   setCCollection(sDoor.collection);  setCName(sDoor.name); setCColor(sDoor.color);
            setCGlass(sDoor.glass); setCPrice(sDoor.price)   ; setCComment(sDoor.comment)   }}

    const createNewDoor = () => {
        createDoor({ collection : cCollection, name: cName, color: cColor, glass : cGlass, price : cPrice, comment : cComment }).then(data => {

            // После создания клиента запрашиваем обновленный список и выделяем клиента которого создали
            const newID = newDoorInfo.endID+1
            doors.Data.push({collection : cCollection, name: cName, color: cColor, glass : cGlass, price : cPrice, comment : cComment, id :newID})
            newDoorInfo.endID = newID
            showDoors.setData(doors.Data.filter(   (door) => {return door.collection === cCollection && door.name === cName }))
            doors.setSelectedOne(doors.Data.at(-1))
            onHide()
        })
    }

    const updateCrDoor = () => {
        updateDoor({ collection : cCollection, name: cName, color: cColor, glass : cGlass, price : cPrice, comment : cComment,
            id:doors.getSelectedOne().id} ).then(data => {

                // После успешного обновления на сервере обновляем локальный массив чтобы не грузить заново все
                const updNum = doors.Data.findIndex( dx => dx.id === doors.getSelectedOne().id)
                if (updNum>-1) {
                    doors.Data[updNum].collection = cCollection
                    doors.Data[updNum].name = cName
                    doors.Data[updNum].color = cColor
                    doors.Data[updNum].glass = cGlass
                    doors.Data[updNum].price = cPrice
                    doors.Data[updNum].comment = cComment
                   }
            showDoors.setData(doors.Data.filter(   (door) => {return door.collection === newDoorInfo.collection && door.name === newDoorInfo.model }))
            onHide()
        })
    }

    return (
        <Modal show={show} onHide={onHide} size="lg" centered onShow={SetParams}>
            <Modal.Header closeButton>
                <Modal.Title id="">
                    {doors.isNew ? 'Добавить позицию' : 'Изменить позицию'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text col-3" id="inputGroup-sizing-sm">Коллекция</span>
                        <select className="form-select"  disabled onChange={e => setCCollection(e.target.value)}
                                value={cCollection}>
                            {DOORS_COLLECTIONS.map((collection) =>
                                <option key={collection.ID} value={collection.State}>{collection.State} </option>
                            )}
                        </select>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text col-3"  id="inputGroup-sizing-sm">Название</span>
                        <input type="text" className="form-control"   disabled   value={cName}
                               onChange={e => setCName(e.target.value)}></input>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text col-3" id="inputGroup-sizing-sm">Цвет</span>
                        <select className="form-select" onChange={e => setCColor(e.target.value)}
                                value={cColor}>
                            {doorsColors.DoorsColors.map((color) =>
                                <option key={color.id} value={color.color}>{color.color} </option>
                            )}
                        </select>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text col-3" id="inputGroup-sizing-sm">Стекло</span>
                        <input type="text" className="form-control" value={cGlass}
                               onChange={e => setCGlass(e.target.value)}></input>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text col-3" id="inputGroup-sizing-sm">Цена</span>
                        <input type="number" className="form-control" value={cPrice}
                               onChange={e => setCPrice(e.target.value)}></input>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text col-3" id="inputGroup-sizing-sm">Комментарий</span>
                        <input type="text" className="form-control" value={cComment}
                               onChange={e => setCComment(e.target.value)}></input>
                    </div>

                </form>


            </Modal.Body>

            <Modal.Footer>
                <Button className="m-1 btn-sm btn btn-secondary" onClick={onHide}>Закрыть</Button>
                <Button className="m-1 btn-sm btn btn-secondary"
                        onClick={doors.isNew ? createNewDoor : updateCrDoor}>{doors.isNew ? 'Добавить позицию' : 'Изменить позицию'}</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default DoorsEdit;