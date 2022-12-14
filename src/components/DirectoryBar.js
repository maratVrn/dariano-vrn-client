import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import { ButtonGroup } from "react-bootstrap";
import ManagerBar from "./DirectoryComponents/ManagerBar";
import DesignerBar from "./DirectoryComponents/DesignerBar";
import DoorsBar from "./DirectoryComponents/DoorsBar";
import MoldingsBar from "./DirectoryComponents/MoldingsBar";
import ColorsBar from "./DirectoryComponents/ColorsBar";

import DoorsModelBar from "./DirectoryComponents/DoorsModelBar";
import FittingsBar from "./DirectoryComponents/FittingsBar";


const DirectoryBar = observer( () => {

    const [key, setKey] = useState('home');

    useEffect(() =>{
           setKey("doors")
    },[])

    return (

        <div >
            <div className="tab">
                <ButtonGroup aria-label="Basic example">
                    <button className= {key === "doors"? "btn-sm btn btn-secondary" : "btn-sm btn light"}  onClick={() =>{ setKey("doors")}}>Дверные полотна</button>
                    <button className= {key === "moldings"? "btn-sm btn btn-secondary" : "btn-sm btn light"} onClick={() =>{ setKey("moldings")}}>Погонажные изделия</button>
                    <button className= {key === "fitting"? "btn-sm btn btn-secondary" : "btn-sm btn light"}  onClick={() =>{ setKey("fitting")}}>Фурнитура</button>
                    <button className= {key === "colors"? "btn-sm btn btn-secondary" : "btn-sm btn light"}  onClick={() =>{ setKey("colors")}}>Цвета покрытий</button>
                    <button className= {key === "doorsModel"? "btn-sm btn btn-secondary" : "btn-sm btn light"}  onClick={() =>{ setKey("doorsModel")}}>Модели дверей</button>
                    <button className= {key === "manager"? "btn-sm btn btn-secondary" : "btn-sm btn light"}  onClick={() =>{ setKey("manager")}}>Менеджеры</button>
                    <button className= {key === "designer"? "btn-sm btn btn-secondary" : "btn-sm btn light"}  onClick={() =>{ setKey("designer")}}>Дизайнеры</button>
                </ButtonGroup>
                {key === "doors"   ?   <DoorsBar /> : ''}
                {key === "moldings"?   <MoldingsBar /> : ''}
                {key === "fitting" ?   <FittingsBar /> : ''}
                {key === "colors"  ?   <ColorsBar /> : ''}
                {key === "manager" ?   <ManagerBar /> : ''}
                {key === "doorsModel" ?   <DoorsModelBar /> : ''}
                {key === "designer"?   <DesignerBar /> : ''}

            </div>
        </div>

    );
});

export default DirectoryBar;
