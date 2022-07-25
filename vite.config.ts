import { defineConfig, Plugin, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import eslintPlugin from "vite-plugin-eslint";
import { viteMockServe } from "vite-plugin-mock";

export default defineConfig(({ mode, command }) => {
    // 开发服务器端口
    const port: number = parseInt(process.env.APP_PORT || "8000");

    // 插件
    const plugins: (Plugin | Plugin[])[] = [
        vue(),
        eslintPlugin({
            include: ["src/**/*.ts", "src/**/*.vue", "src/*.js", "src/*.vue"]
        })
    ];

    const env = loadEnv(mode, process.cwd());
    // vitePluginMock
    mode === "development" &&
        env.VITE_APP_MOCK === "true" &&
        plugins.push(
            viteMockServe({
                ignore: /^\_/,
                mockPath: "./mocks",
                localEnabled: true,
                // injectCode: `import { setupProdMockServer } from './mocks';setupProdMockServer();`
            })
        );

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
