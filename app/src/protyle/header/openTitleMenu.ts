import {fetchPost, fetchSyncPost} from "../../util/fetch";
import {MenuItem} from "../../menus/Menu";
import {copySubMenu, exportMd, movePathToMenu, openFileAttr, openFileWechatNotify,} from "../../menus/commonMenuItem";
import {deleteFile} from "../../editor/deleteFile";
import {updateHotkeyTip} from "../util/compatibility";
/// #if !MOBILE
import {openBacklink, openGraph, openOutline} from "../../layout/dock/util";
import * as path from "path";
/// #else
import {openMobileFileById} from "../../mobile/editor";
/// #endif
import {Constants} from "../../constants";
import {openCardByData} from "../../card/openCard";
import {viewCards} from "../../card/viewCards";
import {getDisplayName, getNotebookName, pathPosix, useShell} from "../../util/pathName";
import {makeCard, quickMakeCard} from "../../card/makeCard";
import {emitOpenMenu} from "../../plugin/EventBus";
import * as dayjs from "dayjs";
import {hideTooltip} from "../../dialog/tooltip";
import {popSearch} from "../../mobile/menu/search";
import {openSearch} from "../../search/spread";
import {openDocHistory} from "../../history/doc";
import {openNewWindowById} from "../../window/openNewWindow";
import {transferBlockRef} from "../../menus/block";
import {addEditorToDatabase} from "../render/av/addToDatabase";
import {openFileById} from "../../editor/util";
import {hasTopClosestByClassName} from "../util/hasClosest";

export const openTitleMenu = (protyle: IProtyle, position: IPosition, from: string) => {
    hideTooltip();
    if (!window.shehab.menus.menu.element.classList.contains("fn__none") &&
        window.shehab.menus.menu.element.getAttribute("data-name") === Constants.MENU_TITLE) {
        window.shehab.menus.menu.remove();
        return;
    }
    fetchPost("/api/block/getDocInfo", {
        id: protyle.block.rootID
    }, (response) => {
        window.shehab.menus.menu.remove();
        window.shehab.menus.menu.element.setAttribute("data-name", Constants.MENU_TITLE);
        const popoverElement = hasTopClosestByClassName(protyle.element, "block__popover", true);
        window.shehab.menus.menu.element.setAttribute("data-from", popoverElement ? popoverElement.dataset.level + "popover-" + from : "app-" + from);
        window.shehab.menus.menu.append(new MenuItem({
            id: "copy",
            label: window.shehab.languages.copy,
            icon: "iconCopy",
            type: "submenu",
            submenu: copySubMenu([protyle.block.rootID], true, undefined, protyle.block.showAll ? protyle.block.id : protyle.block.rootID)
        }).element);
        if (!protyle.disabled) {
            window.shehab.menus.menu.append(movePathToMenu([protyle.path]));
            const range = getSelection().rangeCount > 0 ? getSelection().getRangeAt(0) : undefined;
            window.shehab.menus.menu.append(new MenuItem({
                id: "addToDatabase",
                label: window.shehab.languages.addToDatabase,
                accelerator: window.shehab.config.keymap.general.addToDatabase.custom,
                icon: "iconDatabase",
                click: () => {
                    addEditorToDatabase(protyle, range, "title");
                }
            }).element);
            window.shehab.menus.menu.append(new MenuItem({
                id: "delete",
                icon: "iconTrashcan",
                label: window.shehab.languages.delete,
                click: () => {
                    deleteFile(protyle.notebookId, protyle.path);
                }
            }).element);
        }
        /// #if !MOBILE
        window.shehab.menus.menu.append(new MenuItem({id: "separator_1", type: "separator"}).element);
        window.shehab.menus.menu.append(new MenuItem({
            id: "outline",
            icon: "iconAlignCenter",
            label: window.shehab.languages.outline,
            accelerator: window.shehab.config.keymap.editor.general.outline.custom,
            click: () => {
                openOutline({
                    app: protyle.app,
                    rootId: protyle.block.rootID,
                    title: protyle.options.render.title ? (protyle.title.editElement.textContent || window.shehab.languages.untitled) : "",
                    isPreview: !protyle.preview.element.classList.contains("fn__none")
                });
            }
        }).element);
        window.shehab.menus.menu.append(new MenuItem({
            id: "backlinks",
            icon: "iconLink",
            label: window.shehab.languages.backlinks,
            accelerator: window.shehab.config.keymap.editor.general.backlinks.custom,
            click: () => {
                openBacklink({
                    app: protyle.app,
                    blockId: protyle.block.id,
                    rootId: protyle.block.rootID,
                    useBlockId: protyle.block.showAll,
                    title: protyle.title ? (protyle.title.editElement.textContent || window.shehab.languages.untitled) : null
                });
            }
        }).element);
        window.shehab.menus.menu.append(new MenuItem({
            id: "graphView",
            icon: "iconGraph",
            label: window.shehab.languages.graphView,
            accelerator: window.shehab.config.keymap.editor.general.graphView.custom,
            click: () => {
                openGraph({
                    app: protyle.app,
                    blockId: protyle.block.id,
                    rootId: protyle.block.rootID,
                    useBlockId: protyle.block.showAll,
                    title: protyle.title ? (protyle.title.editElement.textContent || window.shehab.languages.untitled) : null
                });
            }
        }).element);
        /// #endif
        window.shehab.menus.menu.append(new MenuItem({id: "separator_2", type: "separator"}).element);
        window.shehab.menus.menu.append(new MenuItem({
            id: "attr",
            label: window.shehab.languages.attr,
            icon: "iconAttr",
            accelerator: window.shehab.config.keymap.editor.general.attr.custom + "/" + updateHotkeyTip("⇧" + window.shehab.languages.click),
            click() {
                openFileAttr(response.data.ial, "bookmark", protyle);
            }
        }).element);
        if (!window.shehab.config.readonly) {
            if (window.shehab.config.cloudRegion === 0) {
                window.shehab.menus.menu.append(new MenuItem({
                    id: "wechatReminder",
                    label: window.shehab.languages.wechatReminder,
                    icon: "iconMp",
                    click() {
                        openFileWechatNotify(protyle);
                    }
                }).element);
            }
            const isCardMade = !!response.data.ial[Constants.CUSTOM_RIFF_DECKS];
            const riffCardMenu: IMenu[] = [{
                id: "spaceRepetition",
                iconHTML: "",
                label: window.shehab.languages.spaceRepetition,
                accelerator: window.shehab.config.keymap.editor.general.spaceRepetition.custom,
                click: () => {
                    fetchPost("/api/riff/getTreeRiffDueCards", {rootID: protyle.block.rootID}, (response) => {
                        openCardByData(protyle.app, response.data, "doc", protyle.block.rootID, response.data.name);
                    });
                }
            }, {
                id: "manage",
                iconHTML: "",
                label: window.shehab.languages.manage,
                click: () => {
                    fetchPost("/api/filetree/getHPathByID", {
                        id: protyle.block.rootID
                    }, (response) => {
                        viewCards(protyle.app, protyle.block.rootID, pathPosix().join(getNotebookName(protyle.notebookId), (response.data)), "Tree");
                    });
                }
            }, {
                id: isCardMade ? "removeCard" : "quickMakeCard",
                iconHTML: "",
                label: isCardMade ? window.shehab.languages.removeCard : window.shehab.languages.quickMakeCard,
                accelerator: window.shehab.config.keymap.editor.general.quickMakeCard.custom,
                click: () => {
                    let titleElement = protyle.title?.element;
                    if (!titleElement) {
                        titleElement = document.createElement("div");
                        titleElement.setAttribute("data-node-id", protyle.block.rootID);
                        titleElement.setAttribute(Constants.CUSTOM_RIFF_DECKS, response.data.ial[Constants.CUSTOM_RIFF_DECKS]);
                    }
                    quickMakeCard(protyle, [titleElement]);
                }
            }];
            if (window.shehab.config.flashcard.deck) {
                riffCardMenu.push({
                    id: "addToDeck",
                    iconHTML: "",
                    label: window.shehab.languages.addToDeck,
                    click: () => {
                        makeCard(protyle.app, [protyle.block.rootID]);
                    }
                });
            }
            window.shehab.menus.menu.append(new MenuItem({
                id: "riffCard",
                label: window.shehab.languages.riffCard,
                type: "submenu",
                icon: "iconRiffCard",
                submenu: riffCardMenu,
            }).element);
        }
        window.shehab.menus.menu.append(new MenuItem({
            id: "search",
            label: window.shehab.languages.search,
            icon: "iconSearch",
            accelerator: window.shehab.config.keymap.general.search.custom,
            async click() {
                const searchPath = getDisplayName(protyle.path, false, true);
                /// #if MOBILE
                const pathResponse = await fetchSyncPost("/api/filetree/getHPathByPath", {
                    notebook: protyle.notebookId,
                    path: searchPath + ".sy"
                });
                popSearch(protyle.app, {
                    hasReplace: false,
                    hPath: pathPosix().join(getNotebookName(protyle.notebookId), pathResponse.data),
                    idPath: [pathPosix().join(protyle.notebookId, searchPath)],
                    page: 1,
                });
                /// #else
                openSearch({
                    app: protyle.app,
                    hotkey: Constants.DIALOG_SEARCH,
                    notebookId: protyle.notebookId,
                    searchPath
                });
                /// #endif
            }
        }).element);
        if (!protyle.disabled) {
            transferBlockRef(protyle.block.rootID);
        }
        window.shehab.menus.menu.append(new MenuItem({id: "separator_3", type: "separator"}).element);
        if (!protyle.model) {
            window.shehab.menus.menu.append(new MenuItem({
                id: "openBy",
                label: window.shehab.languages.openBy,
                icon: "iconOpen",
                click() {
                    /// #if !MOBILE
                    openFileById({
                        app: protyle.app,
                        id: protyle.block.id,
                        action: protyle.block.rootID !== protyle.block.id ? [Constants.CB_GET_ALL, Constants.CB_GET_FOCUS] : [Constants.CB_GET_CONTEXT],
                    });
                    /// #else
                    openMobileFileById(protyle.app, protyle.block.id, protyle.block.rootID !== protyle.block.id ? [Constants.CB_GET_ALL] : [Constants.CB_GET_CONTEXT]);
                    /// #endif
                }
            }).element);
        }
        /// #if !BROWSER
        window.shehab.menus.menu.append(new MenuItem({
            id: "openByNewWindow",
            label: window.shehab.languages.openByNewWindow,
            icon: "iconOpenWindow",
            click() {
                openNewWindowById(protyle.block.rootID);
            }
        }).element);
        window.shehab.menus.menu.append(new MenuItem({
            id: "showInFolder",
            icon: "iconFolder",
            label: window.shehab.languages.showInFolder,
            click: () => {
                useShell("showItemInFolder", path.join(window.shehab.config.system.dataDir, protyle.notebookId, protyle.path));
            }
        }).element);
        /// #endif
        if (!protyle.disabled) {
            window.shehab.menus.menu.append(new MenuItem({
                id: "fileHistory",
                label: window.shehab.languages.fileHistory,
                icon: "iconHistory",
                click() {
                    openDocHistory({
                        app: protyle.app,
                        id: protyle.block.rootID,
                        notebookId: protyle.notebookId,
                        pathString: response.data.name
                    });
                }
            }).element);
        }
        window.shehab.menus.menu.append(exportMd(protyle.block.showAll ? protyle.block.id : protyle.block.rootID));

        window.shehab.menus.menu.append(new MenuItem({id: "separator_4", type: "separator"}).element);
        if (protyle?.app?.plugins) {
            emitOpenMenu({
                plugins: protyle.app.plugins,
                type: "click-editortitleicon",
                detail: {
                    protyle,
                    data: response.data,
                },
                separatorPosition: "bottom",
            });
        }
        window.shehab.menus.menu.append(new MenuItem({
            id: "updateAndCreatedAt",
            iconHTML: "",
            type: "readonly",
            // 不能换行，否则移动端间距过大
            label: `${window.shehab.languages.modifiedAt} ${dayjs(response.data.ial.updated).format("YYYY-MM-DD HH:mm:ss")}<br>${window.shehab.languages.createdAt} ${dayjs(response.data.ial.id.substr(0, 14)).format("YYYY-MM-DD HH:mm:ss")}`
        }).element);
        /// #if MOBILE
        window.shehab.menus.menu.fullscreen();
        /// #else
        window.shehab.menus.menu.popup(position);
        /// #endif
    });
};
