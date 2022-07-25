export interface IMenuItem {
    name: string;
    path?: string;
    icon?: string;
    children?: IMenuItem[]
}