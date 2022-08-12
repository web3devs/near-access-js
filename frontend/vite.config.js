import {fileURLToPath, URL} from "node:url";
import {defineConfig} from "vite";
import GlobalPolyFill from "@esbuild-plugins/node-globals-polyfill";
import vue from "@vitejs/plugin-vue";
import {inject} from "vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: "globalThis",
            },
            plugins: [
                GlobalPolyFill({
                    process: true,
                    buffer: true,
                }),
            ],
        },
    },
});
