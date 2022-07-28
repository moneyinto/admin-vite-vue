<template>
    <div class="ma-layout-nav">
        <div class="ma-layout-nav-switch" @click="switchMenu()">
            <MenuFold v-if="isCollapse" />
            <MenuUnfold v-else />
        </div>
        <UserInfo />
    </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { computed } from "vue";
import UserInfo from "./UserInfo.vue";
const store = useStore();
const isCollapse = computed(() => store.state.global.collapsed);
const switchMenu = () => {
    store.commit("global/changeLayoutCollapsed", !isCollapse.value);
};
</script>

<style lang="scss" scoped>
.ma-layout-nav {
    display: flex;
    height: 50px;
    background-color: #222834;
    justify-content: space-between;
}

.ma-layout-nav-switch {
    display: flex;
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 20px;
    color: #c0c4cc;
    &:hover {
        color: #fff;
        background: #000c17;
    }
}
</style>
