export const baseURL = "/mock/";

export const auth = (token: string) => {
    if (!token) {
        return {
            resultDesc: "登录过期",
            resultCode: 103,
            success: true
        }
    }
};

export const menuList = [
    {
        name: "首页",
        icon: "Home",
        children: [
            {
                name: "工作台",
                path: "/workplace",
                icon: "Workbench"
            },
            {
                name: "使用文档",
                path: "/doc",
                icon: "ViewList"
            }
        ]
    }
];