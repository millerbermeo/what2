import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Mensajes from './pages/Mensajes';
import Perfil from './pages/Perfil';
import Campanas from './pages/Campanas';
import Contacto from './pages/Contacto';

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
      <Route path="/perfil" element={<PrivateRoute element={<Perfil />} />} />
      <Route path="/mensajes" element={<PrivateRoute element={<Mensajes />} />} />
      <Route path="/campanas" element={<PrivateRoute element={<Campanas />} />} />
      <Route path="/contacto" element={<PrivateRoute element={<Contacto />} />} />
    </Routes>
  );
}

export default App;
