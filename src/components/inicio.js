"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../styles/estilos_generales.css"

// Componente del modal de contacto
function ModalContacto({ mostrar, cerrar }) {
  // Si no se debe mostrar, no renderizar nada
  if (!mostrar) return null

  // Lista de integrantes del grupo
  const integrantes = [
    { nombre: "Josué Fernando Palma Zambrano", email: "e1316366937@live.uleam.edu.ec" },
    { nombre: "Yimmi Leonel Barberan Moreira", email: "e1351282171@live.uleam.edu.ec" },
    { nombre: "Marcelo Matias Nieto Medina", email: "e1315170934@live.uleam.edu.ec" },
  ]

  return (
    <div className={`modal ${mostrar ? "show" : ""}`} onClick={cerrar}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5>Integrantes del Grupo</h5>
          <button className="btn-close cerrar" onClick={cerrar}></button>
        </div>
        <div className="modal-body">
          <div className="contacto-lista">
            {integrantes.map((integrante, index) => (
              <div key={index} className="contacto-item">
                <strong>{integrante.nombre}</strong>
                <br />
                {integrante.email}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente principal de la página de inicio
function Inicio({ usuarioLogeado, cerrarSesion }) {
  // Estado para controlar si el modal está abierto
  const [modalAbierto, setModalAbierto] = useState(false)
  // Estado para almacenar todas las recetas (predeterminadas + personalizadas)
  const [recetas, setRecetas] = useState([])

  // Recetas predeterminadas
  const recetasPredeterminadas = [
    {
      titulo: "Pollo al horno",
      imagen: "https://polloseldorado.co/wp-content/uploads/2023/08/1.jpg",
      descripcion:
        "Jugoso pollo al horno con piel crujiente y dorada, sazonado con hierbas aromáticas y un toque de ajo. Una receta clásica, fácil de preparar, perfecta para una comida familiar o una cena especial. ¡Sabor casero que nunca falla!",
    },
    {
      titulo: "Ensalada César",
      imagen: "https://ariztia.com/wp-content/uploads/2023/11/ensalada-cesar-de-pollo.jpg",
      descripcion:
        "Ensalada César clásica con lechuga fresca, pollo a la parrilla, crutones crujientes y aderezo César cremoso. Ideal como plato principal o acompañamiento. ¡Una opción saludable y deliciosa!",
    },
    {
      titulo: "Espaguetis a la carbonara",
      imagen: "https://imag.bonviveur.com/espaguetis-a-la-carbonara-con-nata.jpg",
      descripcion:
        "Espaguetis al dente mezclados con una salsa cremosa de yema de huevo, queso parmesano y panceta crujiente. Un plato italiano clásico, fácil de preparar y lleno de sabor. Ideal para una cena rápida y deliciosa.",
    },
  ]

  // Cargar recetas al iniciar
  useEffect(() => {
    // Obtener recetas personalizadas del localStorage
    const recetasPersonalizadas = JSON.parse(localStorage.getItem("recetasPersonalizadas") || "[]")

    // Combinar TODAS las recetas: predeterminadas + personalizadas
    const todasLasRecetas = [...recetasPredeterminadas, ...recetasPersonalizadas]

    setRecetas(todasLasRecetas)
  }, [])

  return (
    <div className="pagina-inicio">
      {/* Encabezado de la página */}
      <header>
        <h1>🍳 La Hueca, recetario</h1>
        <nav>
          <ul>
            {/* Si no está logueado, mostrar botones de login y registro */}
            {!usuarioLogeado && (
              <>
                <li>
                  <Link to="/login">Iniciar Sesión</Link>
                </li>
                <li>
                  <Link to="/signup">Registrarse</Link>
                </li>
              </>
            )}

            {/* Si está logueado, mostrar botón de cerrar sesión */}
            {usuarioLogeado && (
              <li>
                <button onClick={cerrarSesion} className="logout-button">
                  Cerrar Sesión
                </button>
              </li>
            )}

            {/* Botón de contacto siempre visible */}
            <li>
              <button onClick={() => setModalAbierto(true)}>Contacto</button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Sección de bienvenida */}
        <section className="presentacion">
          <h2>Bienvenido a La Hueca</h2>
          <p>Descubre recetas deliciosas y fáciles de preparar.</p>
        </section>

        {/* Descripción del sitio */}
        <section className="descripcion-general">
          <p style={{ margin: "auto", color: "#5a4a3f", fontSize: "1.12em", textAlign: "center" }}>
            La Hueca es tu espacio culinario ideal para explorar, compartir y guardar recetas caseras. Aquí podrás
            encontrar platillos clásicos y modernos, desde opciones rápidas para el día a día hasta preparaciones
            especiales para sorprender.
          </p>
        </section>

        {/* Recetas destacadas - AHORA MUESTRA RECETAS PERSONALIZADAS */}
        <section className="recetas-destacadas">
          <h2>Recetas Destacadas</h2>
          <div className="recetas-grid">
            {recetas.map((receta, index) => (
              <article key={index} className="receta">
                <h3>{receta.titulo}</h3>
                <img src={receta.imagen || "/placeholder.svg"} alt={receta.titulo} />
                <p>{receta.descripcion}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Tarjetas de acciones - SOLO PARA USUARIOS LOGUEADOS */}
        {usuarioLogeado && (
          <section className="tarjetas">
            <div className="movimiento_tarjetas">
              {/* Enlace para subir recetas */}
              <Link className="tarjeta1" to="/subir-recetas">
                <div className="icono">🔖</div>
                <p>Sube recetas nuevas</p>
              </Link>

              {/* Enlace para buscar recetas */}
              <Link className="tarjeta2" to="/buscar">
                <div className="icono">🔍</div>
                <p>Busca tus recetas favoritas</p>
              </Link>

              {/* Enlace para comentarios - VA A LA NUEVA PÁGINA */}
              <Link className="tarjeta3" to="/comentarios">
                <div className="icono">💬</div>
                <p>Comenta recetas</p>
              </Link>
            </div>
          </section>
        )}

        {/* NUEVA SECCIÓN: Acceso rápido para usuarios no logueados */}
        {!usuarioLogeado && (
          <section
            className="acceso-invitado"
            style={{
              textAlign: "center",
              margin: "40px 0",
              padding: "30px",
              background: "#fff5e9",
              borderRadius: "12px",
              border: "1px solid #e6ccb2",
            }}
          >
            <h3 style={{ color: "#a97155", marginBottom: "20px" }}>¿Quieres hacer más?</h3>
            <p style={{ color: "#7c5e48", marginBottom: "25px" }}>
              Regístrate para subir tus propias recetas, comentar y guardar tus favoritas
            </p>
            <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                to="/signup"
                style={{
                  background: "#b08968",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  transition: "background-color 0.2s ease",
                }}
                onMouseOver={(e) => (e.target.style.background = "#7c5e48")}
                onMouseOut={(e) => (e.target.style.background = "#b08968")}
              >
                Registrarse Gratis
              </Link>
              <Link
                to="/buscar"
                style={{
                  background: "transparent",
                  color: "#b08968",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  border: "2px solid #b08968",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "#b08968"
                  e.target.style.color = "white"
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "transparent"
                  e.target.style.color = "#b08968"
                }}
              >
                Explorar Recetas
              </Link>
            </div>
          </section>
        )}
      </main>

      {/* Pie de página */}
      <footer>
        <p>© 2025 La Hueca. Todos los derechos reservados.</p>
      </footer>

      {/* Modal de contacto */}
      <ModalContacto mostrar={modalAbierto} cerrar={() => setModalAbierto(false)} />
    </div>
  )
}

export default Inicio
