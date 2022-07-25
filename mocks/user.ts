import { auth, baseURL, menuList } from ".";
import { MockMethod } from "vite-plugin-mock";

export default [
    {
        url: baseURL + "api/user/login",
        method: "post",
        statusCode: 200,
        response: (req) => {
            const { account, pwd } = req.body;
            if (account === "admin" && pwd === "123456") {
                return {
                    resultCode: 200,
                    success: true,
                    result: "vite_mock_token"
                };
            } else {
                return {
                    resultCode: 106,
                    resultDesc: "账号密码不正确",
                    success: true
                };
            }
        }
    },

    {
        url: baseURL + "api/user/menuList",
        method: "get",
        statusCode: 200,
        response: (req) => {
            const result = auth(req.headers.token);
            if (result) return result;
            return {
                resultCode: 200,
                success: true,
                result: menuList
            }
        }
    }
] as MockMethod[];
