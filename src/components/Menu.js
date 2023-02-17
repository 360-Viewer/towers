import React, { useContext } from "react";
import { AppContext } from "../App";
import './Menu.css';

function Menu() {
    const { currentBlock, setCurrentBlock, currentLevel, setCurrentLevel, currentView, setCurrentView } = useContext(AppContext);

    return (
        <></>
    )
}
    
export default Menu