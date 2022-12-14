import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ClientEdit from "./modals/ClientEdit";
import {delClient, getClients} from "../http/clientApi";


const ClientsBar = observer( () => {
    const {clients} = useContext(Context);
    const {user} = useContext(Context);
    const [clientEditVisible, setClientEditVisible] = useState(false)


    const confirmAndDelete = () => {
        if (window.confirm(`Вы действительно хотите удалить клиента ${clients.getSelectedClient().name}`)) {
            delClient(clients.getSelectedClient().id).then(()=>{
                getClients().then(data => {
                    clients.setClient(data)
                })
            })
        }
    }
    const userName=(userId) => {
        // TODO: Сооздать таблицу манагеров и передвать имя
        return 'Менеджерс ИД '+ userId.toString()
    }

    // При открытии страницы делаем запрос на сервер и получаем список клиентов через хук
    useEffect(() =>{
        try { getClients().then(data => clients.setClient(data)) }
        catch (e) {console.log('ошибка при получении списка клиентов   '+ e.message)}
    },[])

    return (
    <div style={{ height: 250, overflow: "auto"}} className=" border border-1 border-dark rounded-3 p-2 m-2">
        <button className="m-1 btn-sm btn btn-secondary" onClick={() => { clients.setIsNewClient(true)
                                                               setClientEditVisible(true)} } >Добавить</button>
        <button className="m-1 btn-sm btn btn-secondary" onClick={() => { clients.setIsNewClient(false)
                                                                  setClientEditVisible(true)}}>Изменить</button>

        <button className="m-1 btn-sm btn btn-secondary" onClick={() => confirmAndDelete() }>Удалить</button>

        <ClientEdit show={clientEditVisible} onHide={() => setClientEditVisible(false)}/>

        <table className="table border  table-hover h-25 "  style={{lineHeight: 1, fontSize: 12}}>
            <thead>
            <tr>
                <th scope="col">№</th>
                <th scope="col">ФИО</th>
                <th scope="col">Договор</th>
                <th scope="col">Дата</th>
                <th scope="col">Контакты</th>
                <th scope="col">Комментарий</th>
                <th scope="col">Менеджер</th>
                <th scope="col">Дизайнер</th>
            </tr>
            </thead>
            <tbody>
            {

                clients.Clients.map((client,idx) =>
                    <tr
                        key={client.id}
                        className="col-lg"
                        style={{backgroundColor: client.id === clients.getSelectedClient().id ? 'LightGray' : 'white', cursor: 'pointer'}}
                        onDoubleClick={() => { clients.setIsNewClient(false)
                                setClientEditVisible(true)}}
                        onClick={() => {
                            clients.setSelectedClients(client);
                        }}
                    >
                        <th> {idx+1} </th>
                        <td> {client.surname + ' ' + client.name + ' ' + client.secondName}</td>
                        <td> {client.contract} </td>
                        <td> {client.startDate.toString()} </td>
                        <td> {client.contact} </td>
                        <td> {client.comment} </td>
                        <td> {userName(client.managerId)} </td>
                        <td> {client.designerId} </td>

                    </tr>)
            }
            </tbody>
        </table>
    </div>
    );
});

export default ClientsBar;

