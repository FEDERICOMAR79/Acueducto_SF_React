import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './components/Index';
import Bombas from './components/Bombas';
import Plantas from './components/Plantas';
import Stats from './components/Stats';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/bombas" element={<Bombas />} />
        <Route path="/plantas" element={<Plantas />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
