/// #if !BROWSER
import {ipcRenderer} from "electron";
import * as path from "path";
/// #endif
import {fetchPost} from "../util/fetch";
import {getAssetName, pathPosix, useShell} from "../util/pathName";
import {openFileById} from "../editor/util";
import {Constants} from "../constants";
import {openNewWindowById} from "../window/openNewWindow";
import {MenuItem} from "./Menu";
import {App} from "../index";
import {exportByMobile, isInAndroid, updateHotkeyTip} from "../protyle/util/compatibility";
import {checkFold} from "../util/noRelyPCFunction";

export const exportAsset = (src: string) => {
    return {
        id: "export",
        label: window.shehab.languages.export,
        icon: "iconUpload",
        async click() {
            /// #if BROWSER
            exportByMobile(src);
            /// #else
            const result = await ipcRenderer.invoke(Constants.SIYUAN_GET, {
                cmd: "showSaveDialog",
                defaultPath: getAssetName(src) + pathPosix().extname(src),
                properties: ["showOverwriteConfirmation"],
            });
            if (!result.canceled) {
                fetchPost("/api/file/copyFile", {src, dest: result.filePath});
            }
            /// #endif
        }
    };
};

export const openEditorTab = (app: App, ids: string[], notebookId?: string, pathString?: string, onlyGetMenus = false) => {
    /// #if !MOBILE
    const openSubmenus: IMenu[] = [{
        id: "insertRight",
        icon: "iconLayoutRight",
        label: window.shehab.languages.insertRight,
        accelerator: ids.length === 1 ? `${updateHotkeyTip(window.shehab.config.keymap.editor.general.insertRight.custom)}/${updateHotkeyTip("⌥" + window.shehab.languages.click)}` : undefined,
        click: () => {
            if (notebookId) {
                openFileById({
                    app,
                    id: ids[0],
                    position: "right",
                    action: [Constants.CB_GET_FOCUS, Constants.CB_GET_SCROLL]
                });
            } else {
                ids.forEach((id) => {
                    checkFold(id, (zoomIn, action) => {
                        openFileById({
                            app,
                            id,
                            position: "right",
                            action,
                            zoomIn
                        });
                    });
                });
            }
        }
    }, {
        id: "insertBottom",
        icon: "iconLayoutBottom",
        label: window.shehab.languages.insertBottom,
        accelerator: ids.length === 1 ? "⇧⌘" + window.shehab.languages.click : "",
        click: () => {
            if (notebookId) {
                openFileById({
                    app,
                    id: ids[0],
                    position: "bottom",
                    action: [Constants.CB_GET_FOCUS, Constants.CB_GET_SCROLL]
                });
            } else {
                ids.forEach((id) => {
                    checkFold(id, (zoomIn, action) => {
                        openFileById({
                            app,
                            id,
                            position: "bottom",
                            action,
                            zoomIn
                        });
                    });
                });
            }
        }
    }];
    if (window.shehab.config.fileTree.openFilesUseCurrentTab) {
        openSubmenus.push({
            id: "openInNewTab",
            label: window.shehab.languages.openInNewTab,
            accelerator: ids.length === 1 ? "⌥⌘" + window.shehab.languages.click : undefined,
            click: () => {
                if (notebookId) {
                    openFileById({
                        app,
                        id: ids[0],
                        action: [Constants.CB_GET_FOCUS, Constants.CB_GET_SCROLL],
                        removeCurrentTab: false
                    });
                } else {
                    ids.forEach((id) => {
                        checkFold(id, (zoomIn, action) => {
                            openFileById({
                                app,
                                id,
                                action,
                                zoomIn,
                                removeCurrentTab: false
                            });
                        });
                    });
                }
            }
        });
    }
    /// #if !BROWSER
    openSubmenus.push({
        id: "openByNewWindow",
        label: window.shehab.languages.openByNewWindow,
        icon: "iconOpenWindow",
        click() {
            openNewWindowById(ids);
        }
    });
    /// #endif
    openSubmenus.push({id: "separator_1", type: "separator"});
    openSubmenus.push({
        id: "preview",
        icon: "iconPreview",
        label: window.shehab.languages.preview,
        click: () => {
            ids.forEach((id) => {
                openFileById({app, id, mode: "preview"});
            });
        }
    });
    /// #if !BROWSER
    openSubmenus.push({id: "separator_2", type: "separator"});
    openSubmenus.push({
        id: "showInFolder",
        icon: "iconFolder",
        label: window.shehab.languages.showInFolder,
        click: () => {
            if (notebookId) {
                useShell("showItemInFolder", path.join(window.shehab.config.system.dataDir, notebookId, pathString));
            } else {
                ids.forEach((id) => {
                    fetchPost("/api/block/getBlockInfo", {id}, (response) => {
                        useShell("showItemInFolder", path.join(window.shehab.config.system.dataDir, response.data.box, response.data.path));
                    });
                });
            }
        }
    });
    /// #endif
    if (onlyGetMenus) {
        return openSubmenus;
    }
    window.shehab.menus.menu.append(new MenuItem({
        id: "openBy",
        label: window.shehab.languages.openBy,
        icon: "iconOpen",
        submenu: openSubmenus,
    }).element);
    /// #endif
};

export const copyPNGByLink = (link: string) => {
    if (isInAndroid()) {
        window.JSAndroid.writeImageClipboard(link);
    } else {
        const canvas = document.createElement("canvas");
        const tempElement = document.createElement("img");
        tempElement.onload = (e: Event & { target: HTMLImageElement }) => {
            canvas.width = e.target.width;
            canvas.height = e.target.height;
            canvas.getContext("2d").drawImage(e.target, 0, 0, e.target.width, e.target.height);
            canvas.toBlob((blob) => {
                navigator.clipboard.write([
                    new ClipboardItem({
                        // @ts-ignore
                        ["image/png"]: blob
                    })
                ]);
            }, "image/png", 1);
        };
        tempElement.src = link;
    }
};

