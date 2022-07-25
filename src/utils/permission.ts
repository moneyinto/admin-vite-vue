import { IMenuItem } from "@/types";

export const dealMenuListForPageList = (menuList: IMenuItem[]) => {
    let pageList: string[] = [];
    menuList.forEach(item => {
        if (item.path) pageList.push(item.path);
        if (item.children) {
            pageList = pageList.concat(dealMenuListForPageList(item.children));
        }
    });
    return pageList;
};
