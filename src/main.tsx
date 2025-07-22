import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import DarkModeContextProvider from "./context/DarkMode.tsx";
import { ToastProvider } from "./components/Toast.tsx";
import { ChatProvider } from "./context/Talk.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DarkModeContextProvider>
        <ToastProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </ToastProvider>
      </DarkModeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
