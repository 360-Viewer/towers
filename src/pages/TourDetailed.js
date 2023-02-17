import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../App';
import Menu from '../components/Menu';
import PanoramaImage from '../components/PanoramaImage';
import { panos } from '../public/constans';

function TourDetailed() {
  const { block, level, view } = useParams();
  const appContext = useContext(AppContext);
  const { currentBlock, setCurrentBlock, currentLevel, setCurrentLevel, currentView, setCurrentView } = appContext;
  
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
  }, [block, level, view]);

  
  function ViewPanorama() {
    return (
      <PanoramaImage src={panos[currentBlock][currentLevel][currentView]}
                     blr={panos[currentBlock][currentLevel][currentView + "-blur"]}
      />
    )
  }

  return (
    <div style={{ width: "100%", height: "100%"}}>
      <ViewPanorama />
    </div>
  )
}

export default TourDetailed