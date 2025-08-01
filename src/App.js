"use client"

// Archivo principal de la aplicación - ACTUALIZADO
import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Inicio from './components/inicio.tsx'
import BuscarRecetas from "./components/buscar"
import Signup from "./components/signup"
import Login from "./components/login"
import SubirReceta from "./components/subir-receta"
import Comentarios from "./components/comentarios"

function App() {
  // Estado para saber si el usuario está logueado
  const [usuarioLogeado, setUsuarioLogeado] = useState(localStorage.getItem("usuarioLogeado") === "true")

  // Función para cerrar sesión
  const cerrarSesion = () => {
    if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      // Limpiar datos del localStorage
      localStorage.removeItem("usuario")
      localStorage.setItem("usuarioLogeado", "false")
      setUsuarioLogeado(false)
      alert("¡Sesión cerrada exitosamente!")
    }
  }

  return (
    <Router>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Inicio usuarioLogeado={usuarioLogeado} cerrarSesion={cerrarSesion} />} />

        {/* Página de búsqueda */}
        <Route path="/buscar" element={<BuscarRecetas />} />

        {/* Página de login */}
        <Route
          path="/login"
          element={usuarioLogeado ? <Navigate to="/" replace /> : <Login setUsuarioLogeado={setUsuarioLogeado} />}
        />

        {/* Página de registro */}
        <Route
          path="/signup"
          element={usuarioLogeado ? <Navigate to="/" replace /> : <Signup setUsuarioLogeado={setUsuarioLogeado} />}
        />

        {/* Página para subir recetas - solo si está logueado */}
        <Route path="/subir-recetas" element={usuarioLogeado ? <SubirReceta /> : <Navigate to="/login" replace />} />

        {/* NUEVA RUTA: Página de comentarios - solo si está logueado */}
        <Route path="/comentarios" element={usuarioLogeado ? <Comentarios /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
