import * as path from "node:path";
import * as url from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const moduleDirname = path.dirname(url.fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: path.join(moduleDirname, "./jsx-scoped-css-reset"),
    }),
  ],
});
