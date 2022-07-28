
interface IParentItem {
    name: string;
    path?: string;
}
export interface IMenuItem {
    name: string;
    path?: string;
    icon?: string;
    children?: IMenuItem[];
    parent?: IParentItem[];
}