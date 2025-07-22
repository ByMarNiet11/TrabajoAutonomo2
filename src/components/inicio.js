// src/components/index.js

import React from "react";
import { Link } from "react-router-dom";
import "../styles/estilos_generales.css";

function Inicio({ usuarioLogeado, cerrarSesion }) {
  return (
    <div className="pagina-inicio">
      <header>
        <h1>🍳 La Hueca, recetario</h1>
        <nav>
          <ul>
            {!usuarioLogeado && (
              <>
                <li><a href="#login">Iniciar Sesión</a></li>
                <li><a href="#signup">Registrarse</a></li>
              </>
            )}
            {usuarioLogeado && (
              <li>
                <button onClick={cerrarSesion}>Cerrar Sesión</button>
              </li>
            )}
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="presentacion">
          <h2>Bienvenido a La Hueca</h2>
          <p>Descubre recetas deliciosas y fáciles de preparar.</p>
        </section>

        <section className="descripcion-general">
          <p
            style={{
              margin: "auto",
              color: "#5a4a3f",
              fontSize: "1.12em",
              textAlign: "center",
            }}
          >
            La Hueca es tu espacio culinario ideal para explorar, compartir y
            guardar recetas caseras. Aquí podrás encontrar platillos clásicos y
            modernos, desde opciones rápidas para el día a día hasta
            preparaciones especiales para sorprender.
          </p>
          <br />
        </section>

        <section className="recetas-destacadas">
          <h2>Recetas Destacadas</h2>
          <div className="recetas-grid">
            <article className="receta">
              <h3>Pollo al horno</h3>
              <img
                src="https://polloseldorado.co/wp-content/uploads/2023/08/1.jpg"
                alt="Receta 1"
              />
              <p>
                Jugoso pollo al horno con piel crujiente y dorada, sazonado con
                hierbas aromáticas y un toque de ajo. Una receta clásica, fácil
                de preparar, perfecta para una comida familiar o una cena
                especial. ¡Sabor casero que nunca falla!
              </p>
            </article>
            <article className="receta">
              <h3>Ensalada César</h3>
              <img
                src="https://ariztia.com/wp-content/uploads/2023/11/ensalada-cesar-de-pollo.jpg"
                alt="Receta 2"
              />
              <p>
                Ensalada César clásica con lechuga fresca, pollo a la parrilla,
                crutones crujientes y aderezo César cremoso. Ideal como plato
                principal o acompañamiento. ¡Una opción saludable y deliciosa!
              </p>
            </article>
            <article className="receta">
              <h3>Espaguetis a la carbonara</h3>
              <img
                src="https://imag.bonviveur.com/espaguetis-a-la-carbonara-con-nata.jpg"
                alt="Receta 3"
              />
              <p>
                Espaguetis al dente mezclados con una salsa cremosa de yema de
                huevo, queso parmesano y panceta crujiente. Un plato italiano
                clásico, fácil de preparar y lleno de sabor. Ideal para una cena
                rápida y deliciosa.
              </p>
            </article>
          </div>
        </section>

        {usuarioLogeado && (
          <section className="tarjetas" id="seccionTarjetas">
            <h3>Acciones disponibles</h3>
            <div className="movimiento_tarjetas">
              <Link className="tarjeta1" to="/subir_recetas">
                <div className="icono">🍽️</div>
                <p>Subir receta</p>
              </Link>
              <Link className="tarjeta2" to="/buscar">
                <div className="icono">📖</div>
                <p>Mis recetas</p>
              </Link>
              <Link className="tarjeta3" to="/editar_perfil">
                <div className="icono">📝</div>
                <p>Editar perfil</p>
              </Link>
            </div>
          </section>
        )}
      </main>

      <footer>
        <p>© 2025 La Hueca. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Inicio;
