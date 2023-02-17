import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App';

function Tour() {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/tower_tour/${appContext.currentBlock}/${appContext.currentLevel}/${appContext.currentView}`);
  }, [navigate]);

  return (
    <>
      {/* This is the home page that only reason it is to navigate tower tours */}
    </>
  )
}

export default Tour