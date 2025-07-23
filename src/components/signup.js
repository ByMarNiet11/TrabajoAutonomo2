"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/auth.css"

function Signup({ setUsuarioLogeado }) {
  const navigate = useNavigate() // Para navegar entre páginas

  // Estado para los datos del formulario
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    telefono: "",
    usuario: "",
    contraseña: "",
    confirmarContraseña: "",
  })

  // Estado para los errores de validación
  const [errores, setErrores] = useState({})

  // Función para validar un campo específico
  const validarCampo = (nombre, valor) => {
    let esValido = true
    let mensaje = ""

    switch (nombre) {
      case "nombre":
        // Solo letras y espacios
        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
        if (valor.length < 3) {
          esValido = false
          mensaje = "El nombre debe tener al menos 3 caracteres"
        } else if (!regexNombre.test(valor)) {
          esValido = false
          mensaje = "El nombre solo puede contener letras"
        }
        break

      case "telefono":
        // Solo números, exactamente 10 dígitos
        const regexTelefono = /^\d{10}$/
        if (!regexTelefono.test(valor)) {
          esValido = false
          mensaje = "El teléfono debe tener exactamente 10 números"
        }
        break

      case "usuario":
        if (valor.length < 3) {
          esValido = false
          mensaje = "El usuario debe tener al menos 3 caracteres"
        }
        break

      case "contraseña":
        if (valor.length < 3) {
          esValido = false
          mensaje = "La contraseña debe tener al menos 3 caracteres"
        }
        break

      case "confirmarContraseña":
        if (valor !== datosFormulario.contraseña) {
          esValido = false
          mensaje = "Las contraseñas no coinciden"
        } else if (valor.length === 0) {
          esValido = false
          mensaje = "Confirma tu contraseña"
        }
        break
    }

    return { esValido, mensaje }
  }

  // Función que se ejecuta cuando el usuario escribe en un campo
  const manejarCambio = (e) => {
    const { name, value } = e.target
    let valorFiltrado = value

    // Aplicar filtros específicos según el campo
    if (name === "telefono") {
      // Solo permitir números y máximo 10 dígitos
      valorFiltrado = value.replace(/\D/g, "").slice(0, 10)
    } else if (name === "nombre") {
      // Solo permitir letras, espacios y acentos
      valorFiltrado = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "")
    }

    // Actualizar los datos del formulario
    setDatosFormulario({
      ...datosFormulario,
      [name]: valorFiltrado,
    })

    // Validar el campo que cambió
    const validacion = validarCampo(name, valorFiltrado)

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

    // Si cambió la contraseña, revalidar la confirmación
    if (name === "contraseña" && datosFormulario.confirmarContraseña) {
      const validacionConfirmar = validarCampo("confirmarContraseña", datosFormulario.confirmarContraseña)
      if (!validacionConfirmar.esValido) {
        setErrores((prev) => ({
          ...prev,
          confirmarContraseña: validacionConfirmar.mensaje,
        }))
      }
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

    // Verificar si todos los campos están llenos
    const camposVacios = Object.values(datosFormulario).some((valor) => valor.trim() === "")
    if (camposVacios) {
      alert("Por favor, completa todos los campos")
      return
    }

    // Obtener usuarios registrados del localStorage
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios") || "[]")

    // Verificar si el usuario ya existe
    const usuarioExiste = usuariosRegistrados.find((user) => user.usuario === datosFormulario.usuario)
    if (usuarioExiste) {
      alert("Este usuario ya está registrado")
      return
    }

    // Crear nuevo usuario
    const nuevoUsuario = {
      nombre: datosFormulario.nombre,
      telefono: datosFormulario.telefono,
      usuario: datosFormulario.usuario,
      contraseña: datosFormulario.contraseña,
      fechaRegistro: new Date().toISOString(),
    }

    // Guardar el nuevo usuario
    usuariosRegistrados.push(nuevoUsuario)
    localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados))

    // Iniciar sesión automáticamente
    localStorage.setItem("usuarioLogeado", "true")
    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario))

    setUsuarioLogeado(true)
    alert("¡Registro exitoso! Bienvenido a La Hueca")
    navigate("/") // Ir a la página principal
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
            <Link to="/login" className="auth-link">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="auth-main">
        <div className="auth-form-container">
          <form onSubmit={manejarEnvio}>
            <h2 className="form-title">Registrarse</h2>

            {/* Campo de nombre */}
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={datosFormulario.nombre}
                onChange={manejarCambio}
                className={obtenerClaseCampo("nombre")}
                placeholder="Solo letras"
                required
              />
              {datosFormulario.nombre && (
                <span className={errores.nombre ? "error-message" : "success-message"}>
                  {errores.nombre || "Nombre válido"}
                </span>
              )}
            </div>

            {/* Campo de teléfono */}
            <div className="form-group">
              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={datosFormulario.telefono}
                onChange={manejarCambio}
                className={obtenerClaseCampo("telefono")}
                placeholder="Solo números (10 dígitos)"
                maxLength="10"
                required
              />
              {datosFormulario.telefono && (
                <span className={errores.telefono ? "error-message" : "success-message"}>
                  {errores.telefono || "Teléfono válido"}
                </span>
              )}
            </div>

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
              {datosFormulario.contraseña && (
                <span className={errores.contraseña ? "error-message" : "success-message"}>
                  {errores.contraseña || "Contraseña válida"}
                </span>
              )}
            </div>

            {/* Campo de confirmar contraseña */}
            <div className="form-group">
              <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label>
              <input
                type="password"
                id="confirmarContraseña"
                name="confirmarContraseña"
                value={datosFormulario.confirmarContraseña}
                onChange={manejarCambio}
                className={obtenerClaseCampo("confirmarContraseña")}
                required
              />
              {datosFormulario.confirmarContraseña && (
                <span className={errores.confirmarContraseña ? "error-message" : "success-message"}>
                  {errores.confirmarContraseña || "Las contraseñas coinciden"}
                </span>
              )}
            </div>

            {/* Botón de envío */}
            <button type="submit" className="form-button">
              Registrarse
            </button>

            {/* Enlace a login */}
            <p className="form-footer">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="form-link">
                Inicia sesión aquí
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

export default Signup