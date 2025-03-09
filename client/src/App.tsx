import { useState } from 'react';
import './App.css';
import LandingPage from './views/LandingPage';
import { Route, Routes } from 'react-router';
import JoinPage from './views/JoinPage';
import VirtualRoom from './views/VirtualRoom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/join' element={<JoinPage />} />
      <Route path='/r' element={<VirtualRoom />} />
    </Routes>
  );
}

export default App;
