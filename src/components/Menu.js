import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";
import styles from "./Menu.module.css" 
import sun from '../public/icons/sun.svg';
import moon from '../public/icons/moon.svg';
import { useNavigate } from "react-router-dom";
import { base_url, panos } from "../public/constans";

// const sun = require('../public/icons/sun.svg');
const LevelItem = ({ children }) => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = React.useState(false);
    const { currentBlock, currentLevel, currentView } = useContext(AppContext);

    useEffect(() => {
        setIsActive(currentLevel === children.toLowerCase());
    }, [currentLevel, children]);

    function handleClick() {
        navigate(`/${currentBlock}/${children.toLowerCase()}/${currentView}`);
    }

    return (
        <button className={`${styles.verticalContainerItem} ${isActive ? styles.verticalContainerItemActive : ""}`}
            onClick={handleClick}>
            <text className={`${styles.text} ${isActive ? styles.textActive : ""}`}>
                {children}
            </text>
        </button>
    )
}

const BlockItem = ({ children }) => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = React.useState(false);
    const { currentBlock, currentLevel, currentView } = useContext(AppContext);
    useEffect(() => {
        if (children === "A Blok" && currentBlock === "a-block") {
            setIsActive(true);
        } else if (children === "B Blok" && currentBlock === "b-block") {
            setIsActive(true);
        } else if (children === "C Blok" && currentBlock === "c-block") {
            setIsActive(true);
        } else {    
            setIsActive(false);
        }
    }, [children, currentBlock]);

    function handleClick() {
        console.log(children);
        navigate(`/${children === "A Blok" ? "a-block" : children === "B Blok" ? "b-block" : "c-block"}/${currentLevel}/${currentView}`);
    }

    return (
        <button className={`${styles.verticalContainerItem} ${isActive ? styles.verticalContainerItemActive : ""}`}
            onClick={handleClick}>
            <text className={`${styles.text} ${isActive ? styles.textActive : ""}`}>
                {children}
            </text>
        </button>
    )
}


function Menu() {
    const navigate = useNavigate();
    const { currentBlock, currentLevel, currentView } = useContext(AppContext);

    function handleViewClick() {
        navigate(`/${currentBlock}/${currentLevel}/${currentView === "day" ? "night" : "day"}`);
    }
    return (
        <>
            <div className={styles.verticalContainer} style={{ left: "8px", top: "8px" }}>
                <button className={styles.viewButton} onClick={handleViewClick}>
                    <img
                        src={currentView === "day" ? moon : sun}
                        alt="view"
                        className={styles.icon}
                    />
                </button>
                {
                    panos[currentBlock]["levels"].map((level) => {
                        return (
                            <LevelItem>
                                {level}
                            </LevelItem>
                        )
                    })
                }
            </div>
            <div className={styles.verticalContainer} style={{ right: "8px", top: "8px" }}>
                {
                    panos["blocks"].map((block) => {
                        return (
                            <BlockItem>
                                {block}
                            </BlockItem>
                        )
                    })
                }
            </div>
        </>
    )
}
    
export default Menu