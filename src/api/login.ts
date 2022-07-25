import { IResponse, RequestFun } from "@/types/response";
import { ILoginData } from "@/types/user";
import request from "@/utils/request";

export const doLogin: RequestFun<ILoginData, string> = (data) => {
    return request({
        url: "mock/api/user/login",
        method: "post",
        data
    });
};
