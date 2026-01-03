import {Tab} from "../layout/Tab";
import {MenuItem} from "./Menu";
import {Editor} from "../editor";
import {closeTabByType, copyTab, resizeTabs} from "../layout/tabUtil";
/// #if !BROWSER
import {openNewWindow} from "../window/openNewWindow";
/// #endif
import {copySubMenu} from "./commonMenuItem";
import {App} from "../index";
import {Layout} from "../layout";
import {Wnd} from "../layout/Wnd";
import {getAllWnds} from "../layout/getAll";
import {Asset} from "../asset";
import {writeText} from "../protyle/util/compatibility";
import {getAssetName, pathPosix} from "../util/pathName";
import {Constants} from "../constants";

const closeMenu = (tab: Tab) => {
    const unmodifiedTabs: Tab[] = [];
    const leftTabs: Tab[] = [];
    const rightTabs: Tab[] = [];
    let midIndex = -1;
    tab.parent.children.forEach((item: Tab, index: number) => {
        const editor = item.model as Editor;
        if (!editor || (editor.editor?.protyle && !editor.editor?.protyle.updated)) {
            unmodifiedTabs.push(item);
        }
        if (item.id === tab.id) {
            midIndex = index;
        }
        if (midIndex === -1) {
            leftTabs.push(item);
        } else if (index > midIndex) {
            rightTabs.push(item);
        }
    });

    window.shehab.menus.menu.append(new MenuItem({
        id: "close",
        icon: "iconClose",
        label: window.shehab.languages.close,
        accelerator: window.shehab.config.keymap.general.closeTab.custom,
        click: () => {
            tab.parent.removeTab(tab.id);
        }
    }).element);
    if (tab.parent.children.length > 1) {
        window.shehab.menus.menu.append(new MenuItem({
            id: "closeOthers",
            label: window.shehab.languages.closeOthers,
            accelerator: window.shehab.config.keymap.general.closeOthers.custom,
            click() {
                closeTabByType(tab, "closeOthers");
            }
        }).element);
        window.shehab.menus.menu.append(new MenuItem({
            id: "closeAll",
            label: window.shehab.languages.closeAll,
            accelerator: window.shehab.config.keymap.general.closeAll.custom,
            click() {
                closeTabByType(tab, "closeAll");
            }
        }).element);
        if (unmodifiedTabs.length > 0) {
            window.shehab.menus.menu.append(new MenuItem({
                id: "closeUnmodified",
                label: window.shehab.languages.closeUnmodified,
                accelerator: window.shehab.config.keymap.general.closeUnmodified.custom,
                click() {
                    closeTabByType(tab, "other", unmodifiedTabs);
                }
            }).element);
        }
        if (leftTabs.length > 0) {
            window.shehab.menus.menu.append(new MenuItem({
                id: "closeLeft",
                label: window.shehab.languages.closeLeft,
                accelerator: window.shehab.config.keymap.general.closeLeft.custom,
                click: async () => {
                    closeTabByType(tab, "other", leftTabs);
                }
            }).element);
        }
        if (rightTabs.length > 0) {
            window.shehab.menus.menu.append(new MenuItem({
                id: "closeRight",
                label: window.shehab.languages.closeRight,
                accelerator: window.shehab.config.keymap.general.closeRight.custom,
                click() {
                    closeTabByType(tab, "other", rightTabs);
                }
            }).element);
        }
    }
    window.shehab.menus.menu.append(new MenuItem({id: "separator_1", type: "separator"}).element);
};

const splitSubMenu = (app: App, tab: Tab) => {
    const subMenus: IMenu[] = [{
        id: "splitLR",
        icon: "iconSplitLR",
        accelerator: window.shehab.config.keymap.general.splitLR.custom,
        label: window.shehab.languages.splitLR,
        click: () => {
            tab.parent.split("lr").addTab(copyTab(app, tab));
        }
    }];
    if (tab.parent.children.length > 1) {
        subMenus.push({
            id: "splitMoveR",
            icon: "iconLayoutRight",
            accelerator: window.shehab.config.keymap.general.splitMoveR.custom,
            label: window.shehab.languages.splitMoveR,
            click: () => {
                const newWnd = tab.parent.split("lr");
                newWnd.headersElement.append(tab.headElement);
                newWnd.headersElement.parentElement.classList.remove("fn__none");
                newWnd.moveTab(tab);
                resizeTabs();
            }
        });
    }
    subMenus.push({
        id: "splitTB",
        icon: "iconSplitTB",
        accelerator: window.shehab.config.keymap.general.splitTB.custom,
        label: window.shehab.languages.splitTB,
        click: () => {
            tab.parent.split("tb").addTab(copyTab(app, tab));
        }
    });

    if (tab.parent.children.length > 1) {
        subMenus.push({
            id: "splitMoveB",
            icon: "iconLayoutBottom",
            accelerator: window.shehab.config.keymap.general.splitMoveB.custom,
            label: window.shehab.languages.splitMoveB,
            click: () => {
                const newWnd = tab.parent.split("tb");
                newWnd.headersElement.append(tab.headElement);
                newWnd.headersElement.parentElement.classList.remove("fn__none");
                newWnd.moveTab(tab);
                resizeTabs();
            }
        });
    }
    let wndsTemp: Wnd[] = [];
    getAllWnds(window.shehab.layout.centerLayout, wndsTemp);
    if (wndsTemp.length > 1) {
        subMenus.push({
            id: "unsplit",
            label: window.shehab.languages.unsplit,
            accelerator: window.shehab.config.keymap.general.unsplit.custom,
            click: () => {
                let layout = tab.parent.parent;
                while (layout.id !== window.shehab.layout.centerLayout.id) {
                    wndsTemp = [];
                    getAllWnds(layout, wndsTemp);
                    if (wndsTemp.length > 1) {
                        break;
                    } else {
                        layout = layout.parent;
                    }
                }
                unsplitWnd(tab.parent.parent.children[0], layout, true);
                resizeTabs();
            }
        });
        subMenus.push({
            id: "unsplitAll",
            label: window.shehab.languages.unsplitAll,
            accelerator: window.shehab.config.keymap.general.unsplitAll.custom,
            click: () => {
                unsplitWnd(window.shehab.layout.centerLayout, window.shehab.layout.centerLayout, false);
                resizeTabs();
            }
        });
    }
    return subMenus;
};

export const initTabMenu = (app: App, tab: Tab) => {
    window.shehab.menus.menu.remove();
    window.shehab.menus.menu.element.setAttribute("data-name", Constants.MENU_TAB);
    closeMenu(tab);
    window.shehab.menus.menu.append(new MenuItem({
        id: "split",
        label: window.shehab.languages.split,
        submenu: splitSubMenu(app, tab)
    }).element);
    const model = tab.model;
    let rootId: string;
    if ((model && model instanceof Editor)) {
        rootId = model.editor.protyle.block.rootID;
    } else {
        const initData = tab.headElement.getAttribute("data-initdata");
        if (initData) {
            const initDataObj = JSON.parse(initData);
            if (initDataObj && initDataObj.instance === "Editor") {
                rootId = initDataObj.rootId || initDataObj.blockId;
            }
        }
    }
    if (rootId) {
        window.shehab.menus.menu.append(new MenuItem({
            id: "copy",
            label: window.shehab.languages.copy,
            icon: "iconCopy",
            type: "submenu",
            submenu: copySubMenu([rootId], false)
        }).element);
    } else if (model && model instanceof Asset) {
        window.shehab.menus.menu.append(new MenuItem({
            id: "copy",
            label: window.shehab.languages.copy,
            icon: "iconCopy",
            click() {
                writeText(`[${getAssetName(model.parent.title)}${pathPosix().extname(model.path)}](${model.path})`);
            }
        }).element);
    }
    if (tab.headElement.classList.contains("item--pin")) {
        window.shehab.menus.menu.append(new MenuItem({
            id: "unpin",
            label: window.shehab.languages.unpin,
            icon: "iconUnpin",
            click: () => {
                tab.unpin();
            }
        }).element);
    } else {
        window.shehab.menus.menu.append(new MenuItem({
            id: "pin",
            label: window.shehab.languages.pin,
            icon: "iconPin",
            click: () => {
                tab.pin();
            }
        }).element);
    }
    /// #if !BROWSER
    window.shehab.menus.menu.append(new MenuItem({
        id: "tabToWindow",
        label: window.shehab.languages.tabToWindow,
        accelerator: window.shehab.config.keymap.general.tabToWindow.custom,
        icon: "iconOpenWindow",
        click: () => {
            openNewWindow(tab);
        }
    }).element);
    /// #endif
    return window.shehab.menus.menu;
};

export const unsplitWnd = (target: Wnd | Layout, layout: Layout, onlyWnd: boolean) => {
    let wnd: Wnd = target as Wnd;
    while (wnd instanceof Layout) {
        wnd = wnd.children[0] as Wnd;
    }
    for (let i = 0; i < layout.children.length; i++) {
        const item = layout.children[i];
        if (item instanceof Layout && !onlyWnd) {
            unsplitWnd(wnd, item, onlyWnd);
        } else if (item instanceof Wnd && item.id !== wnd.id && item.children.length > 0) {
            for (let j = 0; j < item.children.length; j++) {
                const tab = item.children[j];
                wnd.headersElement.append(tab.headElement);
                wnd.moveTab(tab);
                j--;
            }
            i--;
        }
    }
};
