
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import ClientPage from "./pages/ClientPage";
import OrderPage from "./pages/OrderPage";
import Main from "./pages/Main";
import {
    ADMIN_ROUTE,
    CLIENT_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    ORDER_ROUTE,
    NEW_ORDER_ROUTE,
    REGISTRATION_ROUTE,
    DIRECTORY_ROUTE
} from "./utils/const";
import DirectoryBar from "./components/DirectoryBar";

// Список страниц только для авторизованного пользователя
export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
]

// Список только для общего доступа
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: CLIENT_ROUTE + '/:id',
        Component: ClientPage
    },
    {
        path: ORDER_ROUTE,
        Component: OrderPage
    },
    {
        path: DIRECTORY_ROUTE,
        Component: DirectoryBar
    },
    {
        path: NEW_ORDER_ROUTE,
        Component: OrderPage
    }
]