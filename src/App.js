import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Home from './Home';

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/tower_tour" element={<Home />} /> 
        <Route path="/tower_tour/about" element={<h1>About</h1>} />
      </Routes>
    </>
  );
}

export default App;
