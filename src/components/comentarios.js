"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/estilos_generales.css"

function Comentarios() {
  const navigate = useNavigate()
  const [recetasParaComentarios, setRecetasParaComentarios] = useState([])

  // Verificar si el usuario está logueado
  useEffect(() => {
    const usuarioLogeado = localStorage.getItem("usuarioLogeado") === "true"
    if (!usuarioLogeado) {
      alert("Debes estar logueado para comentar recetas")
      navigate("/login")
    }
  }, [navigate])

  // Cargar recetas al iniciar
  useEffect(() => {
    // Recetas predeterminadas
    const recetasPredeterminadas = [
      {
        id: "pollo-horno",
        titulo: "Pollo al horno",
        imagen: "https://polloseldorado.co/wp-content/uploads/2023/08/1.jpg",
        descripcion:
          "Jugoso pollo al horno con piel crujiente y dorada, sazonado con hierbas aromáticas y un toque de ajo. Una receta clásica, fácil de preparar, perfecta para una comida familiar o una cena especial. ¡Sabor casero que nunca falla!",
      },
      {
        id: "ensalada-cesar",
        titulo: "Ensalada César",
        imagen: "https://ariztia.com/wp-content/uploads/2023/11/ensalada-cesar-de-pollo.jpg",
        descripcion:
          "Ensalada César clásica con lechuga fresca, pollo a la parrilla, crutones crujientes y aderezo César cremoso. Ideal como plato principal o acompañamiento. ¡Una opción saludable y deliciosa!",
      },
      {
        id: "espaguetis-carbonara",
        titulo: "Espaguetis a la carbonara",
        imagen: "https://imag.bonviveur.com/espaguetis-a-la-carbonara-con-nata.jpg",
        descripcion:
          "Espaguetis al dente mezclados con una salsa cremosa de yema de huevo, queso parmesano y panceta crujiente. Un plato italiano clásico, fácil de preparar y lleno de sabor. Ideal para una cena rápida y deliciosa.",
      },
    ]

    // Obtener recetas personalizadas
    const recetasPersonalizadas = JSON.parse(localStorage.getItem("recetasPersonalizadas") || "[]")

    // Asignar IDs a las recetas personalizadas si no los tienen
    const recetasPersonalizadasConId = recetasPersonalizadas.map((receta) => ({
      ...receta,
      id: receta.id || `receta-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }))

    // Combinar todas las recetas
    const todasLasRecetas = [...recetasPredeterminadas, ...recetasPersonalizadasConId]

    setRecetasParaComentarios(todasLasRecetas)
  }, [])

  // Obtener datos del usuario logueado
  const usuarioActual = JSON.parse(localStorage.getItem("usuario") || "{}")

  // Estados para manejar comentarios
  const [comentariosPorReceta, setComentariosPorReceta] = useState({})
  const [nuevosComentarios, setNuevosComentarios] = useState({})

  // Cargar comentarios guardados al iniciar
  useEffect(() => {
    const comentariosGuardados = {}
    recetasParaComentarios.forEach((receta) => {
      if (receta && receta.id) {
        const comentarios = JSON.parse(localStorage.getItem(`comentarios-${receta.id}`) || "[]")
        comentariosGuardados[receta.id] = comentarios
      }
    })
    setComentariosPorReceta(comentariosGuardados)
  }, [recetasParaComentarios])

  // Función para manejar cambios en el textarea
  const manejarCambioComentario = (recetaId, valor) => {
    setNuevosComentarios({
      ...nuevosComentarios,
      [recetaId]: valor,
    })
  }

  // Función para agregar comentario
  const agregarComentario = (recetaId) => {
    const textoComentario = nuevosComentarios[recetaId]

    if (!textoComentario || textoComentario.trim().length < 5) {
      alert("El comentario debe tener al menos 5 caracteres")
      return
    }

    const nuevoComentario = {
      id: Date.now(),
      usuario: usuarioActual.nombre || usuarioActual.usuario,
      texto: textoComentario.trim(),
      fecha: new Date().toLocaleDateString(),
    }

    // Actualizar comentarios en el estado
    const comentariosActuales = comentariosPorReceta[recetaId] || []
    const comentariosActualizados = [...comentariosActuales, nuevoComentario]

    setComentariosPorReceta({
      ...comentariosPorReceta,
      [recetaId]: comentariosActualizados,
    })

    // Guardar en localStorage
    localStorage.setItem(`comentarios-${recetaId}`, JSON.stringify(comentariosActualizados))

    // Limpiar el campo de texto
    setNuevosComentarios({
      ...nuevosComentarios,
      [recetaId]: "",
    })

    alert("¡Comentario agregado exitosamente!")
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
        {/* Sección principal como en tu imagen */}
        <section
          className="comentarios-header"
          style={{
            background: "#b08968",
            color: "white",
            padding: "40px 30px",
            textAlign: "center",
            borderRadius: "12px",
            margin: "20px 0 40px 0",
          }}
        >
          <h2
            style={{
              fontSize: "2.2em",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            💬 Comenta las Recetas
          </h2>
          <p style={{ fontSize: "1.1em", margin: 0 }}>Comparte tu opinión sobre nuestras deliciosas recetas</p>
        </section>

        {/* Lista de recetas para comentar */}
        <div className="recetas-comentarios">
          {recetasParaComentarios.map((receta) => (
            <div
              key={receta.id}
              style={{
                background: "white",
                borderRadius: "12px",
                marginBottom: "30px",
                border: "1px solid #e6ccb2",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              {/* Información de la receta */}
              <div
                style={{
                  display: "flex",
                  padding: "25px",
                  gap: "20px",
                  alignItems: "flex-start",
                }}
              >
                <img
                  src={receta.imagen || "/placeholder.svg"}
                  alt={receta.titulo}
                  style={{
                    width: "150px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: "#b08968", marginBottom: "10px", fontSize: "1.4em" }}>{receta.titulo}</h3>
                  <p style={{ color: "#7c5e48", lineHeight: "1.5", margin: 0 }}>{receta.descripcion}</p>
                </div>
              </div>

              {/* Sección de comentarios */}
              <div style={{ borderTop: "1px solid #e6ccb2", padding: "20px 25px" }}>
                <h4
                  style={{
                    color: "#a97155",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  💭 Comentarios ({(comentariosPorReceta[receta.id] || []).length})
                </h4>

                {/* Lista de comentarios existentes */}
                <div style={{ marginBottom: "20px" }}>
                  {(comentariosPorReceta[receta.id] || []).length === 0 ? (
                    <p
                      style={{
                        color: "#999",
                        fontStyle: "italic",
                        textAlign: "center",
                        padding: "20px",
                        background: "#f9f9f9",
                        borderRadius: "8px",
                      }}
                    >
                      No hay comentarios aún. ¡Sé el primero en comentar!
                    </p>
                  ) : (
                    <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {(comentariosPorReceta[receta.id] || []).map((comentario) => (
                        <div
                          key={comentario.id}
                          style={{
                            background: "#f8f9fa",
                            padding: "12px 15px",
                            borderRadius: "8px",
                            marginBottom: "10px",
                            borderLeft: "3px solid #b08968",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "5px",
                            }}
                          >
                            <strong style={{ color: "#b08968", fontSize: "0.9em" }}>{comentario.usuario}</strong>
                            <span style={{ color: "#666", fontSize: "0.8em" }}>{comentario.fecha}</span>
                          </div>
                          <p style={{ color: "#555", margin: 0, fontSize: "0.95em" }}>{comentario.texto}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Formulario para nuevo comentario */}
                <div>
                  <div style={{ marginBottom: "10px" }}>
                    <input
                      type="text"
                      value={usuarioActual.nombre || usuarioActual.usuario || ""}
                      disabled
                      placeholder="Tu nombre"
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #e6ccb2",
                        borderRadius: "8px",
                        background: "#f5f5f5",
                        color: "#666",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <textarea
                      value={nuevosComentarios[receta.id] || ""}
                      onChange={(e) => manejarCambioComentario(receta.id, e.target.value)}
                      placeholder="Escribe tu comentario..."
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid #e6ccb2",
                        borderRadius: "8px",
                        minHeight: "80px",
                        resize: "vertical",
                        fontSize: "14px",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <button
                    onClick={() => agregarComentario(receta.id)}
                    style={{
                      background: "#b08968",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#7c5e48")}
                    onMouseOut={(e) => (e.target.style.background = "#b08968")}
                  >
                    Agregar Comentario
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <p>© 2025 La Hueca. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default Comentarios