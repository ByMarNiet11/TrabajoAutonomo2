// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./components/inicio";
import BuscarRecetas from "./components/buscar";
import Signup from "./components/signup";
import Login from "./components/login";

function App() {
  const [usuarioLogeado, setUsuarioLogeado] = useState(
    localStorage.getItem("usuarioLogeado") === "true"
  );

  const cerrarSesion = () => {
    if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      localStorage.removeItem("usuario");
      localStorage.setItem("usuarioLogeado", "false");
      setUsuarioLogeado(false);
      alert("¡Sesión cerrada exitosamente!");
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Inicio usuarioLogeado={usuarioLogeado} cerrarSesion={cerrarSesion} />}
        />
        <Route path="/buscar" element={<BuscarRecetas />} />
        
        {/* Rutas de autenticación - estas eran las que faltaban */}
        <Route 
          path="/login" 
          element={
            usuarioLogeado ? 
            <Navigate to="/" replace /> : 
            <Login setUsuarioLogeado={setUsuarioLogeado} />
          } 
        />
        <Route 
          path="/signup" 
          element={
            usuarioLogeado ? 
            <Navigate to="/" replace /> : 
            <Signup setUsuarioLogeado={setUsuarioLogeado} />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;