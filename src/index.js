// index.js (ou votre fichier principal)
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import Admin from './components/Admin'; // ← nouvelle page

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/groupe/:groupe" element={<App />} />
      <Route path="/admin" element={<Admin />} /> {/* ← ajoutée */}
    </Routes>
  </BrowserRouter>
);