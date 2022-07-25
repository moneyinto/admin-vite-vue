<template>
    <el-config-provider>
        <router-view></router-view>
    </el-config-provider>
</template>

<script setup lang="ts">
import usePermission from "@/hooks/usePermission";
usePermission();
</script>
