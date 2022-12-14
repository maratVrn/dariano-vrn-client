import React, {useContext, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import {useEffect} from "react";
import Auth from "./pages/Auth";

const App = observer( () =>  {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    // При открытии приложения один раз отправляем запрос и роверяем пользователя
    useEffect(()=>{

        check().then( data =>{
            // Если выполнилась успешно - т.е. пользователь залогинился
            user.setUser(data)
            user.setIsAuth(true)
            }).finally(()=> setLoading(false))
    },[])

    // Пока поисходит закгрузка показываем это
    if (loading){
        return <Spinner animation={"grow"}/>
    }

    if (user.isAuth) {
        return (
            <BrowserRouter>
                <NavBar/>
                <AppRouter/>
            </BrowserRouter>
        );
    } else {
        return (
            <BrowserRouter>
                <Auth/>
            </BrowserRouter>
        )
    }


});

export default App;
