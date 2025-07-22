import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Login({ setUsuarioLogeado }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usuario: "",
    contraseña: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.usuario || !formData.contraseña) {
      alert("Por favor, completa todos los campos");
      return;
    }

    // Simulación de login (aquí conectarías con tu backend)
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuarioEncontrado = usuariosRegistrados.find(
      user => user.usuario === formData.usuario && user.contraseña === formData.contraseña
    );

    if (usuarioEncontrado) {
      localStorage.setItem("usuarioLogeado", "true");
      localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
      setUsuarioLogeado(true);
      alert("¡Inicio de sesión exitoso!");
      navigate("/"); // Redirigir al inicio
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
        <div className="auth-nav">
          <div className="logo-section">
            <span className="logo-icon">🔍</span>
            <h1>La Hueca, recetario</h1>
          </div>
          <Link to="/signup" className="auth-link">Registrarse</Link>
        </div>
      </header>

      <main className="auth-main">
        <div className="auth-form-container">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Iniciar Sesión</h2>
            
            <div className="form-group">
              <label htmlFor="usuario">Usuario:</label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contraseña">Contraseña:</label>
              <input
                type="password"
                id="contraseña"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <button type="submit" className="form-button">
              Iniciar Sesión
            </button>

            <p className="form-footer">
              ¿No tienes cuenta? <Link to="/signup" className="form-link">Regístrate aquí</Link>
            </p>
          </form>
        </div>
      </main>

      <footer className="auth-footer">
        <p>© 2025 La Hueca. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Login;