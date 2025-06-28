import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import DarkModeContextProvider from "./context/DarkMode.tsx";
import { ToastProvider } from "./components/Toast.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DarkModeContextProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </DarkModeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
