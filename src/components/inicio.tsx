"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../styles/estilos_generales.css"

// Tipos para el modal de contacto
interface ModalContactoProps {
  mostrar: boolean
  cerrar: () => void
}

interface Integrante {
  nombre: string
  email: string
}

function ModalContacto({ mostrar, cerrar }: ModalContactoProps) {
  if (!mostrar) return null

  const integrantes: Integrante[] = [
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

// Tipos para las recetas
interface Receta {
  titulo: string
  imagen: string
  descripcion: string
}

// Props para el componente Inicio
interface InicioProps {
  usuarioLogeado: boolean
  cerrarSesion: () => void
}

function Inicio({ usuarioLogeado, cerrarSesion }: InicioProps) {
  const [modalAbierto, setModalAbierto] = useState<boolean>(false)
  const [recetas, setRecetas] = useState<Receta[]>([])

  const recetasPredeterminadas: Receta[] = [
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
  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const response = await fetch('https://688cda3acd9d22dda5ceb4b8.mockapi.io/api/recetas/Recetas')
        if (!response.ok) throw new Error('Error al obtener recetas')
          const data: Receta[] = await response.json()
        
        //Combinar con recetas personalizadas guardadas en localStorage
        const recetasPersonalizadas: Receta[] = JSON.parse(localStorage.getItem("recetasPersonalizadas") || "[]")
        setRecetas([...data, ...recetasPersonalizadas])
      } catch (error) {
        const recetasPersonalizadas: Receta[] = JSON.parse(localStorage.getItem("recetasPersonalizadas") || "[]")
        setRecetas([...recetasPredeterminadas, ...recetasPersonalizadas])
      }
    }
    fetchRecetas()
  }, [])

  return (
    <div className="pagina-inicio">
      <header>
        <h1>🍳 La Hueca, recetario</h1>
        <nav>
          <ul>
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

            {usuarioLogeado && (
              <li>
                <button onClick={cerrarSesion} className="logout-button">
                  Cerrar Sesión
                </button>
              </li>
            )}

            <li>
              <button onClick={() => setModalAbierto(true)}>Contacto</button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="presentacion">
          <h2>Bienvenido a La Hueca</h2>
          <p>Descubre recetas deliciosas y fáciles de preparar.</p>
        </section>

        <section className="descripcion-general">
          <p style={{ margin: "auto", color: "#5a4a3f", fontSize: "1.12em", textAlign: "center" }}>
            La Hueca es tu espacio culinario ideal para explorar, compartir y guardar recetas caseras. Aquí podrás
            encontrar platillos clásicos y modernos, desde opciones rápidas para el día a día hasta preparaciones
            especiales para sorprender.
          </p>
        </section>

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

        {usuarioLogeado && (
          <section className="tarjetas">
            <div className="movimiento_tarjetas">
              <Link className="tarjeta1" to="/subir-recetas">
                <div className="icono">🔖</div>
                <p>Sube recetas nuevas</p>
              </Link>

              <Link className="tarjeta2" to="/buscar">
                <div className="icono">🔍</div>
                <p>Busca tus recetas favoritas</p>
              </Link>

              <Link className="tarjeta3" to="/comentarios">
                <div className="icono">💬</div>
                <p>Comenta recetas</p>
              </Link>
            </div>
          </section>
        )}

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
                onMouseOver={(e) => (e.currentTarget.style.background = "#7c5e48")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#b08968")}
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
                  e.currentTarget.style.background = "#b08968"
                  e.currentTarget.style.color = "white"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = "#b08968"
                }}
              >
                Explorar Recetas
              </Link>
            </div>
          </section>
        )}
      </main>

      <footer>
        <p>© 2025 La Hueca. Todos los derechos reservados.</p>
      </footer>

      <ModalContacto mostrar={modalAbierto} cerrar={() => setModalAbierto(false)} />
    </div>
  )
}

export default Inicio
