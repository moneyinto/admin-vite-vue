import { App } from "vue";
import "@icon-park/vue-next/styles/index.css";
import {
    Home,
    MenuFold,
    MenuUnfold,
    ViewList,
    Workbench
} from "@icon-park/vue-next";
import {
    DEFAULT_ICON_CONFIGS,
    IconProvider
} from "@icon-park/vue-next/es/runtime";

export default {
    install(app: App) {
        IconProvider({ ...DEFAULT_ICON_CONFIGS, prefix: "icon" });
        app.component("MenuFold", MenuFold);
        app.component("MenuUnfold", MenuUnfold);
        app.component("Home", Home);
        app.component("Workbench", Workbench);
        app.component("ViewList", ViewList);
    }
};
