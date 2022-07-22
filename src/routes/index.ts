import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/workplace",
        component: () => import("@/components/Layout/index.vue"),
        children: [
            {
                name: "workplace",
                path: "/workplace",
                component: () => import("@/views/workplace/index.vue")
            }
        ]
    },
    {
        path: "/login",
        component: () => import("@/views/login/index.vue")
    }
];

const router = createRouter({
    scrollBehavior() {
        return { top: 0 };
    },
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: routes
});

router.beforeEach(() => {
    NProgress.start();
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
