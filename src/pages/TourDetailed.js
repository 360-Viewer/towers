import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../App';
import PanoramaImage from '../components/PanoramaImage';
import { panos } from '../public/constans';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

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
  }, [block, level, view, currentBlock, currentLevel, currentView, setCurrentBlock, setCurrentLevel, setCurrentView]);

  
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
        <LazyLoadComponent>
          <ViewPanorama />
        </LazyLoadComponent>
      </div>
  )
}

export default TourDetailed