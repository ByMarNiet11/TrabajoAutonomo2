"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/estilos_generales.css"

function SubirReceta() {
  const navigate = useNavigate()

  // Estado para los datos del formulario
  const [datosReceta, setDatosReceta] = useState({
    titulo: "",
    ingredientes: "",
    descripcion: "",
    imagen: "",
    tiempoPreparacion: "",
    dificultad: "Fácil",
  })

  // Estado para errores
  const [errores, setErrores] = useState({})

  // Función para validar el formulario
  const validarFormulario = () => {
    const nuevosErrores = {}

    if (datosReceta.titulo.length < 3) {
      nuevosErrores.titulo = "El título debe tener al menos 3 caracteres"
    }

    if (datosReceta.ingredientes.length < 10) {
      nuevosErrores.ingredientes = "Describe mejor los ingredientes"
    }

    if (datosReceta.descripcion.length < 20) {
      nuevosErrores.descripcion = "La descripción debe ser más detallada"
    }

    // Validar URL de imagen (opcional)
    if (datosReceta.imagen && !datosReceta.imagen.startsWith("http")) {
      nuevosErrores.imagen = "Debe ser una URL válida (http://...)"
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  // Función para manejar cambios en el formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target
    setDatosReceta({
      ...datosReceta,
      [name]: value,
    })
  }

  // Función para enviar el formulario
  const manejarEnvio = (e) => {
    e.preventDefault()

    if (!validarFormulario()) {
      alert("Por favor, corrige los errores antes de continuar")
      return
    }

    // Obtener usuario actual
    const usuarioActual = JSON.parse(localStorage.getItem("usuario"))
    if (!usuarioActual) {
      alert("Debes estar logueado para subir recetas")
      navigate("/login")
      return
    }

    // Crear nueva receta
    const nuevaReceta = {
      ...datosReceta,
      id: Date.now(), // ID único simple
      autor: usuarioActual.usuario,
      fecha: new Date().toLocaleDateString(),
      comentarios: [], // Array vacío para comentarios
      calificaciones: [],
    }

    // Guardar en localStorage
    const recetasPersonalizadas = JSON.parse(localStorage.getItem("recetasPersonalizadas") || "[]")
    recetasPersonalizadas.push(nuevaReceta)
    localStorage.setItem("recetasPersonalizadas", JSON.stringify(recetasPersonalizadas))

    alert("¡Receta subida exitosamente!")
    navigate("/")
  }

  return (
    <div className="pagina-inicio">
      {/* Header */}
      <header>
        <h1>🍳 La Hueca, recetario</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/buscar">Buscar</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="auth-form-container" style={{ maxWidth: "600px", margin: "20px auto" }}>
          <h2 className="form-title">Subir Nueva Receta</h2>

          <form onSubmit={manejarEnvio}>
            {/* Título */}
            <div className="form-group">
              <label htmlFor="titulo">Título de la receta:</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={datosReceta.titulo}
                onChange={manejarCambio}
                className="form-input"
                placeholder="Ej: Pollo a la plancha"
                required
              />
              {errores.titulo && <span className="error-message">{errores.titulo}</span>}
            </div>

            {/* Ingredientes */}
            <div className="form-group">
              <label htmlFor="ingredientes">Ingredientes:</label>
              <textarea
                id="ingredientes"
                name="ingredientes"
                value={datosReceta.ingredientes}
                onChange={manejarCambio}
                className="form-input"
                placeholder="Ej: 1 pollo, sal, pimienta, aceite de oliva..."
                rows="3"
                required
              />
              {errores.ingredientes && <span className="error-message">{errores.ingredientes}</span>}
            </div>

            {/* Descripción/Preparación */}
            <div className="form-group">
              <label htmlFor="descripcion">Preparación:</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={datosReceta.descripcion}
                onChange={manejarCambio}
                className="form-input"
                placeholder="Describe paso a paso cómo preparar la receta..."
                rows="5"
                required
              />
              {errores.descripcion && <span className="error-message">{errores.descripcion}</span>}
            </div>

            {/* Imagen (URL) */}
            <div className="form-group">
              <label htmlFor="imagen">Imagen (URL - opcional):</label>
              <input
                type="url"
                id="imagen"
                name="imagen"
                value={datosReceta.imagen}
                onChange={manejarCambio}
                className="form-input"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {errores.imagen && <span className="error-message">{errores.imagen}</span>}
            </div>

            {/* Tiempo de preparación */}
            <div className="form-group">
              <label htmlFor="tiempoPreparacion">Tiempo de preparación:</label>
              <input
                type="text"
                id="tiempoPreparacion"
                name="tiempoPreparacion"
                value={datosReceta.tiempoPreparacion}
                onChange={manejarCambio}
                className="form-input"
                placeholder="Ej: 30 minutos"
              />
            </div>

            {/* Dificultad */}
            <div className="form-group">
              <label htmlFor="dificultad">Dificultad:</label>
              <select
                id="dificultad"
                name="dificultad"
                value={datosReceta.dificultad}
                onChange={manejarCambio}
                className="form-input"
              >
                <option value="Fácil">Fácil</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Difícil">Difícil</option>
              </select>
            </div>

            <button type="submit" className="form-button">
              Subir Receta
            </button>
          </form>
        </section>
      </main>

      <footer>
        <p>© 2025 La Hueca. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default SubirReceta