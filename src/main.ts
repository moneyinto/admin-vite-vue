import { createApp, InjectionKey } from "vue";
import App from "./App.vue";
import router from "./routes";
import ElementPlus from "element-plus";
import Icon from "./plugins/icon";
import "./assets/css/global.scss";
import { State, store } from "./store";
import { Store } from "vuex";
import Directive from "./plugins/directives";

const key: InjectionKey<
    Store<State>
> = Symbol("");

const app = createApp(App);
app.config.globalProperties.$storeKey = key;
app.use(store, key);
app.use(Directive);
app.use(router);
app.use(ElementPlus, { size: "default" });
app.use(Icon);
app.mount("#app");
