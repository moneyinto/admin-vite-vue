import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ElNotification } from "element-plus";
import settings from "@/config/settings";
import { getToken } from "@/utils/storage";
import router from "@/routes";

export interface ResponseData {
    resultCode: number;
    success: boolean;
    resultDesc: string;
    result?: any;
    token?: string;
}

/**
 * 异常处理程序
 */
const errorHandler = (error: any) => {
    const { response } = error;
    if (!response) {
        ElNotification({
            type: "error",
            title: "网络异常",
            message: "您的网络发生异常，无法连接服务器"
        });
    }

    return Promise.reject(error);
};

/**
 * 配置request请求时的默认参数
 */
const request = axios.create({
    baseURL: (import.meta.env.APP_MOCK ? import.meta.env.VITE_APP_MOCK_APIHOST : import.meta.env.VITE_APP_APIHOST || "") as string,
    withCredentials: true, // 当跨域请求时发送cookie
    timeout: 15000 // 请求超时时间,5000(单位毫秒) / 0 不做限制
});

/**
 * 请求前
 * 请求拦截器
 */
request.interceptors.request.use(
    async (config: AxiosRequestConfig & { upload?: boolean }) => {
        // 如果设置了upload 说明是上传文件
        if (config["upload"] && config.headers) {
            config.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
        }

        // 自定义添加token header
        const headerToken = await getToken();
        if (headerToken && config.headers) {
            config.headers[settings.ajaxHeadersTokenKey] = headerToken;
        }

        return config;
    }
    /* error=> {} */ // 已在 export default catch
);

/**
 * 请求后
 * 响应拦截器
 */
request.interceptors.response.use(
    async (response: AxiosResponse) => {
        const res: ResponseData = response.data;

        if (res.resultCode !== 200) {
            ElNotification({
                type: "error",
                message: res.resultDesc
            });

            if (res.resultCode === 103) {
                router.replace("/login");
            }
        }

        return response;
    }
);

export default function <T>(config: AxiosRequestConfig): Promise<T> {
    return request(config)
        .then((response: AxiosResponse) => response.data)
        .catch((error) => errorHandler(error));
}
