import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/global.css";

import {
  CartProvider,
} from "./context/CartContext";

import {
  UserProvider,
} from "./context/UserContext";

import {
  UIProvider,
} from "./context/UIContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <UserProvider>

      <UIProvider>

        <CartProvider>

          <App />

        </CartProvider>

      </UIProvider>

    </UserProvider>

  </React.StrictMode>
);