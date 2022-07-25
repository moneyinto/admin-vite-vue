import { getMenuList } from "@/api/permission";
import { IMenuItem } from "@/types";
import { dealMenuListForPageList } from "@/utils/permission";
import { Action, Mutation } from "vuex";
import { State } from ".";

export interface GlobalStateType {
    // 左侧展开收起
    collapsed: boolean;
    // 菜单列表
    menuList: IMenuItem[],
    // 界面权限
    permissionPageList: string[]
}

interface ModuleType {
    namespaced: boolean;
    name: string;
    state: GlobalStateType;
    mutations: {
        changeLayoutCollapsed: Mutation<GlobalStateType>;
        updateMenuList: Mutation<GlobalStateType>;
        updatePermissionPageList: Mutation<GlobalStateType>;
    };
    actions: {
        getMenuList: Action<GlobalStateType, State>
    };
}

const StoreModel: ModuleType = {
    namespaced: true,
    name: "global",
    state: {
        collapsed: true,
        menuList: [],
        permissionPageList: []
    },
    mutations: {
        changeLayoutCollapsed(state, payload) {
            state.collapsed = payload;
        },
        updateMenuList(state, payload) {
            state.menuList = payload;
        },
        updatePermissionPageList(state, payload) {
            state.permissionPageList = payload;
        }
    },
    actions: {
        async getMenuList({ commit }) {
            const res = await getMenuList();
            commit("updateMenuList", res.result);
            const pagePermissionList = dealMenuListForPageList(res.result);
            commit("updatePermissionPageList", pagePermissionList);
        }
    }
};

export default StoreModel;
