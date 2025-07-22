import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const listEnv = [
  "API_DEV",
  "ADMIN_KEY",
  "GOOGLE_API_KEY",
  "GOOGLE_MODEL",
  "CORE_DATA",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv = {};
  listEnv.forEach(
    (key) => ((processEnv as Record<string, string>)[key] = env[key])
  );

  return {
    define: {
      "process.env": processEnv,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [react()],
  };
});
