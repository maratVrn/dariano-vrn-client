import React, {useContext, useState} from 'react';
import {Button, Modal, Form} from "react-bootstrap";
import {Context} from "../../index";
import {createClient, getClients} from "../../http/clientApi";

const OrderNew = ({show, onHide}) => {

    const {user} = useContext(Context)
    const [cName, setCName] = useState('')
    const [cContact, setCContact] = useState('')
    const {clients} = useContext(Context);

    const addClient = () => {
        createClient({name: cName, contact: cContact, userId: user.user.id }).then(data => {
            setCName('')
            setCContact('')
            // После создания клиента запрашиваем обновленный список и выделяем клиента которого создали
            getClients().then(data => {
                clients.setClient(data)
                if (clients.Clients.length > 0) {
                    clients.setSelectedClients(clients.Clients[clients.Clients.length-1])
                }
            })
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="">
                    Создание нового клиента
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Control
                        className="m-2"
                        value = {cName}
                        onChange={e=>setCName(e.target.value)}
                        placeholder={"Введите Имя клиента... "}
                    />
                    <Form.Control
                        className="m-2"
                        value = {cContact}
                        onChange={e=>setCContact(e.target.value)}
                        placeholder={"Введите контакты клиента... "}
                    />

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text col-2" id="inputGroup-sizing-sm">Один</span>
                        <Form.Control
                            className="form-control"
                            // defaultValue={clients.getSelectedClient().name}
                            onChange={e=>setCName(e.target.value)}
                            placeholder={"Введите ... "}
                        />
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text col-2" id="inputGroup-sizing-sm">Два</span>
                        <Form.Control
                            className="form-control"
                            // defaultValue={clients.getSelectedClient().contact}
                            onChange={e=>setCContact(e.target.value)}
                            placeholder={"Введите ... "}
                        />
                    </div>

                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-secondary" onClick={onHide}>Закрыть</Button>
                <Button className="btn btn-secondary" onClick={addClient}>Создать клиента</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default OrderNew;