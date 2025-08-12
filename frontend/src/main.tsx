//Purpose: Mount React app, import Tailwind CSS, set up Router

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./store/auth";

import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        {/* BrowserRouter provides client-side routing */}
        <BrowserRouter>
          <App />
          <Toaster position="top-center" richColors closeButton />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
