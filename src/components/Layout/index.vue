<template>
    <div class="ma-layout">
        <Left />
        <Right />
    </div>
</template>

<script setup lang="ts">
import Left from "./components/Left.vue";
import Right from "./components/Right.vue";
</script>

<style lang="scss" scoped>
.ma-layout {
    display: flex;
}
</style>
