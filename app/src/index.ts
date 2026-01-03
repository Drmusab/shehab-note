import {Constants} from "./constants";
import {Menus} from "./menus";
import {Model} from "./layout/Model";
import {onGetConfig} from "./boot/onGetConfig";
import {initBlockPopover} from "./block/popover";
import {account} from "./config/account";
import {addScript, addScriptSync} from "./protyle/util/addScript";
import {genUUID} from "./util/genID";
import {fetchGet, fetchPost} from "./util/fetch";
import {addBaseURL, getIdFromSYProtocol, isSYProtocol, setNoteBook} from "./util/pathName";
import {registerServiceWorker} from "./util/serviceWorker";
import {openFileById} from "./editor/util";
import {
    bootSync,
    downloadProgress,
    processSync,
    progressBackgroundTask,
    progressLoading,
    progressStatus,
    reloadSync,
    setDefRefCount,
    setRefDynamicText,
    setTitle,
    transactionError
} from "./dialog/processSystem";
import {initMessage} from "./dialog/message";
import {getAllTabs} from "./layout/getAll";
import {getLocalStorage} from "./protyle/util/compatibility";
import {getSearch} from "./util/functions";
import {hideAllElements} from "./protyle/ui/hideElements";
import {loadPlugins, reloadPlugin} from "./plugin/loader";
import "./assets/scss/base.scss";
import {reloadEmoji} from "./emoji";
import {processIOSPurchaseResponse} from "./util/iOSPurchase";
/// #if BROWSER
import {setLocalShorthandCount} from "./util/noRelyPCFunction";
/// #endif
import {getDockByType} from "./layout/tabUtil";
import {Tag} from "./layout/dock/Tag";
import {updateControlAlt} from "./protyle/util/hotKey";
import {updateAppearance} from "./config/util/updateAppearance";
import {renderSnippet} from "./config/util/snippets";

export class App {
    public plugins: import("./plugin").Plugin[] = [];
    public appId: string;

    constructor() {
        registerServiceWorker(`${Constants.SERVICE_WORKER_PATH}?v=${Constants.SHEHAB_VERSION}`);
        addBaseURL();

        this.appId = Constants.SHEHAB_APPID;
        window.shehab = {
            zIndex: 10,
            transactions: [],
            reqIds: {},
            backStack: [],
            layout: {},
            dialogs: [],
            blockPanels: [],
            closedTabs: [],
            ctrlIsPressed: false,
            altIsPressed: false,
            ws: new Model({
                app: this,
                id: genUUID(),
                type: "main",
                msgCallback: (data) => {
                    this.plugins.forEach((plugin) => {
                        plugin.eventBus.emit("ws-main", data);
                    });
                    if (data) {
                        switch (data.cmd) {
                            case "setAppearance":
                                updateAppearance(data.data);
                                break;
                            case "setSnippet":
                                window.shehab.config.snippet = data.data;
                                renderSnippet();
                                break;
                            case "setDefRefCount":
                                setDefRefCount(data.data);
                                break;
                            case "reloadTag":
                                if (getDockByType("tag")?.data.tag instanceof Tag) {
                                    (getDockByType("tag").data.tag as Tag).update();
                                }
                                break;
                            /// #if BROWSER
                            case "setLocalShorthandCount":
                                setLocalShorthandCount();
                                break;
                            /// #endif
                            case "setRefDynamicText":
                                setRefDynamicText(data.data);
                                break;
                            case "reloadPlugin":
                                reloadPlugin(this, data.data);
                                break;
                            case "reloadEmojiConf":
                                reloadEmoji();
                                break;
                            case "syncMergeResult":
                                reloadSync(this, data.data);
                                break;
                            case "reloaddoc":
                                reloadSync(this, {upsertRootIDs: [data.data], removeRootIDs: []}, false, false, true);
                                break;
                            case "readonly":
                                window.shehab.config.editor.readOnly = data.data;
                                hideAllElements(["util"]);
                                break;
                            case "setConf":
                                window.shehab.config = data.data;
                                updateControlAlt();
                                break;
                            case "progress":
                                progressLoading(data);
                                break;
                            case "setLocalStorageVal":
                                window.shehab.storage[data.data.key] = data.data.val;
                                break;
                            case "rename":
                                getAllTabs().forEach((tab) => {
                                    if (tab.headElement) {
                                        const initTab = tab.headElement.getAttribute("data-initdata");
                                        if (initTab) {
                                            const initTabData = JSON.parse(initTab);
                                            if (initTabData.instance === "Editor" && initTabData.rootId === data.data.id) {
                                                tab.updateTitle(data.data.title);
                                            }
                                        }
                                    }
                                });
                                break;
                            case "unmount":
                                getAllTabs().forEach((tab) => {
                                    if (tab.headElement) {
                                        const initTab = tab.headElement.getAttribute("data-initdata");
                                        if (initTab) {
                                            const initTabData = JSON.parse(initTab);
                                            if (initTabData.instance === "Editor" && data.data.box === initTabData.notebookId) {
                                                tab.parent.removeTab(tab.id);
                                            }
                                        }
                                    }
                                });
                                break;
                            case "removeDoc":
                                getAllTabs().forEach((tab) => {
                                    if (tab.headElement) {
                                        const initTab = tab.headElement.getAttribute("data-initdata");
                                        if (initTab) {
                                            const initTabData = JSON.parse(initTab);
                                            if (initTabData.instance === "Editor" && data.data.ids.includes(initTabData.rootId)) {
                                                tab.parent.removeTab(tab.id);
                                            }
                                        }
                                    }
                                });
                                break;
                            case "statusbar":
                                progressStatus(data);
                                break;
                            case "downloadProgress":
                                downloadProgress(data.data);
                                break;
                            case "txerr":
                                transactionError();
                                break;
                            case "syncing":
                                processSync(data, this.plugins);
                                break;
                            case "backgroundtask":
                                progressBackgroundTask(data.data.tasks);
                                break;
                            case "refreshtheme":
                                if ((window.shehab.config.appearance.mode === 1 && window.shehab.config.appearance.themeDark !== "midnight") || (window.shehab.config.appearance.mode === 0 && window.shehab.config.appearance.themeLight !== "daylight")) {
                                    (document.getElementById("themeStyle") as HTMLLinkElement).href = data.data.theme;
                                } else {
                                    (document.getElementById("themeDefaultStyle") as HTMLLinkElement).href = data.data.theme;
                                }
                                break;
                            case "openFileById":
                                openFileById({app: this, id: data.data.id, action: [Constants.CB_GET_FOCUS]});
                                break;
                        }
                    }
                }
            }),
        };

        fetchPost("/api/system/getConf", {}, async (response) => {
            addScriptSync(`${Constants.PROTYLE_CDN}/js/lute/lute.min.js?v=${Constants.SHEHAB_VERSION}`, "protyleLuteScript");
            addScript(`${Constants.PROTYLE_CDN}/js/protyle-html.js?v=${Constants.SHEHAB_VERSION}`, "protyleWcHtmlScript");
            window.shehab.config = response.data.conf;
            updateControlAlt();
            window.shehab.isPublish = response.data.isPublish;
            await loadPlugins(this);
            getLocalStorage(() => {
                fetchGet(`/appearance/langs/${window.shehab.config.appearance.lang}.json?v=${Constants.SHEHAB_VERSION}`, (lauguages: IObject) => {
                    window.shehab.languages = lauguages;
                    window.shehab.menus = new Menus(this);
                    bootSync();
                    fetchPost("/api/setting/getCloudUser", {}, userResponse => {
                        window.shehab.user = userResponse.data;
                        onGetConfig(response.data.start, this);
                        account.onSetaccount();
                        setTitle(window.shehab.languages.siyuanNote);
                        initMessage();
                    });
                });
            });
        });
        setNoteBook();
        initBlockPopover(this);
    }
}

const siyuanApp = new App();

window.openFileByURL = (openURL) => {
    if (openURL && isSYProtocol(openURL)) {
        const isZoomIn = getSearch("focus", openURL) === "1";
        openFileById({
            app: siyuanApp,
            id: getIdFromSYProtocol(openURL),
            action: isZoomIn ? [Constants.CB_GET_ALL, Constants.CB_GET_FOCUS] : [Constants.CB_GET_FOCUS, Constants.CB_GET_CONTEXT, Constants.CB_GET_ROOTSCROLL],
            zoomIn: isZoomIn
        });
        return true;
    }
    return false;
};

/// #if BROWSER
window.showKeyboardToolbar = () => {
    // 防止 Pad 端报错
};
window.processIOSPurchaseResponse = processIOSPurchaseResponse;
/// #endif
