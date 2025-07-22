// src/App.js
import React, { useState } from "react";
import Inicio from "./components/inicio";

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
    <div className="app-container">
      <header>
        <h1>🍳 La Hueca, recetario</h1>
        <nav>
          <ul>
            {!usuarioLogeado && (
              <>
                <li><a href="#login">Iniciar Sesión</a></li>
                <li><a href="#signup">Registrarse</a></li>
              </>
            )}
            {usuarioLogeado && (
              <li>
                <button onClick={cerrarSesion}>Cerrar Sesión</button>
              </li>
            )}
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <Inicio usuarioLogeado={usuarioLogeado} cerrarSesion={cerrarSesion} />

      <footer>© 2025 La Hueca. Todos los derechos reservados.</footer>
    </div>
  );
}

export default App;
