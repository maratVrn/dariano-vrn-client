import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {MAIN_ROUTE} from "../utils/const";
import {Context} from "../index";


const AppRouter = () => {

    const {user} = useContext(Context)
    return (

        <Routes>

            {user.isAuth && authRoutes.map(({path, Component}) =>          // Тольео для авторизованных пользователе
                <Route key={path} path={path} element={<Component/>} exact/> // exact - ключ который говорит о том что путь должен точно совпадать
            )}

            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/> // exact - ключ который говорит о том что путь должен точно совпадать
            )}

            <Route path='*' element={<Navigate to={MAIN_ROUTE}/>} />
        </Routes>
    );
};

export default AppRouter;