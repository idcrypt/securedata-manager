// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./style.css";

// Pastikan elemen root tersedia sebelum render
const container = document.getElementById("root");

if (!container) {
  console.error("❌ Root element not found. Check your index.html structure!");
} else {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
