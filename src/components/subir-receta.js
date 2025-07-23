"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/estilos_generales.css"

function SubirReceta() {
  const navigate = useNavigate()

  // Estado para los datos del formulario
    const [datosReceta, setDatosReceta] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
  })

  // Estado para errores
  const [errores, setErrores] = useState({})
  // Estado para preview de imagen
  const [previewImagen, setPreviewImagen] = useState(null)


  // Función para validar el formulario
    const validarFormulario = () => {
    const nuevosErrores = {}

    if (datosReceta.titulo.length < 3) {
      nuevosErrores.titulo = "El título debe tener al menos 3 caracteres"
    }

    if (datosReceta.descripcion.length < 20) {
      nuevosErrores.descripcion = "La descripción debe ser más detallada"
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

  // Función para manejar la subida de imagen
const manejarImagenArchivo = (e) => {
  const archivo = e.target.files[0]
  
  if (!archivo) {
    setDatosReceta({
      ...datosReceta,
      imagen: ""
    })
    setPreviewImagen(null)
    return
  }

  // Validar tipo de archivo
  const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
  if (!tiposPermitidos.includes(archivo.type)) {
    alert("Solo se permiten archivos de imagen")
    return
  }

  // Convertir a base64
  const reader = new FileReader()
  reader.onload = (event) => {
    const imagenBase64 = event.target.result
    setDatosReceta({
      ...datosReceta,
      imagen: imagenBase64
    })
    setPreviewImagen(imagenBase64)
  }
  reader.readAsDataURL(archivo)
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

            {/* Descripción/Preparación */}
            <div className="form-group">
              <label htmlFor="descripcion">Descripción:</label>
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
              <label htmlFor="imagen">Imagen:</label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                onChange={manejarImagenArchivo}
                className="form-input"
                accept="image/*"
              />

              {/* Preview de la imagen */}
              {previewImagen && (
                <div style={{ marginTop: "10px" }}>
                  <img 
                    src={previewImagen} 
                    alt="Preview" 
                    style={{ 
                      maxWidth: "200px", 
                      maxHeight: "200px", 
                      objectFit: "cover",
                      borderRadius: "8px"
                    }} 
                  />
                </div>
              )}
              {errores.imagen && <span className="error-message">{errores.imagen}</span>}
            </div>

            <div className="botones-formulario">
            <button type="submit" className="form-button">
              Subir Receta
            </button>
            
            <button 
              type="button" 
              onClick={() => navigate("/")} 
              className="form-button-cancelar"
            >
              Cancelar
            </button>
          </div>
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