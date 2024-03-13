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
import AccesoAgente from './pages/AccesoAgente';
import PlantillaSaludo from './pages/opciones/PlantillaSaludo';
import PlantillasTablas from './pages/opciones/PlantillasTablas';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const user2 = JSON.parse(localStorage.getItem('user2'));

  const PrivateRoute = ({ element, path }) => {
    if (user && user.type === 'agente') {
      // Si el usuario es un agente, redirige a la página de inicio
      return element;
    }
  
    if (user2 && user2.type === 'admin') {
      // Si el usuario2 es un admin, renderiza la ruta privada
      return element;
    }
  
    // En caso de que ninguna condición se cumpla, redirige a la página de inicio de sesión
    return <Navigate to="/" />;
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
      <Route path="/plantilla" element={<PrivateRoute element={<PlantillaSaludo />} />} />
      <Route path="/listar_plantillas" element={<PrivateRoute element={<PlantillasTablas />} />} />

    </Routes>
  );
}

export default App;
