import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import global, { GlobalStateType } from "./global";

export interface State {
    global: GlobalStateType;
}

export const key: InjectionKey<
    Store<State>
> = Symbol("");

export const store = createStore<State>({
    modules: {
        global
    },
    getters: {}
});

export const useStore = () => baseUseStore(key);
