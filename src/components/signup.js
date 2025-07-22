import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Signup({ setUsuarioLogeado }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    usuario: "",
    contraseña: "",
    confirmarContraseña: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.nombre || !formData.telefono || !formData.usuario || !formData.contraseña || !formData.confirmarContraseña) {
      alert("Por favor, completa todos los campos");
      return;
    }

    if (formData.contraseña !== formData.confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (formData.contraseña.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Verificar si el usuario ya existe
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuarioExiste = usuariosRegistrados.find(user => user.usuario === formData.usuario);

    if (usuarioExiste) {
      alert("Este usuario ya está registrado");
      return;
    }

    // Registrar nuevo usuario
    const nuevoUsuario = {
      nombre: formData.nombre,
      telefono: formData.telefono,
      usuario: formData.usuario,
      contraseña: formData.contraseña,
      fechaRegistro: new Date().toISOString()
    };

    usuariosRegistrados.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
    localStorage.setItem("usuarioLogeado", "true");
    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
    
    setUsuarioLogeado(true);
    alert("¡Registro exitoso! Bienvenido a La Hueca");
    navigate("/"); // Redirigir al inicio
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
        <div className="auth-nav">
          <div className="logo-section">
            <span className="logo-icon">🔍</span>
            <h1>La Hueca, recetario</h1>
          </div>
          <Link to="/login" className="auth-link">Iniciar Sesión</Link>
        </div>
      </header>

      <main className="auth-main">
        <div className="auth-form-container">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Registrarse</h2>
            
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

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

            <div className="form-group">
              <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label>
              <input
                type="password"
                id="confirmarContraseña"
                name="confirmarContraseña"
                value={formData.confirmarContraseña}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <button type="submit" className="form-button">
              Registrarse
            </button>

            <p className="form-footer">
              ¿Ya tienes cuenta? <Link to="/login" className="form-link">Inicia sesión aquí</Link>
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

export default Signup;