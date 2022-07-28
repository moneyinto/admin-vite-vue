<template>
    <div class="ma-page-tab">
        <div
            class="ma-page-tab-item"
            :class="item.path === route.path && 'active'"
            v-for="item in pageTab"
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
const pageTab = computed(() => store.state.global.pageTab);

const go = (path: string) => {
    router.push(path);
};

const close = (path: string) => {
    const pageTabBack = pageTab.value;
    const i = pageTabBack.findIndex(item => item.path === path);
    const dropPage = pageTabBack.splice(i, 1);
    store.commit("global/updatePageTab", pageTabBack);
    if (dropPage[0].path === route.path) {
        // 删除面包屑为当前页面，需要进行页面跳转
        const page = pageTabBack[pageTabBack.length - 1];
        setTimeout(() => router.push(page.path));
    }
};
</script>

<style lang="scss" scoped>
.ma-page-tab {
    height: 36px;
    padding: 4px 15px 0;
    background: #f6f6f6;
    display: flex;
}

.ma-page-tab-item {
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
