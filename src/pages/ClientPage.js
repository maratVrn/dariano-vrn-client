import React from 'react';
import {Button, Offcanvas , NavDropdown  } from 'react-bootstrap';
import { useState } from 'react';

const ClientPage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div>

            <nav className="navbar navbar-dark bg-dark" aria-label="Темная навигационная панель offcanvas">
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
                            <NavDropdown
                                className="text-light py-2 navbar-nav justify-content-end flex-grow-1 pe-3"
                                title="Программа расчетов "
                                menuVariant="dark"
                            >
                                <NavDropdown.Item href="#action/3.1">Программа расчетов</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Предварительный расчет  </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">Справочники  </NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown
                                className="text-light py-2"
                                title="График монтажей "
                                menuVariant="dark"
                            >
                                <NavDropdown.Item href="#action/3.1">Сергей</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2"> АЛександр  </NavDropdown.Item>
                            </NavDropdown>

                            <a className="navbar-brand text-light py-2" href="#"><i className="py-2"></i>Выйти</a>

                        </Offcanvas.Body>
                    </Offcanvas>

                </div>

            </nav>
        </div>
    );
};

export default ClientPage;