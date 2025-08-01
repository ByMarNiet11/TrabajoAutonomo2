"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/estilos_generales.css"

// Recetas que vienen por defecto en la aplicación
const recetasPorDefecto = [
  {
    titulo: "Pollo al horno",
    ingredientes: "pollo, papas, ajo, sal",
    imagen: "https://polloseldorado.co/wp-content/uploads/2023/08/1.jpg",
    descripcion:
      "Jugoso pollo al horno con piel crujiente y dorada, sazonado con hierbas aromáticas y un toque de ajo. Una receta clásica, fácil de preparar, perfecta para una comida familiar o una cena especial. ¡Sabor casero que nunca falla!",
  },
  {
    titulo: "Ensalada César",
    ingredientes: "lechuga, pollo, queso parmesano, crutones",
    imagen: "https://ariztia.com/wp-content/uploads/2023/11/ensalada-cesar-de-pollo.jpg",
    descripcion:
      "Ensalada César clásica con lechuga fresca, pollo a la parrilla, crutones crujientes y aderezo César cremoso. Ideal como plato principal o acompañamiento. ¡Una opción saludable y deliciosa!",
  },
  {
    titulo: "Espaguetis a la carbonara",
    ingredientes: "espaguetis, huevo, queso, panceta",
    imagen: "https://imag.bonviveur.com/espaguetis-a-la-carbonara-con-nata.jpg",
    descripcion:
      "Espaguetis a la carbonara, un plato italiano clásico que combina pasta al dente con una salsa cremosa de huevo, queso parmesano y panceta crujiente. Rápido y fácil de preparar, perfecto para una cena deliciosa en casa.",
  },
]

// Función para obtener todas las recetas (por defecto + las que agregó el usuario)
function obtenerTodasLasRecetas() {
  const recetasPersonalizadas = JSON.parse(localStorage.getItem("recetasPersonalizadas")) || []
  return [...recetasPorDefecto, ...recetasPersonalizadas]
}

function BuscarRecetas() {
  // Estado para el texto de búsqueda
  const [textoBusqueda, setTextoBusqueda] = useState("")

  // Estado para los resultados de la búsqueda
  const [resultados, setResultados] = useState([])

  // Estado para saber si se debe mostrar el mensaje inicial
  const [mostrarMensajeInicial, setMostrarMensajeInicial] = useState(true)

  // Función que se ejecuta cuando el usuario hace clic en "Buscar"
  const buscarReceta = () => {
    // Si no escribió nada, no hacer nada
    if (!textoBusqueda.trim()) {
      return
    }

    // Obtener todas las recetas disponibles
    const todasLasRecetas = obtenerTodasLasRecetas()

    // ACTUALIZADO: Filtrar recetas que EMPIECEN con el texto de búsqueda (solo en el título)
    const recetasEncontradas = todasLasRecetas.filter((receta) => {
      const tituloCoincide = receta.titulo.toLowerCase().startsWith(textoBusqueda.toLowerCase())
      return tituloCoincide
    })

    // Actualizar los resultados y ocultar el mensaje inicial
    setResultados(recetasEncontradas)
    setMostrarMensajeInicial(false)
  }

  // Función que se ejecuta cuando el usuario presiona Enter en el campo de búsqueda
  const manejarEnter = (e) => {
    if (e.key === "Enter") {
      buscarReceta()
    }
  }

  return (
    <div className="buscar-recetas" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Encabezado */}
      <header>
        <h1>🍳 La Hueca, recetario</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Sección del buscador */}
        <section className="buscador">
          <input
            type="text"
            placeholder="Escribe el nombre de una receta"
            value={textoBusqueda}
            onChange={(e) => setTextoBusqueda(e.target.value)}
            onKeyPress={manejarEnter}
          />
          <button onClick={buscarReceta}>Buscar</button>
        </section>

        {/* Sección de resultados */}
        <section className="resultados" style={{ flex: 1 }}>
          {/* Mostrar mensaje inicial si no se ha buscado nada */}
          {mostrarMensajeInicial ? (
            <p style={{ textAlign: "center", color: "#7c5e48" }}>
              Escribe el nombre de una receta y haz clic en "Buscar".
            </p>
          ) : (
            // Mostrar resultados de la búsqueda
            <>
              {resultados.length > 0 ? (
                // Si hay resultados, mostrarlos
                resultados.map((receta, index) => (
                  <div className="receta" key={index}>
                    <h3>{receta.titulo}</h3>
                    <img src={receta.imagen || "/placeholder.svg"} alt={receta.titulo} />
                    <p>{receta.descripcion}</p>
                  </div>
                ))
              ) : (
                // Si no hay resultados, mostrar mensaje
                <p style={{ textAlign: "center", color: "#7c5e48" }}>
                  No se encontraron recetas que empiecen con "{textoBusqueda}". Intenta con otras palabras.
                </p>
              )}
            </>
          )}
        </section>
      </main>

      {/* Pie de página */}
      <footer>
        <p>© 2025 La Hueca. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default BuscarRecetas