import { defineConfig, Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig(({ mode, command }) => {
    // 开发服务器端口
    const port: number = parseInt(process.env.APP_PORT || "8000");

    // 插件
    const plugins: (Plugin | Plugin[])[] = [
        vue(),
        eslintPlugin({
            include: ["src/**/*.js", "src/**/*.vue", "src/*.js", "src/*.vue"]
        })
    ];

    // vitePluginMock
    // mode === "development" &&
    //     process.env.APP_MOCK === "true" &&
    //     plugins.push(vitePluginMock());

    // @vitejs/plugin-legacy
    // command === "build" && plugins.push(legacy());

    return {
        base: "/",
        plugins,
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src")
            }
        },
        server: {
            host: true,
            port
        }
    };
});
