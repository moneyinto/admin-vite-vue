<template>
    <div class="ma-user-info">
        <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                admin
                <ArrowDown />
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { removeToken } from "@/utils/storage";
import { useRouter } from "vue-router";

const router = useRouter();
const handleCommand = (command: string) => {
    switch (command) {
    case "logout": {
        removeToken();
        router.replace("/login");
        break;
    }
    }
};
</script>

<style lang="scss" scoped>
.ma-user-info {
    padding-right: 15px;
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .el-dropdown-link {
        color: #303133;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
}
</style>
