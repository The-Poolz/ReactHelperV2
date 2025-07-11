import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "ReactHelperV2",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "wagmi",
        "viem",
        "@tanstack/react-query"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          wagmi: "wagmi",
          viem: "viem",
          "@tanstack/react-query": "ReactQuery"
        }
      }
    },
    outDir: "dist",
    sourcemap: true,
    emptyOutDir: true
  }
});
