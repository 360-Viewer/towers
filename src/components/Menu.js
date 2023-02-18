import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import styles from "./Menu.module.css" 
import sun from '../public/icons/sun.svg';
import moon from '../public/icons/moon.svg';
import { useNavigate } from "react-router-dom";
import { panos } from "../public/constans";

//  --------- For Controls Menu   --------- 
import zoom_in from "../public/icons/zoom-in.svg";
import zoom_out from "../public/icons/zoom-out.svg";
import left from "../public/icons/left.svg";
import right from "../public/icons/right.svg";
import fullscreen from "../public/icons/fullscreen.svg";
import autorotate from "../public/icons/autorotate.svg";
import hd from "../public/icons/hd-icon.svg";
import sd from "../public/icons/sd-icon.svg";

export const Controls = ({ photoSphereRef }) => {
    const appContext = useContext(AppContext);
    const { quality, setQuality } = appContext;
    const [yaw, setYaw] = useState(0);
    const [zoom, setZoom] = useState(10);
  
    const handleLeftClick = () => {
        photoSphereRef.current.animate({
        yaw: yaw - 0.5,
        pitch: photoSphereRef.current.getPosition().pitch,
        speed: '3rpm',
        }); 
        setYaw(yaw - 0.5);
    }

    const handleRightClick = () => {
        photoSphereRef.current.animate({
        yaw: yaw + 0.5,
        pitch: photoSphereRef.current.getPosition().pitch,
        speed: '3rpm',
        }); 
        setYaw(yaw + 0.5);
    }

    const handleZoomIn = () => {
        photoSphereRef.current.animate({
        zoom: zoom + 10,
        speed: '3rpm',
        });
        setZoom(zoom > 90 ? 100 : zoom + 10);
    }

    const handleZoomOut = () => {
        photoSphereRef.current.animate({
        zoom: zoom - 10,
        speed: '3rpm',
        });
        setZoom(zoom < 10 ? 0 : zoom - 10);
    }

    return (
        <div className={styles.controls}>
            <div className={styles.buttons}>
                <button onClick={handleLeftClick}>
                    <img src={left} alt="left" />
                </button>
                <button onClick={handleRightClick}>
                    <img src={right} alt="right" />
                </button>
                <button onClick={() => photoSphereRef.current.toggleAutorotate()}>
                    <img src={autorotate} alt="autorotate" />
                </button>
                <button onClick={handleZoomIn}>
                    <img src={zoom_in} alt="zoom-in" />
                </button>
                <button onClick={handleZoomOut}>
                    <img src={zoom_out} alt="zoom-out" />
                </button>
                <button onClick={() => { photoSphereRef.current.toggleFullscreen(); } }>
                    <img src={fullscreen} alt="fullscreen" />
                </button>
                <button onClick={() => { setQuality(quality === "high" ? "low" : "high"); }}>
                    <img src={quality === "high" ? hd : sd} alt="quality" />
                </button>
            </div>
        </div>
    )
}

//  --------- End Controls  ---------


// const sun = require('../public/icons/sun.svg');
const LevelItem = ({ children }) => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
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
    const [isActive, setIsActive] = useState(false);
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
        <div onDragStart={(e) => e.preventDefault()}>
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
        </div>
    )
}
    
export default Menu