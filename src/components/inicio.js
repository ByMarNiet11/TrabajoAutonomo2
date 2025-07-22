// src/components/inicio.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/estilos_generales.css";

// Modal contacto
function ModalContacto({ show, onClose }) {
  if (!show) return null;

  return (
    <div className={`modal ${show ? 'show' : ''}`} id="modalContacto" tabIndex="-1" aria-labelledby="modalContactoLabel" aria-hidden="true" onClick={onClose}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5 className="modal-title" id="modalContactoLabel">Integrantes del Grupo</h5>
          <button type="button" className="btn-close cerrar" onClick={onClose} aria-label="Cerrar"></button>
        </div>
        <div className="modal-body">
          <div className="contacto-lista">
            <div className="contacto-item">
              <strong>Josué Fernando Palma Zambrano</strong><br />
              e1316366937@live.uleam.edu.ec
            </div>
            <div className="contacto-item">
              <strong>Yimmi Leonel Barberan Moreira</strong><br />
              e1351282171@live.uleam.edu.ec
            </div>
            <div className="contacto-item">
              <strong>Marcelo Matias Nieto Medina</strong><br />
              e1315170934@live.uleam.edu.ec
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Inicio({ usuarioLogeado, cerrarSesion }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="pagina-inicio">
      <header>
        <h1>🍳 La Hueca, recetario</h1>
        <nav>
          <ul>
            {!usuarioLogeado && (
              <>
                <li><Link to="/login">Iniciar Sesión</Link></li>
                <li><Link to="/signup">Registrarse</Link></li>
              </>
            )}
            {usuarioLogeado && (
              <li>
                <button onClick={cerrarSesion} className="logout-button">
                  Cerrar Sesión
                </button>
              </li>
            )}
            <li><a href="#contacto" onClick={handleOpenModal}>Contacto</a></li>
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
            <div className="movimiento_tarjetas">
              <Link className="tarjeta1" to="/subir_recetas">
                <div className="icono">🔖</div>
                <p>Sube recetas nuevas</p>
              </Link>
              <Link className="tarjeta2" to="/buscar">
                <div className="icono">🔍</div>
                <p>Busca tus recetas favoritas</p>
              </Link>
              <Link className="tarjeta3" to="/comentarios">
                <div className="icono">💬</div>
                <p>Comenta</p>
              </Link>
            </div>
          </section>
        )}
      </main>

      <footer>
        <p>© 2025 La Hueca. Todos los derechos reservados.</p>
      </footer>
      
      {/* Modal */}
      <ModalContacto show={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default Inicio;