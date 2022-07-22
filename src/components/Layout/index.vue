<template>
    <div class="ma-layout">
        <Left />
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import Left from "./components/Left.vue";
</script>

<style lang="scss" scoped>
.ma-layout {
    display: flex;
}
</style>
