import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Login({ setUsuarioLogeado }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usuario: "",
    contraseña: ""
  });

  const [validation, setValidation] = useState({
    usuario: { isValid: false, message: "" },
    contraseña: { isValid: false, message: "" }
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // Función para validar cada campo
  const validateField = (name, value) => {
    let isValid = false;
    let message = "";

    switch (name) {
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

      default:
        break;
    }

    return { isValid, message };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Validar el campo actual
    const fieldValidation = validateField(name, value);
    
    setValidation({
      ...validation,
      [name]: fieldValidation
    });
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
    const usuarioEncontrado = usuariosRegistrados.find(
      user => user.usuario === formData.usuario && user.contraseña === formData.contraseña
    );

    if (usuarioEncontrado) {
      localStorage.setItem("usuarioLogeado", "true");
      localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
      setUsuarioLogeado(true);
      alert("¡Inicio de sesión exitoso!");
      navigate("/");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
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
          <Link to="/signup" className="auth-link">Registrarse</Link>
        </div>
      </header>

      <main className="auth-main">
        <div className="auth-form-container">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Iniciar Sesión</h2>
            
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

            <button 
              type="submit" 
              className="form-button"
              disabled={!isFormValid}
            >
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