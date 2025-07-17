// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
    // load environment variables for current mode (dev, prod, etc.)
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [react(), tailwindcss()],
        define: {
            global: {}, 
            "process.env": env, 
        },
    };
});
