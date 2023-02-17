import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../App';
import Menu from '../components/Menu';
import PanoramaImage from '../components/PanoramaImage';

function TourDetailed() {
  const { block, level, view } = useParams();
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  const { currentBlock, setCurrentBlock, currentLevel, setCurrentLevel, currentView, setCurrentView } = appContext;
  
  useEffect(() => {
    setCurrentBlock(block);
    setCurrentLevel(level);
    setCurrentView(view);
  }, [block, level, view]);
  
  function ViewPanorama() {
    return (
      <PanoramaImage src={require(`../public/panos/${block}-${level}-${view}.jpg`)}
                     blr={require(`../public/panos/${block}-${level}-${view}-blur.png`)} />
    )
  }

  return (
    <div style={{ width: "100%", height: "100%"}}>
      <Menu />
      <ViewPanorama />
    </div>
  )
}

export default TourDetailed