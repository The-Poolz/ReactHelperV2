import { Buffer } from "buffer";
import React from "react";
import ReactDOM from "react-dom/client";
import { PoolzProvider } from "../../src/PoolzProvider";
import App from "./App.tsx";

import "./index.css";

globalThis.Buffer = Buffer;

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}
ReactDOM.createRoot(rootElement).render(
  <PoolzProvider>
    <App />
  </PoolzProvider>,
);
