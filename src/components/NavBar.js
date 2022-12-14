import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Button, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {CLIENT_ROUTE, DIRECTORY_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, ORDER_ROUTE, REGISTRATION_ROUTE} from "../utils/const";
import {observer} from "mobx-react-lite";
import {userDone} from "../http/userAPI";


const NavBar = observer( () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const logOut = () =>{
        user.setUser({})
        user.setIsAuth(false)
        userDone()
    }

    // Для отображения менюшки
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div>
        <div>

        <nav className="navbar navbar-dark bg-dark" >
            <div className="container-fluid">

                <a className="navbar-brand fs-4 d-flex align-item-center" href="#"><i
                    className="bi bi-door-open me-2"></i>Dariano</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbarDark" aria-controls="offcanvasNavbarDark"  onClick={handleShow}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <Offcanvas show={show} onHide={handleClose} placement="end"  className="bg-dark"  style={{textColor: 'white'}} >
                    <Offcanvas.Header closeButton className=" btn-close-white">
                        <h5 className="d-flex align-item-center"><i className=" text-light bi bi-door-open me-2"></i>Dariano</h5>


                    </Offcanvas.Header>
                    <Offcanvas.Body >
                        <h5 className=" text-light"> {'Пользователь: '+ user.user.email }</h5>
                        <NavDropdown
                            className="text-light py-2 navbar-nav justify-content-end flex-grow-1 pe-3"
                            title="Программа расчетов "
                            menuVariant="dark"
                        >
                            <NavDropdown.Item onClick={ () => {navigate(MAIN_ROUTE); handleClose()} } >Программа расчетов</NavDropdown.Item>
                            <NavDropdown.Item onClick={ () => {navigate(ORDER_ROUTE); handleClose()} } >Предварительный расчет  </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={ () => {navigate(DIRECTORY_ROUTE); handleClose()} }>Справочники  </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown
                            className="text-light py-2"
                            title="График монтажей "
                            menuVariant="dark"
                        >
                            <NavDropdown.Item href="#action/3.1">Сергей</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2"> АЛександр  </NavDropdown.Item>
                        </NavDropdown>

                        <a className="navbar-brand text-light py-2" href="#" onClick={() => {
                            logOut();  navigate(LOGIN_ROUTE)}}><i className="py-2"></i>Выйти</a>


                    </Offcanvas.Body>
                </Offcanvas>

            </div>

        </nav>
    </div>
    </div>
    );
});

export default NavBar;