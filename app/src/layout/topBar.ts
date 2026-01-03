import {getWorkspaceName} from "../util/noRelyPCFunction";
import {isInAndroid, isInHarmony, isInIOS, setStorageVal, updateHotkeyTip} from "../protyle/util/compatibility";
import {exitSiYuan, processSync} from "../dialog/processSystem";
import {goBack, goForward} from "../util/backForward";
import {syncGuide} from "../sync/syncGuide";
import {workspaceMenu} from "../menus/workspace";
import {MenuItem} from "../menus/Menu";
import {setMode} from "../util/assets";
import {openSetting} from "../config";
import {openSearch} from "../search/spread";
import {App} from "../index";
/// #if !BROWSER
import {ipcRenderer, webFrame} from "electron";
/// #endif
import {Constants} from "../constants";
import {isBrowser, isWindow} from "../util/functions";
import {fetchPost} from "../util/fetch";
import {needSubscribe} from "../util/needSubscribe";
import * as dayjs from "dayjs";
import {exportLayout} from "./util";
import {commandPanel} from "../boot/globalEvent/command/panel";
import {openTopBarMenu} from "../plugin/openTopBarMenu";

export const initBar = (app: App) => {
    const toolbarElement = document.getElementById("toolbar");
    toolbarElement.innerHTML = `
<div id="barWorkspace" class="ariaLabel toolbar__item toolbar__item--active" aria-label="${window.shehab.languages.mainMenu} ${updateHotkeyTip(window.shehab.config.keymap.general.mainMenu.custom)}">
    <span class="toolbar__text">${getWorkspaceName()}</span>
    <svg class="toolbar__svg"><use xlink:href="#iconDown"></use></svg>
</div>
<div id="barSync" class="ariaLabel toolbar__item${window.shehab.config.readonly ? " fn__none" : ""}">
    <svg><use xlink:href="#iconCloudSucc"></use></svg>
</div>
<button id="barBack" class="ariaLabel toolbar__item toolbar__item--disabled" aria-label="${window.shehab.languages.goBack} ${updateHotkeyTip(window.shehab.config.keymap.general.goBack.custom)}">
    <svg><use xlink:href="#iconBack"></use></svg>
</button>
<button id="barForward" class="ariaLabel toolbar__item toolbar__item--disabled" aria-label="${window.shehab.languages.goForward} ${updateHotkeyTip(window.shehab.config.keymap.general.goForward.custom)}">
    <svg><use xlink:href="#iconForward"></use></svg>
</button>
<div class="fn__flex-1 fn__ellipsis" id="drag"><span class="fn__none">开发版，使用前请进行备份 Development version, please backup before use</span></div>
<div id="toolbarVIP" class="fn__flex${window.shehab.config.readonly ? " fn__none" : ""}"></div>
<div id="barPlugins" class="toolbar__item ariaLabel" aria-label="${window.shehab.languages.plugin}">
    <svg><use xlink:href="#iconPlugin"></use></svg>
</div>
<div id="barCommand" class="toolbar__item ariaLabel" aria-label="${window.shehab.languages.commandPanel} ${updateHotkeyTip(window.shehab.config.keymap.general.commandPanel.custom)}">
    <svg><use xlink:href="#iconTerminal"></use></svg>
</div>
<div id="barSearch" class="toolbar__item ariaLabel" aria-label="${window.shehab.languages.globalSearch} ${updateHotkeyTip(window.shehab.config.keymap.general.globalSearch.custom)}">
    <svg><use xlink:href="#iconSearch"></use></svg>
</div>
<div id="barZoom" class="toolbar__item ariaLabel${(window.shehab.storage[Constants.LOCAL_ZOOM] === 1 || isBrowser()) ? " fn__none" : ""}" aria-label="${window.shehab.languages.zoom}">
    <svg><use xlink:href="#iconZoom${window.shehab.storage[Constants.LOCAL_ZOOM] > 1 ? "In" : "Out"}"></use></svg>
</div>
<div id="barMode" class="toolbar__item ariaLabel${window.shehab.config.readonly ? " fn__none" : ""}" aria-label="${window.shehab.languages.appearanceMode}">
    <svg><use xlink:href="#icon${window.shehab.config.appearance.modeOS ? "Mode" : (window.shehab.config.appearance.mode === 0 ? "Light" : "Dark")}"></use></svg>
</div>
<div id="barExit" class="ft__error toolbar__item ariaLabel${(isInIOS() || isInAndroid() || isInHarmony()) ? "" : " fn__none"}" aria-label="${window.shehab.languages.safeQuit}">
    <svg><use xlink:href="#iconQuit"></use></svg>
</div>
<div id="barMore" class="toolbar__item ariaLabel" aria-label="${window.shehab.languages.more}">
    <svg><use xlink:href="#iconMore"></use></svg>
</div>
<div class="fn__flex" id="windowControls"></div>`;
    processSync();
    toolbarElement.addEventListener("click", (event: MouseEvent) => {
        let target = event.target as HTMLElement;
        if (typeof event.detail === "string") {
            target = toolbarElement.querySelector("#" + event.detail);
        }
        while (!target.classList.contains("toolbar")) {
            const targetId = typeof event.detail === "string" ? event.detail : target.id;
            if (targetId === "barBack") {
                goBack(app);
                event.stopPropagation();
                break;
            } else if (targetId === "barMore") {
                if (!window.shehab.menus.menu.element.classList.contains("fn__none") &&
                    window.shehab.menus.menu.element.getAttribute("data-name") === Constants.MENU_BAR_MORE) {
                    window.shehab.menus.menu.remove();
                    return;
                }
                window.shehab.menus.menu.remove();
                window.shehab.menus.menu.element.setAttribute("data-name", Constants.MENU_BAR_MORE);
                (target.getAttribute("data-hideids") || "").split(",").forEach((itemId) => {
                    const hideElement = toolbarElement.querySelector("#" + itemId);
                    const useElement = hideElement.querySelector("use");
                    const menuOptions: IMenu = {
                        label: itemId === "toolbarVIP" ? window.shehab.languages.account : hideElement.getAttribute("aria-label"),
                        icon: itemId === "toolbarVIP" ? "iconAccount" : (useElement ? useElement.getAttribute("xlink:href").substring(1) : undefined),
                        click: () => {
                            if (itemId.startsWith("plugin")) {
                                hideElement.dispatchEvent(new CustomEvent("click"));
                            } else {
                                toolbarElement.dispatchEvent(new CustomEvent("click", {detail: itemId}));
                            }
                        }
                    };
                    if (!useElement && hideElement.querySelector("svg")) {
                        const svgElement = hideElement.querySelector("svg").cloneNode(true) as HTMLElement;
                        svgElement.classList.add("b3-menu__icon");
                        menuOptions.iconHTML = svgElement.outerHTML;
                    }
                    window.shehab.menus.menu.append(new MenuItem(menuOptions).element);
                });
                const rect = target.getBoundingClientRect();
                window.shehab.menus.menu.popup({x: rect.right, y: rect.bottom, isLeft: true});
                event.stopPropagation();
                break;
            } else if (targetId === "barForward") {
                goForward(app);
                event.stopPropagation();
                break;
            } else if (targetId === "barSync") {
                syncGuide(app);
                event.stopPropagation();
                break;
            } else if (targetId === "barWorkspace") {
                workspaceMenu(app, target.getBoundingClientRect());
                event.stopPropagation();
                break;
            } else if (targetId === "barExit") {
                event.stopPropagation();
                exportLayout({
                    errorExit: true,
                    cb: exitSiYuan,
                });
                break;
            } else if (targetId === "barMode") {
                if (!window.shehab.menus.menu.element.classList.contains("fn__none") &&
                    window.shehab.menus.menu.element.getAttribute("data-name") === Constants.MENU_BAR_MODE) {
                    window.shehab.menus.menu.remove();
                    return;
                }
                window.shehab.menus.menu.remove();
                window.shehab.menus.menu.element.setAttribute("data-name", Constants.MENU_BAR_MODE);
                window.shehab.menus.menu.append(new MenuItem({
                    id: "themeLight",
                    label: window.shehab.languages.themeLight,
                    icon: "iconLight",
                    current: window.shehab.config.appearance.mode === 0 && !window.shehab.config.appearance.modeOS,
                    click: () => {
                        setMode(0);
                    }
                }).element);
                window.shehab.menus.menu.append(new MenuItem({
                    id: "themeDark",
                    label: window.shehab.languages.themeDark,
                    current: window.shehab.config.appearance.mode === 1 && !window.shehab.config.appearance.modeOS,
                    icon: "iconDark",
                    click: () => {
                        setMode(1);
                    }
                }).element);
                window.shehab.menus.menu.append(new MenuItem({
                    id: "themeOS",
                    label: window.shehab.languages.themeOS,
                    current: window.shehab.config.appearance.modeOS,
                    icon: "iconMode",
                    click: () => {
                        setMode(2);
                    }
                }).element);
                let rect = target.getBoundingClientRect();
                if (rect.width === 0) {
                    rect = toolbarElement.querySelector("#barMore").getBoundingClientRect();
                }
                window.shehab.menus.menu.popup({x: rect.right, y: rect.bottom, isLeft: true});
                event.stopPropagation();
                break;
            } else if (targetId === "toolbarVIP") {
                if (!window.shehab.config.readonly) {
                    const dialogSetting = openSetting(app);
                    dialogSetting.element.querySelector('.b3-tab-bar [data-name="account"]').dispatchEvent(new CustomEvent("click"));
                }
                event.stopPropagation();
                break;
            } else if (targetId === "barSearch") {
                openSearch({
                    app,
                    hotkey: Constants.DIALOG_GLOBALSEARCH
                });
                event.stopPropagation();
                break;
            } else if (targetId === "barPlugins") {
                openTopBarMenu(app, target);
                event.stopPropagation();
                break;
            } else if (targetId === "barCommand") {
                commandPanel(app);
                event.stopPropagation();
                break;
            } else if (targetId === "barZoom") {
                if (!window.shehab.menus.menu.element.classList.contains("fn__none") &&
                    window.shehab.menus.menu.element.getAttribute("data-name") === Constants.MENU_BAR_ZOOM) {
                    window.shehab.menus.menu.remove();
                    return;
                }
                window.shehab.menus.menu.remove();
                window.shehab.menus.menu.element.setAttribute("data-name", Constants.MENU_BAR_ZOOM);
                window.shehab.menus.menu.append(new MenuItem({
                    label: window.shehab.languages.zoomIn,
                    icon: "iconZoomIn",
                    accelerator: "⌘=",
                    click: () => {
                        setZoom("zoomIn");
                    }
                }).element);
                window.shehab.menus.menu.append(new MenuItem({
                    label: window.shehab.languages.zoomOut,
                    accelerator: "⌘-",
                    icon: "iconZoomOut",
                    click: () => {
                        setZoom("zoomOut");
                    }
                }).element);
                window.shehab.menus.menu.append(new MenuItem({
                    label: window.shehab.languages.reset,
                    accelerator: "⌘0",
                    click: () => {
                        setZoom("restore");
                    }
                }).element);
                let rect = target.getBoundingClientRect();
                if (rect.width === 0) {
                    rect = toolbarElement.querySelector("#barMore").getBoundingClientRect();
                }
                window.shehab.menus.menu.popup({x: rect.right, y: rect.bottom, isLeft: true});
                event.stopPropagation();
                break;
            }
            target = target.parentElement;
        }
    });
    const barSyncElement = toolbarElement.querySelector("#barSync");
    barSyncElement.addEventListener("mouseenter", (event) => {
        event.stopPropagation();
        event.preventDefault();
        fetchPost("/api/sync/getSyncInfo", {}, (response) => {
            let html = "";
            if (!window.shehab.config.sync.enabled || (0 === window.shehab.config.sync.provider && needSubscribe(""))) {
                html = response.data.stat;
            } else {
                html = window.shehab.languages._kernel[82].replace("%s", dayjs(response.data.synced).format("YYYY-MM-DD HH:mm")) + "<br>";
                html += "&emsp;" + response.data.stat;
                if (response.data.kernels.length > 0) {
                    html += "<br>";
                    html += window.shehab.languages.currentKernel + "<br>";
                    html += "&emsp;" + response.data.kernel + "/" + window.shehab.config.system.kernelVersion + " (" + window.shehab.config.system.os + "/" + window.shehab.config.system.name + ")<br>";
                    html += window.shehab.languages.otherOnlineKernels + "<br>";
                    response.data.kernels.forEach((item: {
                        os: string;
                        ver: string;
                        hostname: string;
                        id: string;
                    }) => {
                        html += `&emsp;${item.id}/${item.ver} (${item.os}/${item.hostname}) <br>`;
                    });
                }
            }
            barSyncElement.setAttribute("aria-label", html);
        });
    });
    barSyncElement.setAttribute("aria-label", window.shehab.config.sync.stat || (window.shehab.languages.syncNow + " " + updateHotkeyTip(window.shehab.config.keymap.general.syncNow.custom)));
};

export const setZoom = (type: "zoomIn" | "zoomOut" | "restore") => {
    /// #if !BROWSER
    let zoom = 1;
    if (type === "zoomIn") {
        Constants.SIZE_ZOOM.find((item, index) => {
            if (item.zoom === window.shehab.storage[Constants.LOCAL_ZOOM]) {
                zoom = Constants.SIZE_ZOOM[index + 1]?.zoom || 3;
                return true;
            }
        });
    } else if (type === "zoomOut") {
        Constants.SIZE_ZOOM.find((item, index) => {
            if (item.zoom === window.shehab.storage[Constants.LOCAL_ZOOM]) {
                zoom = Constants.SIZE_ZOOM[index - 1]?.zoom || 0.67;
                return true;
            }
        });
    }

    webFrame.setZoomFactor(zoom);
    ipcRenderer.send(Constants.SHEHAB_CMD, {
        cmd: "setTrafficLightPosition",
        zoom,
        position: Constants.SIZE_ZOOM.find((item) => item.zoom === zoom).position
    });
    window.shehab.storage[Constants.LOCAL_ZOOM] = zoom;
    setStorageVal(Constants.LOCAL_ZOOM, zoom);
    if (!isWindow()) {
        const barZoomElement = document.getElementById("barZoom");
        if (zoom === 1) {
            barZoomElement.classList.add("fn__none");
        } else {
            if (zoom > 1) {
                barZoomElement.querySelector("use").setAttribute("xlink:href", "#iconZoomIn");
            } else {
                barZoomElement.querySelector("use").setAttribute("xlink:href", "#iconZoomOut");
            }
            barZoomElement.classList.remove("fn__none");
        }
    }
    /// #endif
};
