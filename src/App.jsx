import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


// Importa los componentes de forma diferida
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Mensajes = React.lazy(() => import('./pages/opciones/Mensajes'));
const Perfil = React.lazy(() => import('./pages/user/Perfil'));
const Campanas = React.lazy(() => import('./pages/opciones/Campanas'));
const Contacto = React.lazy(() => import('./pages/user/Contacto'));
const SendCampana = React.lazy(() => import('./pages/opciones/SendCampana'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const AccesoAgente = React.lazy(() => import('./pages/AccesoAgente'));
const PlantillaSaludo = React.lazy(() => import('./pages/opciones/PlantillaSaludo'));
const PlantillasTablas = React.lazy(() => import('./pages/opciones/PlantillasTablas'));
const ReportesChats = React.lazy(() => import('./pages/reportes/ReportesChats'));
const ReportesAgente = React.lazy(() => import('./pages/reportes/ReportesAgente'));

function App() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const user2 = JSON.parse(sessionStorage.getItem('user2'));

  const PrivateRoute = ({ element, path }) => {
    if (user && user.type === 'agente') {
      return element;
    }
    if (user2 && user2.type === 'admin') {
      return element;
    }
    return <Navigate to="/" />;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
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
        <Route path="/reporte_chats" element={<PrivateRoute element={<ReportesChats />} />} />
        <Route path="/reporte_agente" element={<PrivateRoute element={<ReportesAgente />} />} />
      </Routes>
    </Suspense>
  );
}

export default App;
