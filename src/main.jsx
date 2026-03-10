// 🔑 This is the ENTRY POINT of your React app.
// It finds the <div id="root"> in index.html and mounts the whole app inside it.
// You will rarely need to touch this file.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";   // Your global CSS (your style.css content goes here)
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
