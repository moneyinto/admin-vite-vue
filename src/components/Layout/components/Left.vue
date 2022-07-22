<template>
    <div class="ma-layout-left" :class="{ collapsed: isCollapse }">
        <el-menu default-active="2" :collapse="isCollapse">
            <el-sub-menu index="2" popper-class="ma-layout-leftmenu-popper">
                <template #title>
                    <el-icon><location /></el-icon>
                    <span>Navigator On1</span>
                </template>
                <el-menu-item index="2-1">
                    <el-icon><icon-menu /></el-icon>
                    <template #title>Navigator Two</template>
                </el-menu-item>
                <el-menu-item index="4">
                    <el-icon><setting /></el-icon>
                    <template #title>Navigator Four</template>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import {
    Menu as IconMenu,
    Location,
    Setting
} from "@element-plus/icons-vue";
import { computed } from "vue";
import { useStore } from "@/store";
const store = useStore();
const isCollapse = computed(() => store.state.global.collapsed);
</script>

<style lang="scss">
.ma-layout-left {
    width: 200px;
    height: 100vh;
    transition-duration: 0.1s;
    background-color: #222834;

    &.collapsed {
        width: 63px;
    }

    .el-menu--vertical {
        background-color: #222834;
        &:not(.el-menu--collapse) {
            width: 200px;
            min-height: 400px;
        }
    }

    .el-sub-menu {
        .el-sub-menu__title {
            color: rgba(255, 255, 255, 0.7);
            .el-icon {
                color: rgba(255, 255, 255, 0.7);
            }
        }
        .el-menu {
            background-color: #000c17;
        }
    }

    .el-sub-menu__title {
        &:hover {
            background: none;
        }
    }

    .is-active > .el-sub-menu__title {
        color: #fff !important;
    }

    .el-menu-item {
        color: rgba(255, 255, 255, 0.7);
        &.is-active {
            background: #409eff !important;
            color: #fff;
        }
        &:hover {
            color: #fff !important;
            background: none;
        }
    }
}

.ma-layout-leftmenu-popper {
    .el-menu {
        background-color: #000c17;
    }

    .el-sub-menu__title {
        &:hover {
            background: none;
        }
    }

    .is-active > .el-sub-menu__title {
        color: #fff !important;
    }

    .el-menu-item {
        color: rgba(255, 255, 255, 0.7);

        &.is-active {
            background: #409eff !important;
            color: #fff;
        }

        &:hover {
            color: #fff !important;
            background: none;
        }
    }
}
</style>
