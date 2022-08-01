import { getMenuList } from "@/api/permission";
import { IMenuItem } from "@/types";
import { dealMenuListForPageList } from "@/utils/permission";
import { Action, Mutation } from "vuex";
import { State } from ".";

export interface GlobalStateType {
    // 左侧展开收起
    collapsed: boolean;
    // 菜单列表
    menuList: IMenuItem[];
    // 界面权限
    permissionPageList: IMenuItem[];
    // 页面tab
    pageTab: IMenuItem[];
    // 功能权限
    permissionFuncs: string[];
}

interface ModuleType {
    namespaced: boolean;
    name: string;
    state: GlobalStateType;
    mutations: {
        changeLayoutCollapsed: Mutation<GlobalStateType>;
        updateMenuList: Mutation<GlobalStateType>;
        updatePermissionPageList: Mutation<GlobalStateType>;
        updatePageTab: Mutation<GlobalStateType>;
        updatePermissionFuncs: Mutation<GlobalStateType>;
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
        permissionPageList: [],
        permissionFuncs: [],
        pageTab: [
            {
                name: "工作台",
                path: "/workplace"
            }
        ]
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
        },
        updatePageTab(state, payload) {
            state.pageTab = payload;
        },
        updatePermissionFuncs(state, payload) {
            state.permissionFuncs = payload;
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
