<template>
    <router-view></router-view>
</template>

<script setup lang="ts">
import usePermission from "@/hooks/usePermission";
usePermission();
</script>
