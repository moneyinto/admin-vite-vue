import { IMenuItem } from "@/types";

export const dealMenuListForPageList = (menuList: IMenuItem[], label?: IMenuItem[]) => {
    let pageList: IMenuItem[] = [];
    menuList.forEach(item => {
        const parent = label || [];
        const page = {
            name: item.name,
            ...item.path ? { path: item.path } : {}
        };
        pageList.push({
            ...page,
            ...label ? { parent } : {}
        });
        if (item.children) {
            pageList = pageList.concat(dealMenuListForPageList(item.children, parent.concat([page])));
        }
    });
    return pageList;
};
