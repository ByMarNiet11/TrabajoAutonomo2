// src/components/buscar.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const recetasDefault = [
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
    imagen:
      "https://ariztia.com/wp-content/uploads/2023/11/ensalada-cesar-de-pollo.jpg",
    descripcion:
      "Ensalada César clásica con lechuga fresca, pollo a la parrilla, crutones crujientes y aderezo César cremoso. Ideal como plato principal o acompañamiento. ¡Una opción saludable y deliciosa!",
  },
  {
    titulo: "Espaguetis a la carbonara",
    ingredientes: "espaguetis, huevo, queso, panceta",
    imagen:
      "https://imag.bonviveur.com/espaguetis-a-la-carbonara-con-nata.jpg",
    descripcion:
      "Espaguetis a la carbonara, un plato italiano clásico que combina pasta al dente con una salsa cremosa de huevo, queso parmesano y panceta crujiente. Rápido y fácil de preparar, perfecto para una cena deliciosa en casa.",
  },
];

function obtenerTodasLasRecetas() {
  const recetasPersonalizadas = JSON.parse(localStorage.getItem("recetasPersonalizadas")) || [];
  return [...recetasDefault, ...recetasPersonalizadas];
}

function BuscarRecetas() {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [mensajeInicial, setMensajeInicial] = useState(true);

  useEffect(() => {
    setMensajeInicial(true);
  }, []);

  const buscarReceta = () => {
    const todasLasRecetas = obtenerTodasLasRecetas();
    const resultadoFiltrado = todasLasRecetas.filter((receta) =>
      receta.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      receta.ingredientes.toLowerCase().includes(busqueda.toLowerCase())
    );
    setResultados(resultadoFiltrado);
    setMensajeInicial(false);
  };

  return (
    <div className="buscar-recetas">
      <header>
        <h1>🍳 La Hueca, recetario</h1>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="buscador">
          <input
            type="text"
            placeholder="Escribe un ingrediente o receta"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button onClick={buscarReceta}>Buscar</button>
        </section>

        <section className="resultados">
          {mensajeInicial ? (
            <p style={{ textAlign: "center", color: "#7c5e48" }}>
              Escribe algo en el buscador para encontrar recetas, o busca por ingrediente.
            </p>
          ) : resultados.length > 0 ? (
            resultados.map((receta, index) => (
              <div className="receta" key={index}>
                <h3>{receta.titulo}</h3>
                <img src={receta.imagen} alt={receta.titulo} />
                <p><strong>Ingredientes:</strong> {receta.ingredientes}</p>
                <p>{receta.descripcion}</p>
              </div>
            ))
          ) : (
            <p>No se encontraron recetas.</p>
          )}
        </section>
      </main>

      <footer>
        <p>© 2025 La Hueca. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default BuscarRecetas;
