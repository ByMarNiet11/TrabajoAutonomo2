"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/auth.css"

function Login({ setUsuarioLogeado }) {
  const navigate = useNavigate() // Para navegar entre páginas

  // Estado para los datos del formulario
  const [datosFormulario, setDatosFormulario] = useState({
    usuario: "",
    contraseña: "",
  })

  // Estado para errores
  const [errores, setErrores] = useState({})

  // Función para validar un campo específico
  const validarCampo = (nombre, valor) => {
    let esValido = true
    let mensaje = ""

    if (nombre === "usuario") {
      if (valor.length < 3) {
        esValido = false
        mensaje = "El usuario debe tener al menos 3 caracteres"
      }
    }

    if (nombre === "contraseña") {
      if (valor.length < 3) {
        esValido = false
        mensaje = "La contraseña debe tener al menos 3 caracteres"
      }
    }

    return { esValido, mensaje }
  }

  // Función que se ejecuta cuando el usuario escribe en un campo
  const manejarCambio = (e) => {
    const { name, value } = e.target

    // Actualizar los datos del formulario
    setDatosFormulario({
      ...datosFormulario,
      [name]: value,
    })

    // Validar el campo que cambió
    const validacion = validarCampo(name, value)

    // Actualizar errores
    if (validacion.esValido) {
      // Si es válido, quitar el error
      const nuevosErrores = { ...errores }
      delete nuevosErrores[name]
      setErrores(nuevosErrores)
    } else {
      // Si no es válido, agregar el error
      setErrores({
        ...errores,
        [name]: validacion.mensaje,
      })
    }
  }

  // Función que se ejecuta cuando se envía el formulario
  const manejarEnvio = (e) => {
    e.preventDefault() // Evitar que la página se recargue

    // Verificar si hay errores
    if (Object.keys(errores).length > 0) {
      alert("Por favor, corrige todos los errores antes de continuar")
      return
    }

    // Verificar si los campos están vacíos
    if (!datosFormulario.usuario || !datosFormulario.contraseña) {
      alert("Por favor, completa todos los campos")
      return
    }

    // Obtener usuarios registrados del localStorage
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios") || "[]")

    // Buscar si existe un usuario con esos datos
    const usuarioEncontrado = usuariosRegistrados.find(
      (user) => user.usuario === datosFormulario.usuario && user.contraseña === datosFormulario.contraseña,
    )

    if (usuarioEncontrado) {
      // Si el usuario existe, iniciar sesión
      localStorage.setItem("usuarioLogeado", "true")
      localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado))
      setUsuarioLogeado(true)
      alert("¡Inicio de sesión exitoso!")
      navigate("/") // Ir a la página principal
    } else {
      // Si no existe, mostrar error
      alert("Usuario o contraseña incorrectos")
    }
  }

  // Función para determinar la clase CSS del campo según su estado
  const obtenerClaseCampo = (nombreCampo) => {
    if (!datosFormulario[nombreCampo]) return "form-input" // Campo vacío
    return errores[nombreCampo] ? "form-input invalid" : "form-input valid" // Con error o válido
  }

  return (
    <div className="auth-container">
      {/* Encabezado - ACTUALIZADO CON ENLACE AL INICIO */}
      <header className="auth-header">
        <div className="auth-nav">
          <div className="logo-section">
            <span className="logo-icon">🔍</span>
            <h1>La Hueca, recetario</h1>
          </div>
          <div style={{ display: "flex", gap: "15px" }}>
            <Link to="/" className="auth-link">
              Inicio
            </Link>
            <Link to="/signup" className="auth-link">
              Registrarse
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="auth-main">
        <div className="auth-form-container">
          <form onSubmit={manejarEnvio}>
            <h2 className="form-title">Iniciar Sesión</h2>

            {/* Campo de usuario */}
            <div className="form-group">
              <label htmlFor="usuario">Usuario:</label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                value={datosFormulario.usuario}
                onChange={manejarCambio}
                className={obtenerClaseCampo("usuario")}
                required
              />
              {/* Mostrar mensaje de error o éxito */}
              {datosFormulario.usuario && (
                <span className={errores.usuario ? "error-message" : "success-message"}>
                  {errores.usuario || "Usuario válido"}
                </span>
              )}
            </div>

            {/* Campo de contraseña */}
            <div className="form-group">
              <label htmlFor="contraseña">Contraseña:</label>
              <input
                type="password"
                id="contraseña"
                name="contraseña"
                value={datosFormulario.contraseña}
                onChange={manejarCambio}
                className={obtenerClaseCampo("contraseña")}
                required
              />
              {/* Mostrar mensaje de error o éxito */}
              {datosFormulario.contraseña && (
                <span className={errores.contraseña ? "error-message" : "success-message"}>
                  {errores.contraseña || "Contraseña válida"}
                </span>
              )}
            </div>

            {/* Botón de envío */}
            <button type="submit" className="form-button">
              Iniciar Sesión
            </button>

            {/* Enlace a registro */}
            <p className="form-footer">
              ¿No tienes cuenta?{" "}
              <Link to="/signup" className="form-link">
                Regístrate aquí
              </Link>
            </p>
          </form>
        </div>
      </main>

      {/* Pie de página */}
      <footer className="auth-footer">
        <p>© 2025 La Hueca. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default Login