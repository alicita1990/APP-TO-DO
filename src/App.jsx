import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Componentes/Home';
import Tasklist from './Componentes/Tasklist';
import Login from './Componentes/Login';
import Register from './Componentes/Register';
import PrivateRoute from './protectroute/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Rutas protegidas */}
      <Route
        path="/tasklist"
        element={
          <PrivateRoute>
            <Tasklist />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
