import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../App';
import PanoramaImage from '../components/PanoramaImage';
import { panos } from '../public/constans';


function TourDetailed() {
  const { block, level, view } = useParams();
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  const { currentBlock, setCurrentBlock, currentLevel, setCurrentLevel, currentView, setCurrentView, quality } = appContext;
  
  useEffect(() => {
    if (block !== currentBlock) {
      setCurrentBlock(block);
    }
    if (level !== currentLevel) {
      setCurrentLevel(level);
    }
    if (view !== currentView) {
      setCurrentView(view);
    }
  }, [block, level, view, currentBlock, currentLevel, currentView, setCurrentBlock, setCurrentLevel, setCurrentView]);

  const getBlur = (block, level, view) => {
    if (!panos[block] || !panos[block][level] || !panos[block][level][view]) {
      navigate("/404");
      return;
    }
    return panos[block][level][view + "-blur"];
  }
  
  function ViewPanorama() {
    return (
      <PanoramaImage
        blr={getBlur(currentBlock, currentLevel, currentView)}
        src={
          quality === "high" ?
          panos[currentBlock][currentLevel][currentView] :
          panos[currentBlock][currentLevel][currentView + "-sd"]
        }
      />
    )
  }

  return (
    <div
      style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {
        Object.values(panos["blurred"]).map((item) => {
          return <img src={item} style={{display: "none"}} />
        })
      }
      <ViewPanorama />
    </div>
  )
}

export default TourDetailed