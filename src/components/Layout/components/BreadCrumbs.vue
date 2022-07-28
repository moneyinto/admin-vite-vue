<template>
    <div class="ma-bread-crumbs">
        <div
            class="ma-bread-crumbs-item"
            :class="item.path === route.path && 'active'"
            v-for="item in breadCrumbs"
            :key="item.path"
            @click="go(item.path)"
        >
            {{ item.name }}
            <span v-if="noClose.indexOf(item.path) === -1">
                &nbsp;<CloseSmall @click="close(item.path)" />
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const store = useStore();
const route = useRoute();
const router = useRouter();

const noClose = ["/workplace"];
const breadCrumbs = computed(() => store.state.global.breadCrumbs);

const go = (path: string) => {
    router.push(path);
};

const close = (path: string) => {
    const breadCrumbsBack = breadCrumbs.value;
    const i = breadCrumbsBack.findIndex(item => item.path === path);
    const dropPage = breadCrumbsBack.splice(i, 1);
    store.commit("global/updateBreadCrumbs", breadCrumbsBack);
    if (dropPage[0].path === route.path) {
        // 删除面包屑为当前页面，需要进行页面跳转
        const page = breadCrumbsBack[breadCrumbsBack.length - 1];
        setTimeout(() => router.push(page.path));
    }
};
</script>

<style lang="scss" scoped>
.ma-bread-crumbs {
    height: 36px;
    padding: 4px 15px 0;
    background: #f6f6f6;
    box-shadow: 0 -1px 4px rgb(0 21 41 / 8%);
    display: flex;
}

.ma-bread-crumbs-item {
    height: 32px;
    padding: 2px 15px;
    background-color: #fff;
    font-size: 14px;
    color: #444;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 5px;
    span {
        color: #444;
    }
    &.active {
        color: #409eff;
    }
}
</style>
