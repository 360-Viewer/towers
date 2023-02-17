import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../App';
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
    navigate(`/tower_tour/${block}/${level}/${view}`);
  }, [block, level, view]);

  return (
    <div style={{width: "100%", height: "100%", top: 0, left: 0, position: "absolute"}}>
      {/* <PanoramaImage src={require(`../public/images/${block}-${level}-${view}.jpg`)} /> */}
      <PanoramaImage src={require(`../public/images/test.png`)} />

    </div>
  )
}

export default TourDetailed