import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "css-homogenizer/reset-scoped/react",
    }),
  ],
});
