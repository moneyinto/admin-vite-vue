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
            },
            {
                name: "doc",
                path: "/doc",
                component: () => import("@/views/doc/index.vue")
            }
        ]
    },
    {
        path: "/login",
        component: () => import("@/views/login/index.vue")
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@/components/Error/404.vue")
    }
];

const router = createRouter({
    scrollBehavior() {
        return { top: 0 };
    },
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach(() => {
    NProgress.start();
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
