import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Pacientes from './pages/Pacientes';
import Medicos from './pages/Medicos';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Redireciona a raiz direto para Pacientes */}
          <Route index element={<Navigate to="/pacientes" replace />} />
          <Route path="pacientes" element={<Pacientes />} />
          <Route path="medicos" element={<Medicos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
