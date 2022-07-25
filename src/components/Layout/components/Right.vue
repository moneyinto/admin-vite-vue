<template>
    <div class="ma-layout-right">
        <Nav />
        <BreadCrumbs />
        <div class="ma-layout-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import Nav from "./Nav.vue";
import BreadCrumbs from "./BreadCrumbs.vue";
</script>

<style lang="scss" scoped>
.ma-layout-right {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
}

.ma-layout-content {
    flex: 1;
    min-height: 0;
}
</style>
