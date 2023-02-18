import React, { createContext, useMemo } from 'react';
import {Route, Routes } from 'react-router-dom';
import TourDetailed from './pages/TourDetailed';
import Tour from './pages/Tour';
import Menu from './components/Menu';
import Costum404 from './pages/Costum404';
import Redirect404 from './pages/Redirect404';


export const AppContext = createContext();

function App() {
  const [currentBlock, setCurrentBlock] = React.useState("a-block");
  const [currentLevel, setCurrentLevel] = React.useState("l2");
  const [currentView, setCurrentView] = React.useState("day");
  const [quality, setQuality] = React.useState("high");
  
  const value = useMemo(() => ({
    currentBlock,
    setCurrentBlock,
    currentLevel,
    setCurrentLevel,
    currentView,
    setCurrentView,
    quality,
    setQuality,
  }), [
    currentBlock,
    setCurrentBlock,
    currentLevel,
    setCurrentLevel,
    currentView,
    setCurrentView,
    quality,
    setQuality,
  ]);

  
  // prevent context menu (right click)
  React.useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }, []);

  return (
    <AppContext.Provider value={value}>
      <div onDragStart={(e) => e.preventDefault()}>
        <Routes>
          <Route path={`/`} element={<Tour />} /> 
          <Route path={`/:block`} element={<Tour />} />
          <Route path={`/:block/:level`} element={<Tour />} />
          <Route path={`/:block/:level/:view`} element={<><Menu /> <TourDetailed /></>} />
          <Route path={`/404`} element={<Costum404 />} />
          <Route path={`*`} element={<Redirect404 />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
