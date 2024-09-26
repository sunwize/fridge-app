import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Icons({
            compiler: "vue3",
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@@": fileURLToPath(new URL("./", import.meta.url)),
        },
    },
});
