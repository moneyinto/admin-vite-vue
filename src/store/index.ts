import { getCurrentInstance, InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import global, { GlobalStateType } from "./global";

export interface State {
    global: GlobalStateType;
}

export const store = createStore<State>({
    modules: {
        global
    },
    getters: {}
});

export const useStore = () => {
    const instance = getCurrentInstance();
    const key: InjectionKey<Store<State>> = instance?.appContext.config.globalProperties.$storeKey;
    return baseUseStore(key);
};
