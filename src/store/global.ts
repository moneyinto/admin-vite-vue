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
    permissionPageList: string[];
    // 面包屑
    breadCrumbs: IMenuItem[];
}

interface ModuleType {
    namespaced: boolean;
    name: string;
    state: GlobalStateType;
    mutations: {
        changeLayoutCollapsed: Mutation<GlobalStateType>;
        updateMenuList: Mutation<GlobalStateType>;
        updatePermissionPageList: Mutation<GlobalStateType>;
        updateBreadCrumbs: Mutation<GlobalStateType>;
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
        breadCrumbs: [
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
        updateBreadCrumbs(state, payload) {
            state.breadCrumbs = payload;
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
