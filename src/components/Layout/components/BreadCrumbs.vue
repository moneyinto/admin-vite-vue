<template>
    <div class="ma-bread-crumbs">
        <div class="ma-bread-crumbs-item" v-for="item in page.parent || []" :key="item.name">
            <span>{{ item.name }}</span>&nbsp;/&nbsp;
        </div>

        <div class="ma-bread-crumbs-item">
            {{ page.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { computed } from "vue";
import { useRoute } from "vue-router";
const store = useStore();
const route = useRoute();

const pageList = computed(() => store.state.global.permissionPageList);
const page = computed(() => {
    return pageList.value.find(item => item.path === route.path);
});
</script>

<style lang="scss" scoped>
.ma-bread-crumbs {
    display: flex;
    align-items: center;
    font-size: 14px;

    .ma-bread-crumbs-item {
        color: #888;
        span {
            // cursor: pointer;
            color: #333;
            &:hover {
                color: #409eff;
            }
        }
    }
}
</style>
