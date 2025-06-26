import { Buffer as NodeBuffer } from "buffer";
import React from "react";
import ReactDOM from "react-dom/client";
import { PoolzProvider } from "../../src/PoolzProvider";
import App from "./App.tsx";

import "./index.css";

declare global {
  // Expose Buffer on the window object for web3 libraries
  // that rely on a Node-style global Buffer.
  // eslint-disable-next-line no-var
  var Buffer: typeof NodeBuffer;
}

globalThis.Buffer = NodeBuffer;

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}
ReactDOM.createRoot(rootElement).render(
  <PoolzProvider>
    <App />
  </PoolzProvider>,
);
