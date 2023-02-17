import React, { createContext, useEffect, useMemo } from 'react';
import {Route, Routes } from 'react-router-dom';
import TourDetailed from './pages/TourDetailed';
import Tour from './pages/Tour';

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

  
  return (
    <AppContext.Provider value={value}>
      <Routes>
        <Route path="/tower_tour" element={<Tour />} /> 
        <Route path="/tower_tour/:block/:level/:view" element={<TourDetailed />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
