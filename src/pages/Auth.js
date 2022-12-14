import React, {useContext, useState} from 'react';
import {Container, Form, Card, Button} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";  // С помощью него получаем маршрут строки запроса
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/const";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { useNavigate } from "react-router-dom"

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = true //location.pathname === LOGIN_ROUTE // Захаркодил чтобы только вход можно было делать, регистрацию вручную в БД
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()




    const click = async () => {
        try {
            let data;
            if (isLogin){
                data = await login(email, password);
            } else {
                data =  await registration(email, password);

            }
            // Записываем данные полльзователя в глобальную переменную
            user.setUser(data)
            user.setIsAuth(true)
            // Переводим на главную страницу
            navigate(MAIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }


    }

    const onKeyDown = e =>{
        if (e.keyCode === 13) { click()}
    }


    return (

        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}

        >
            <Card style={{width: 500}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column" onKeyDown={onKeyDown}>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={"password"}
                    />

                        {/*{ isLogin ?*/}
                        {/*    <div>*/}
                        {/*        Нет аккаунта?  <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>*/}
                        {/*    </div>*/}
                        {/*    :*/}
                        {/*    <div>*/}
                        {/*        Есть аккаунт?  <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>*/}
                        {/*    </div>*/}
                        {/*}*/}


                        <Button
                            className="btn-sm btn btn-secondary my-3 col-6 mx-auto"

                            onClick={click}
                        >
                            { isLogin? 'Войти' : 'Регистрация'}
                        </Button>


                </Form>
            </Card>
        </Container>
    );
});

export default Auth;