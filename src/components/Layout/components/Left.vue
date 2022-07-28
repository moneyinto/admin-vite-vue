<template>
    <div class="ma-layout-left" :class="{ collapsed: !isCollapse }">
        <div class="ma-layout-logo">
            <router-link to="/" class="logo-url">
                <img class="logo" v-if="!isCollapse" src="@/assets/vue.svg" />
                <h3 v-else class="logo-title">AdminElementVue</h3>
            </router-link>
        </div>
        <el-menu router :default-active="route.path" :collapse="!isCollapse">
            <el-sub-menu
                v-for="item in menuList"
                :key="item.name"
                :index="item.path || ''"
                popper-class="ma-layout-leftmenu-popper"
            >
                <template #title>
                    <component size="16px" :is="item.icon" /> &nbsp;
                    <span>{{ item.name }}</span>
                </template>
                <el-menu-item
                    v-for="subItem in item.children || []"
                    :key="subItem.name"
                    :index="subItem.path"
                >
                    <component size="16px" :is="subItem.icon" /> &nbsp;
                    <template #title>{{ subItem.name }}</template>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
const store = useStore();
const isCollapse = computed(() => store.state.global.collapsed);
const menuList = computed(() => store.state.global.menuList);
const route = useRoute();
</script>

<style lang="scss">
.ma-layout-left {
    width: 200px;
    height: 100vh;
    transition-duration: 0.6s;
    background-color: #222834;
    overflow-x: hidden;

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

    .el-menu {
        border: none !important;
    }

    .el-sub-menu {
        .el-sub-menu__title {
            color: rgba(255, 255, 255, 0.7);
            .i-icon {
                // font-size: 16px;
                margin-left: 3px;
                width: 16px;
                height: 16px;
                visibility: visible;
                overflow: initial;
                color: rgba(255, 255, 255, 0.7) !important;
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

.ma-layout-logo {
    height: 50px;
    line-height: 50px;
    text-align: center;
    vertical-align: middle;
    .logo-url {
        display: inline-block;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .logo-title {
        display: inline-block;
        margin: 0;
        font-size: 16px;
        color: #c0c4cc;
    }
    .logo {
        display: block;
        width: 20px;
        margin: 15px auto;
    }
}
</style>
