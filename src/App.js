import React, { createContext, useMemo } from 'react';
import {Route, Routes } from 'react-router-dom';
import TourDetailed from './pages/TourDetailed';
import Tour from './pages/Tour';
import Menu from './components/Menu';

export const AppContext = createContext();

function App() {
  const [currentBlock, setCurrentBlock] = React.useState("a-block");
  const [currentLevel, setCurrentLevel] = React.useState("l2");
  const [currentView, setCurrentView] = React.useState("day");
  
  const value = useMemo(() => ({
    currentBlock,
    setCurrentBlock,
    currentLevel,
    setCurrentLevel,
    currentView,
    setCurrentView,
  }), [
    currentBlock,
    setCurrentBlock,
    currentLevel,
    setCurrentLevel,
    currentView,
    setCurrentView,
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
        <Menu />
        <Routes>
          <Route path={`/`} element={<Tour />} /> 
          <Route path={`/:block`} element={<Tour />} />
          <Route path={`/:block/:level`} element={<Tour />} />
          <Route path={`/:block/:level/:view`} element={<TourDetailed />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
