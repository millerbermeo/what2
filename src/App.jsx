import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Mensajes from './pages/opciones/Mensajes';
import Perfil from './pages/user/Perfil';
import Campanas from './pages/opciones/Campanas';
import Contacto from './pages/user/Contacto';
import SendCampana from './pages/opciones/SendCampana'
import Dashboard from './pages/Dashboard';
import PageMonitoreo from './pages/PageMonitoreo';
import AccesoAgente from './pages/AccesoAgente';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  const PrivateRoute = ({ element, path }) => {
    if (!user) {
      // Si no hay un usuario, redirige a la página de inicio de sesión
      return <Navigate to="/" />;
    }

    // Si hay un usuario, renderiza la ruta privada
    return element;
  };

  return (
    <Routes>
      {/* Ruta pública para el inicio de sesión */}
      <Route path="/" element={<Login />} />

      {/* Rutas privadas */}
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="/perfil" element={<PrivateRoute element={<Perfil />} />} />
      <Route path="/mensajes" element={<PrivateRoute element={<Mensajes />} />} />
      <Route path="/campanas" element={<PrivateRoute element={<Campanas />} />} />
      <Route path="/contacto" element={<PrivateRoute element={<Contacto />} />} />
      <Route path="/send" element={<PrivateRoute element={<SendCampana />} />} />
      <Route path="/acceso" element={<PrivateRoute element={<AccesoAgente />} />} />

    </Routes>
  );
}

export default App;
