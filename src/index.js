// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/pagina_inicio.css";

const root = createRoot(document.getElementById("root"));
root.render(React.createElement(App));
