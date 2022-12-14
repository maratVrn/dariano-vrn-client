import React, {useContext, useState} from 'react';
import {Button, Modal, Form, Tab, Tabs} from "react-bootstrap";

import {Context} from "../../index";
import {createClient, getClients, updateClient} from "../../http/clientApi";


const ClientEdit =  ({show, onHide}) => {

    const {user} = useContext(Context)
    const {clients} = useContext(Context);

    const [cSurname,     setCSurname]      = useState('')
    const [cName,        setCName]         = useState('')
    const [cSecondName,  setCSecondName]   = useState('')
    const [cPassport,    setCPassport]     = useState('')
    const [cManagerID,   setCManagerID]    = useState('')
    const [cDesignerID,  setCDesignerID]   = useState('')
    const [cStartDate,   setCStartDate]    = useState('')
    const [cPassportGet,setCPassportGet] = useState('')
    const [cContract,    setCContract]     = useState('')
    const [cContact,     setCContact]      = useState('')
    const [cAddress,     setCAddress]      = useState('')
    const [cComment,     setCComment]      = useState('')

    const [cOooName,     setCOooName]      = useState('')
    const [cOooDirFio,   setCOooDirFio]    = useState('')
    const [cOooDirTitle, setCOooDirTitle]  = useState('')
    const [cOooInn,      setCOooInn]       = useState('')
    const [cOooKpp,      setCOooKpp]       = useState('')
    const [cOooBuh,      setCOooBuh]       = useState('')


    // При открытии страницы
    const SetParams = () => {
        if (clients.IsNewClient) {
            // TODO: Вставить правильные значения !!
            setCSurname('');    setCName('');       setCSecondName(''); setCPassport('');
            setCManagerID('0');  setCDesignerID('0'); setCStartDate(new Date().toISOString().substring(0, 10));  setCPassportGet('');
            setCContract(''); setCContact('');    setCAddress('');     setCComment('');
            setCOooName('');    setCOooDirFio('');  setCOooDirTitle(''); setCOooInn('0');
            setCOooKpp('0');     setCOooBuh('')
        } else {
            setCSurname(clients.getSelectedClient().surname);         setCName(clients.getSelectedClient().name);
            setCSecondName(clients.getSelectedClient().secondName);   setCPassport(clients.getSelectedClient().passport);
            setCManagerID(clients.getSelectedClient().managerId);     setCDesignerID(clients.getSelectedClient().designerId);
            setCStartDate(clients.getSelectedClient().startDate);     setCPassportGet(clients.getSelectedClient().passportGet);
            setCContract(clients.getSelectedClient().contract);       setCContact(clients.getSelectedClient().contact);
            setCAddress(clients.getSelectedClient().address);         setCComment(clients.getSelectedClient().comment);
            setCOooName(clients.getSelectedClient().oooName);         setCOooDirFio(clients.getSelectedClient().oooDirFio);
            setCOooDirTitle(clients.getSelectedClient().oooDirTitle); setCOooInn(clients.getSelectedClient().oooInn);
            setCOooKpp(clients.getSelectedClient().oooKpp);           setCOooBuh(clients.getSelectedClient().oooBuh)
    }}

    const addClient = () => {
        createClient({name: cName, contact: cContact, userId: user.user.id, comment : cComment, surname : cSurname,
            secondName : cSecondName, passport : cPassport, managerId : cManagerID, designerId : cDesignerID,
            startDate : cStartDate, passportGet : cPassportGet, contract : cContract, address : cAddress,
            oooName : cOooName, oooDirFio : cOooDirFio, oooDirTitle :cOooDirTitle, oooInn : cOooInn,
            oooKpp : cOooKpp, oooBuh : cOooBuh }).then(data => {
            // После создания клиента запрашиваем обновленный список и выделяем клиента которого создали
            getClients().then(data => {
                clients.setClient(data)
                if (clients.Clients.length > 0) {
                    clients.setSelectedClients(clients.Clients[0])
                }
            })
            onHide()
        })
    }

    const updateFormClient = () => {
        updateClient({name: cName, contact: cContact, userId: user.user.id, comment : cComment, surname : cSurname,
            secondName : cSecondName, passport : cPassport, managerId : cManagerID, designerId : cDesignerID,
            startDate : cStartDate, passportGet : cPassportGet, contract : cContract, address : cAddress,
            oooName : cOooName, oooDirFio : cOooDirFio, oooDirTitle :cOooDirTitle, oooInn : cOooInn,
            oooKpp : cOooKpp, oooBuh : cOooBuh, id:clients.getSelectedClient().id} ).then(data => {
            // После создания клиента запрашиваем обновленный список и выделяем клиента которого создали
            getClients().then(newData => {
                clients.setClient(newData)  })
            onHide() }) }



    return (
        <Modal show={show}  onHide={onHide}   size="lg" centered onShow={SetParams}  >
            <Modal.Header closeButton>
                <Modal.Title id=""> {clients.IsNewClient? 'Создать клиента' : 'Изменить клиента'}  </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="form-horizontal border border-2 rounded-3">
                    <Tabs   className="mb-3 "   >
                        <Tab eventKey="home" title="Частное лицо"  >
                            <div className="input-group input-group-sm mb-2 py-2">
                                <div className="col-6">
                                    <div className="input-group input-group-sm mb-2 px-1">
                                        <span className="input-group-text col-3" id="inputGroup-sizing-sm">Фамилия</span>
                                        <Form.Control  className="form-control"   value={cSurname}   onChange={e=>setCSurname(e.target.value)}  />
                                    </div>
                                    <div className="input-group input-group-sm mb-2 px-1">
                                        <span className="input-group-text col-3" id="inputGroup-sizing-sm">Имя</span>
                                        <Form.Control  className="form-control" value={cName}  onChange={e=>setCName(e.target.value)}   />
                                    </div>
                                    <div className="input-group input-group-sm mb-2 px-1">
                                        <span className="input-group-text col-3" id="inputGroup-sizing-sm">Отчество</span>
                                        <Form.Control  className="form-control" value={cSecondName}  onChange={e=>setCSecondName(e.target.value)}   />
                                    </div>
                                    <div className="input-group input-group-sm mb-2 px-1">
                                        <span className="input-group-text col-3" id="inputGroup-sizing-sm">Паспорт</span>
                                        <Form.Control  className="form-control" value={cPassport}  onChange={e=>setCPassport(e.target.value)}   />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="input-group input-group-sm mb-2 px-1">
                                        <span className="input-group-text col-3" id="inputGroup-sizing-sm">Менеджер</span>
                                        <Form.Control  className="form-control"   value={cManagerID}   onChange={e=>setCManagerID(e.target.value)}  />
                                    </div>
                                    <div className="input-group input-group-sm mb-2 px-1">
                                        <span className="input-group-text col-3" id="inputGroup-sizing-sm">Дизайнер</span>
                                        <Form.Control  className="form-control" value={cDesignerID}  onChange={e=>setCDesignerID(e.target.value)}   />
                                    </div>
                                    <div className="input-group input-group-sm mb-2 px-1">
                                        <span className="input-group-text col-4" id="inputGroup-sizing-sm">Дата обращения</span>
                                        <Form.Control  className="form-control" value={cStartDate}  onChange={e=>setCStartDate(e.target.value)}   />
                                    </div>
                                    <div className="input-group input-group-sm mb-2 px-1">
                                        <span className="input-group-text col-4" id="inputGroup-sizing-sm">Договор</span>
                                        <Form.Control  className="form-control" value={cContract}  onChange={e=>setCContract(e.target.value)}   />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group input-group-sm mb-2 px-1">
                                <span className="input-group-text col-2" id="inputGroup-sizing-sm">Паспорт выдан</span>
                                <Form.Control  className="form-control"   value={cPassportGet}   onChange={e=>setCPassportGet(e.target.value)}  />
                            </div>
                            <div className="input-group input-group-sm mb-2 px-1">
                                <span className="input-group-text col-2" id="inputGroup-sizing-sm">Контакты</span>
                                <Form.Control  className="form-control" value={cContact}  onChange={e=>setCContact(e.target.value)}   />
                            </div>
                            <div className="input-group input-group-sm mb-2 px-1">
                                <span className="input-group-text col-2" id="inputGroup-sizing-sm">Адрес обьекта</span>
                                <Form.Control  className="form-control"   value={cAddress}   onChange={e=>setCAddress(e.target.value)}  />
                            </div>
                            <div className="input-group input-group-sm mb-2 px-1">
                                <span className="input-group-text col-2" id="inputGroup-sizing-sm">Коментарий</span>
                                <Form.Control  className="form-control" value={cComment}  onChange={e=>setCComment(e.target.value)}   />
                            </div>
                        </Tab>
                        <Tab eventKey="profile" title="ООО/ИП">
                            <div className="input-group input-group-sm mb-2 px-1">
                                <span className="input-group-text col-3" id="inputGroup-sizing-sm">Название организации</span>
                                <Form.Control  className="form-control" value={cOooName}  onChange={e=>setCOooName(e.target.value)}   />
                            </div>
                            <div className="input-group input-group-sm mb-2 px-1">
                                <span className="input-group-text col-3" id="inputGroup-sizing-sm">ФИО Руководителя</span>
                                <Form.Control  className="form-control"  value={cOooDirFio}  onChange={e=>setCOooDirFio(e.target.value)}  />
                            </div>
                            <div className="input-group input-group-sm mb-2 px-1">
                                <span className="input-group-text col-3" id="inputGroup-sizing-sm">Должность</span>
                                <Form.Control  className="form-control" value={cOooDirTitle}  onChange={e=>setCOooDirTitle(e.target.value)}   />
                            </div>
                            <div className="input-group input-group-sm mb-2 py-2">
                                <div className="col-6">
                                    <div className="input-group input-group-sm mb-2 px-1">
                                        <span className="input-group-text col-3" id="inputGroup-sizing-sm">ИНН</span>
                                        <Form.Control  className="form-control"  value={cOooInn}  onChange={e=>setCOooInn(e.target.value)}    />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="input-group input-group-sm mb-2 px-1">
                                        <span className="input-group-text col-3" id="inputGroup-sizing-sm">КПП</span>
                                        <Form.Control  className="form-control"    value={cOooKpp}  onChange={e=>setCOooKpp(e.target.value)}    />
                                    </div>
                                 </div>
                            </div>
                            <div className="input-group input-group-sm mb-2 px-1">
                                <span className="input-group-text col-3" id="inputGroup-sizing-sm">Бухгалтер</span>
                                <Form.Control  className="form-control"   value={cOooBuh}  onChange={e=>setCOooBuh(e.target.value)}   />
                            </div>
                        </Tab>
                    </Tabs>
                </Form>
            </Modal.Body>


            <Modal.Footer>
                <Button className="btn btn-secondary" onClick={onHide}>Отмена</Button>
                <Button className="btn btn-secondary" onClick={ clients.IsNewClient? addClient : updateFormClient}>
                    {clients.IsNewClient? 'Создать клиента' : 'Сохранить изменения'}</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default ClientEdit;