import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Mensajes from "./pages/Mensajes"
import Perfil from "./pages/Perfil"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="perfil" element={<Perfil />}></Route>
      <Route path="/mensajes" element={<Mensajes />}></Route>
    </Routes>
  )
}

export default App
