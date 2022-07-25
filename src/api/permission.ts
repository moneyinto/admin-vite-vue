import { IMenuItem } from "@/types";
import { RequestFun } from "@/types/response";
import request from "@/utils/request";

export const getMenuList: RequestFun<null, IMenuItem[]> = () => {
    return request({
        url: "mock/api/user/menuList",
        method: "get"
    });
};
