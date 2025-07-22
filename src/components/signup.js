import React, { useState, useEffect } from "react";
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

  const [validation, setValidation] = useState({
    nombre: { isValid: false, message: "" },
    telefono: { isValid: false, message: "" },
    usuario: { isValid: false, message: "" },
    contraseña: { isValid: false, message: "" },
    confirmarContraseña: { isValid: false, message: "" }
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // Función para validar cada campo
  const validateField = (name, value) => {
    let isValid = false;
    let message = "";

    switch (name) {
      case "nombre":
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (value.length < 3) {
          message = "El nombre debe tener al menos 3 caracteres";
          isValid = false;
        } else if (!nameRegex.test(value)) {
          message = "El nombre solo puede contener letras";
          isValid = false;
        } else {
          message = "Nombre válido";
          isValid = true;
        }
        break;

      case "telefono":
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) {
          message = "El teléfono debe tener exactamente 10 números";
          isValid = false;
        } else {
          message = "Teléfono válido";
          isValid = true;
        }
        break;

      case "usuario":
        if (value.length < 3) {
          message = "El usuario debe tener al menos 3 caracteres";
          isValid = false;
        } else {
          message = "Usuario válido";
          isValid = true;
        }
        break;

      case "contraseña":
        if (value.length < 3) {
          message = "La contraseña debe tener al menos 3 caracteres";
          isValid = false;
        } else {
          message = "Contraseña válida";
          isValid = true;
        }
        break;

      case "confirmarContraseña":
        if (value !== formData.contraseña) {
          message = "Las contraseñas no coinciden";
          isValid = false;
        } else if (value.length === 0) {
          message = "Confirma tu contraseña";
          isValid = false;
        } else {
          message = "Las contraseñas coinciden";
          isValid = true;
        }
        break;

      default:
        break;
    }

    return { isValid, message };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Restricciones de entrada
    let filteredValue = value;
    
    if (name === "telefono") {
      // Solo permitir números
      filteredValue = value.replace(/\D/g, '');
      // Limitar a 10 dígitos
      if (filteredValue.length > 10) {
        filteredValue = filteredValue.slice(0, 10);
      }
    } else if (name === "nombre") {
      // Solo permitir letras, espacios y acentos
      filteredValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    }
    
    setFormData({
      ...formData,
      [name]: filteredValue
    });

    // Validar el campo actual
    const fieldValidation = validateField(name, filteredValue);
    
    let updatedValidation = {
      ...validation,
      [name]: fieldValidation
    };

    // Si cambió la contraseña, revalidar confirmarContraseña
    if (name === "contraseña" && formData.confirmarContraseña) {
      const confirmValidation = validateField("confirmarContraseña", formData.confirmarContraseña);
      updatedValidation.confirmarContraseña = confirmValidation;
    }

    setValidation(updatedValidation);
  };

  // Verificar si todo el formulario es válido
  useEffect(() => {
    const allFieldsValid = Object.values(validation).every(field => field.isValid);
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== "");
    setIsFormValid(allFieldsValid && allFieldsFilled);
  }, [validation, formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      alert("Por favor, corrige todos los errores antes de continuar");
      return;
    }

    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuarioExiste = usuariosRegistrados.find(user => user.usuario === formData.usuario);

    if (usuarioExiste) {
      alert("Este usuario ya está registrado");
      return;
    }

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
    navigate("/");
  };

  const getFieldClass = (fieldName) => {
    if (formData[fieldName] === "") return "form-input";
    return validation[fieldName].isValid ? "form-input valid" : "form-input invalid";
  };

  const getGroupClass = (fieldName) => {
    if (formData[fieldName] === "") return "form-group";
    return validation[fieldName].isValid ? "form-group valid" : "form-group invalid";
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
            
            <div className={getGroupClass("nombre")}>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={getFieldClass("nombre")}
                placeholder="Solo letras"
                required
              />
              {formData.nombre && (
                <span className={validation.nombre.isValid ? "success-message" : "error-message"}>
                  {validation.nombre.message}
                </span>
              )}
            </div>

            <div className={getGroupClass("telefono")}>
              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={getFieldClass("telefono")}
                placeholder="Solo números (10 dígitos)"
                maxLength="10"
                required
              />
              {formData.telefono && (
                <span className={validation.telefono.isValid ? "success-message" : "error-message"}>
                  {validation.telefono.message}
                </span>
              )}
            </div>

            <div className={getGroupClass("usuario")}>
              <label htmlFor="usuario">Usuario:</label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                className={getFieldClass("usuario")}
                required
              />
              {formData.usuario && (
                <span className={validation.usuario.isValid ? "success-message" : "error-message"}>
                  {validation.usuario.message}
                </span>
              )}
            </div>

            <div className={getGroupClass("contraseña")}>
              <label htmlFor="contraseña">Contraseña:</label>
              <input
                type="password"
                id="contraseña"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                className={getFieldClass("contraseña")}
                required
              />
              {formData.contraseña && (
                <span className={validation.contraseña.isValid ? "success-message" : "error-message"}>
                  {validation.contraseña.message}
                </span>
              )}
            </div>

            <div className={getGroupClass("confirmarContraseña")}>
              <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label>
              <input
                type="password"
                id="confirmarContraseña"
                name="confirmarContraseña"
                value={formData.confirmarContraseña}
                onChange={handleChange}
                className={getFieldClass("confirmarContraseña")}
                required
              />
              {formData.confirmarContraseña && (
                <span className={validation.confirmarContraseña.isValid ? "success-message" : "error-message"}>
                  {validation.confirmarContraseña.message}
                </span>
              )}
            </div>

            <button 
              type="submit" 
              className="form-button"
              disabled={!isFormValid}
            >
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