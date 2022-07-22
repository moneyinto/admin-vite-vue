import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import ElementPlus from "element-plus";
import "./assets/css/global.scss";
import { key, store } from "./store";

const app = createApp(App);
app.use(store, key);
app.use(router);
app.use(ElementPlus, { size: "default" });
app.mount("#app");
