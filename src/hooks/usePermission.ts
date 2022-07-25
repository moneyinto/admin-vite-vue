import { useStore } from "@/store";
import { getToken } from "@/utils/storage";
import { computed } from "vue";
import { useRouter } from "vue-router";

// 访问页面白名单
const whiteList = ["/login", "/404"];

export default () => {
    const router = useRouter();
    const store = useStore();
    router.beforeEach(async (to, from, next) => {
        console.log(to);
        const pageList = computed(() => store.state.global.permissionPageList);
        // 白名单界面放行
        if (whiteList.indexOf(to.path) > -1) return next();
        const token = await getToken();
        if (!token) router.replace("/login");
        if (pageList.value.length === 0) {
            // 列表为空，默认没有请求
            await store.dispatch("global/getMenuList");
        }
        if (pageList.value.indexOf(to.path) > -1) return next();
        next("/404");
    });
};
