import { useStore } from "@/store";
import { getToken } from "@/utils/storage";
import { computed } from "vue";
import { useRouter } from "vue-router";

// 访问页面白名单
const whiteList = ["/login", "/404"];

export default () => {
    const router = useRouter();
    const store = useStore();
    const pageList = computed(() => store.state.global.permissionPageList);
    const pageTab = computed(() => store.state.global.pageTab);
    router.beforeEach(async (to, from, next) => {
        // 白名单界面放行
        if (whiteList.indexOf(to.path) > -1) return next();
        const token = await getToken();
        if (!token) router.replace("/login");
        if (pageList.value.length === 0) {
            // 列表为空，默认没有请求
            await store.dispatch("global/getMenuList");
        }
        if (pageList.value.findIndex(item => item.path === to.path) > -1) {
            if (pageTab.value.findIndex(item => item.path === to.path) === -1) {
                const page = pageList.value.find(item => item.path === to.path);
                if (page) {
                    store.commit("global/updatePageTab", [...pageTab.value, page]);
                }
            }
            return next();
        }
        next("/404");
    });
};
