<template>
    <div class="ma-layout-right">
        <div class="ma-layout-header">
            <Nav />
            <Tab />
        </div>
        <div class="ma-layout-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import Nav from "./Nav.vue";
import Tab from "./Tab.vue";
</script>

<style lang="scss" scoped>
.ma-layout-right {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
}

.ma-layout-header {
    box-shadow: 0 -1px 4px #ccc;
    position: relative;
}

.ma-layout-content {
    flex: 1;
    min-height: 0;
    padding: 15px;
    overflow-y: auto;
    background: #f6f6f6;
}
</style>
