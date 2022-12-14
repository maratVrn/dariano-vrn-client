import React, {useContext, useState} from 'react';
import {Button, Modal, Form} from "react-bootstrap";
import {Context} from "../../index";

const TestForm =  ({show, onHide}) => {


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="">
                    Изменить клиента
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text col-2" id="inputGroup-sizing-sm">Имя</span>
                    <input type="text" className="form-control" aria-label="Пример размера поля ввода"
                           aria-describedby="inputGroup-sizing-sm"></input>
                </div>


                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text col-2" id="inputGroup-sizing-sm">Контакты</span>
                        <Form.Control
                            className="form-control"
                        />
                    </div>

                </form>

            </Modal.Body>


            <Modal.Footer>
                <Button onClick={onHide}>Закрыть</Button>
                <Button onClick={onHide}>Изменить данные клиента</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default TestForm;