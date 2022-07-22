import { Mutation } from "vuex";

export interface GlobalStateType {
    // 左侧展开收起
    collapsed: boolean;
}

interface ModuleType {
    namespaced: boolean;
    name: string;
    state: GlobalStateType;
    mutations: {
        changeLayoutCollapsed: Mutation<GlobalStateType>;
    };
    actions: {};
}

const StoreModel: ModuleType = {
    namespaced: true,
    name: "global",
    state: {
        collapsed: false
    },
    mutations: {
        changeLayoutCollapsed(state, payload) {
            state.collapsed = payload;
        }
    },
    actions: {}
};

export default StoreModel;
