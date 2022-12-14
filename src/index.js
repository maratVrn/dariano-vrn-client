import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import Orders from "./store/OrdersStore";
import Clients from "./store/ClientsStore";
import DoorsColors from "./store/DoorsColors";
import DataStore from "./store/DataStore";
export const Context = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'))


root.render(
    <Context.Provider value={{
        user: new UserStore(),                      //  Список пользователей
        clients: new Clients(),                     //  Список клиентов

        // ------------ Справочник (прайс) на двери
        doorsColors: new DoorsColors(),             //  Список покрытий цветов Дариано он же для погонажа
        doors: new DataStore(),                     //  Список дверей основной прайс лист
        classicModels: new DataStore(),             // Модели классических дверей
        neoClassicModels: new DataStore(),          // Модели для Неоклассики
        modernModels: new DataStore(),              // Модели для современных дверей
        newDoorInfo: {collection: '', model: '', endID: 0},
        showDoors: new DataStore(),                 // Часть прайса на отображение в соотв-ии с выбранной колекцией и моделью

        // ---------- Справочник заказов
        orders: new Orders(),           // Список заказов
        orderDoors: new DataStore(),    // Список полотен для выбранного заказа
        orderDoorPos: {},               // Для изменения позиции в списке дверей
        orderMoldings: new DataStore(), // Список погонажа для выбранного заказа
        orderMoldingPos: {},            // Для изменения позиции в списке дверей
        orderFittings: new DataStore(), // Список фурнитуры для выбранного заказа
        orderFittingPos: {},            // Для изменения позиции в списке дверей

        // ------- Для справочника погонажа
        moldings: new DataStore(),      // Список вида погонажа (коробки доборы и т.п.)
        moldingPos: new DataStore(),    // Список позиций прайс листа погонажа
        showMoldingPos: new DataStore(),// Список на отображение в справочнике редатктора погонажа

        // -------- Для справочника фурнитуры
        fittingColors  : new DataStore(),     // Список цветов фурнитуры
        fittings       : new DataStore(),     // Список вида фурнитуры ( ручки замки и т.п..)
        fittingBrands  : new DataStore(),     // Список брендов фурнитуры ( фуаро  и т.п..)
        fittingPos     : new DataStore(),     // Список на отображение в справочнике (используем коллекцию
        showFittingPos : new DataStore(),     // Список на отображение в справочнике редатктора погонажа


    }}>
        <App/>
    </Context.Provider>
);

