<template>
    <div class="login-container">
        <div class="login-content">
            <div class="login-text">云平台登录</div>
            <div class="login-content-main">
                <el-form class="login-content-form">
                    <el-form-item>
                        <el-autocomplete
                            type="text"
                            ref="account"
                            class="inline-username"
                            placeholder="账号"
                            v-model="formState.account"
                            :fetch-suggestions="querySearch"
                            @focus="isFocus = true"
                            @blur="isFocus = false"
                            @select="handleSelect"
                            autocomplete="off"
                        >
                            <template #prefix>
                                <img
                                    src="@/assets/images/login/icon_account.png"
                                    alt=""
                                />
                            </template>
                            <template #suffix>
                                <img
                                    v-if="isFocus"
                                    src="@/assets/images/login/arrow_up_account.png"
                                    alt=""
                                />
                                <img
                                    v-else
                                    src="@/assets/images/login/arrow_down_account.png"
                                    alt=""
                                />
                            </template>
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item>
                        <el-input
                            type="text"
                            ref="password"
                            class="inline-password pwd"
                            placeholder="密码"
                            v-model="formState.password"
                            autocomplete="off"
                        >
                            <template #prefix>
                                <img
                                    src="@/assets/images/login/icon_password.png"
                                    alt=""
                                />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            class="login-content-submit"
                            round
                            @click="onSignIn"
                            :loading="loading"
                        >
                            <span>登 录</span>
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { doLogin } from "@/api/login";
import { IAccountItem, IRestaurant } from "@/types/user";
import { ElMessage } from "element-plus";
import { get, set, setToken, STORAGE_TYPES } from "@/utils/storage";
import { useRouter } from "vue-router";

const isFocus = ref(false);
const loading = ref(false);
const router = useRouter();
const formState = reactive({
    account: "",
    password: ""
});

// 账号相关
const querySearch = async (queryString: string, cb: any) => {
    const accountList: IAccountItem[] = await get(STORAGE_TYPES.RECORD_LOGIN_LIST) || [];
    const restaurant: IRestaurant[] = accountList.map((item) => {
        return {
            value: item.account,
            password: item.password
        };
    });
    const results = queryString
        ? restaurant.filter(createFilter(queryString))
        : restaurant;
    cb(results);
};

const createFilter = (queryString: string) => {
    return (restaurant: IRestaurant) => {
        return (
            restaurant.value
                .toLowerCase()
                .indexOf(queryString.toLowerCase()) === 0
        );
    };
};

const handleSelect = (restaurant: IRestaurant) => {
    formState.account = restaurant.value;
    formState.password = restaurant.password;
};

const onSignIn = async () => {
    if (formState.account === "") {
        return ElMessage.warning("请输入账号");
    }

    if (formState.password === "") {
        return ElMessage.warning("请输入密码");
    }
    loading.value = true;
    const response = await doLogin({
        account: formState.account,
        pwd: formState.password
    });
    loading.value = false;
    if (response.resultCode === 200) {
        const recordAccountList = await get(STORAGE_TYPES.RECORD_LOGIN_LIST) || [];
        console.log(recordAccountList);
        const index = recordAccountList.findIndex((record: IAccountItem) => {
            return record.account === formState.account;
        });
        if (index > -1) {
            recordAccountList[index] = formState;
        } else {
            recordAccountList.push(formState);
        }
        set(STORAGE_TYPES.RECORD_LOGIN_LIST, recordAccountList);
        setToken(response.result);
        router.replace("/");
    }
};
</script>

<style scoped lang="scss">
.login-container {
    width: 100%;
    height: 100vh;
    background: url("@/assets/images/login/bg_login.png") no-repeat;
    background-size: 100% 100%;
    .pwd {
        -webkit-text-security: disc;
    }
    .login-content {
        width: 420px;
        height: 420px;
        padding: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) translate3d(0, 0, 0);
        background-color: rgba(255, 255, 255, 0.99);
        border-radius: 8px;
        box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.16);
        transition: height 0.2s linear;
        overflow: hidden;
        z-index: 1;
        .login-text {
            padding: 40px 15px 15px;
            text-align: center;
            font-size: 24px;
            font-weight: 600;
        }
        .login-content-main {
            margin: 0 auto;
            width: 80%;
        }
    }
}

.login-content-form {
    margin-top: 20px;
    ::v-deep(.el-form-item) {
        margin-bottom: 20px;
    }
    ::v-deep(.el-autocomplete) {
        width: 300px;
        height: 44px;
        line-height: 44px;
    }
    ::v-deep(.el-input__wrapper) {
        width: 300px;
        height: 44px;
        line-height: 44px;
        background: #f3f3f4;
        border: none;
        border-radius: 8px;
        &::placeholder {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: var(--color-placeholder);
        }
    }
    ::v-deep(.el-input__prefix) {
        display: flex;
        align-items: center;
        left: 10px;
    }
    ::v-deep(.el-input__suffix) {
        width: 25px;
        display: flex;
        align-items: center;
    }
    .inline-password {
        ::v-deep(.el-input__suffix) {
            margin-right: 5px;
        }
    }
    .login-content-password {
        width: 25px;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
            color: #909399;
        }
    }
    .login-content-submit {
        width: 100%;
        height: 44px;
        background: #008dff;
        letter-spacing: 2px;
        font-weight: 300;
        margin-top: 28px;
        border-radius: 8px;
    }
}
</style>
