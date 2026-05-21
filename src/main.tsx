import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Находим элемент с id="root" в index.html и рендерим приложение
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {" "}
    {/* StrictMode - помощник для поиска проблем */}
    <App />
  </React.StrictMode>,
);
