import {MenuItem} from "./Menu";
import {copySubMenu} from "./commonMenuItem";

export const initSearchMenu = (id: string) => {
    window.shehab.menus.menu.remove();
    window.shehab.menus.menu.append(new MenuItem({
        id: "copy",
        icon: "iconCopy",
        label: window.shehab.languages.copy,
        type: "submenu",
        submenu: copySubMenu([id])
    }).element);
    return window.shehab.menus.menu;
};
