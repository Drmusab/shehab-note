import {Constants} from "../../constants";
import {setAccessAuthCode} from "../../config/util/about";
import {Dialog} from "../../dialog";
import {fetchPost} from "../../util/fetch";
import {confirmDialog} from "../../dialog/confirmDialog";
import {showMessage} from "../../dialog/message";
import {isInAndroid, isInHarmony, isInIOS, isIPad, openByMobile, writeText} from "../../protyle/util/compatibility";
import {exitSiYuan, processSync} from "../../dialog/processSystem";
import {pathPosix} from "../../util/pathName";
import {openModel} from "../menu/model";
import {setKey} from "../../sync/syncGuide";
import {isBrowser} from "../../util/functions";

export const initAbout = () => {
    if (!window.shehab.config.localIPs || window.shehab.config.localIPs.length === 0 ||
        (window.shehab.config.localIPs.length === 1 && window.shehab.config.localIPs[0] === "")) {
        window.shehab.config.localIPs = ["127.0.0.1"];
    }

    openModel({
        title: window.shehab.languages.about,
        icon: "iconInfo",
        html: `<div>
<label class="b3-label fn__flex${window.shehab.config.readonly ? " fn__none" : ""}">
    <div class="fn__flex-1">
        ${window.shehab.languages.about11}
        <div class="b3-label__text">${window.shehab.languages.about12}</div>
    </div>
    <div class="fn__space"></div>
    <input class="b3-switch fn__flex-center" id="networkServe" type="checkbox"${window.shehab.config.system.networkServe ? " checked" : ""}>
</label>
<div class="b3-label">
        ${window.shehab.languages.about2}
        <div class="fn__hr"></div>
        <input class="b3-text-field fn__block" readonly value="http://${window.shehab.config.system.networkServe ? window.shehab.config.localIPs[0] : "127.0.0.1"}:${location.port}">
        <div class="b3-label__text">${window.shehab.languages.about3.replace("${port}", location.port)}</div>
        <div class="fn__hr"></div>
        ${(() => {
            const ipv4Codes: string[] = [];
            const ipv6Codes: string[] = [];
            for (const ip of window.shehab.config.localIPs) {
                if (!ip.trim()) {
                    break;
                }
                if (ip.startsWith("[") && ip.endsWith("]")) {
                    ipv6Codes.push(`<code class="fn__code">${ip}</code>`);
                } else {
                    ipv4Codes.push(`<code class="fn__code">${ip}</code>`);
                }
            }
            return `<div class="b3-label__text${ipv4Codes.length ? "" : " fn__none"}">${ipv4Codes.join(" ")}</div>
                    <div class="b3-label__text${ipv6Codes.length ? "" : " fn__none"}">${ipv6Codes.join(" ")}</div>`;
        })()}
        <div class="fn__hr"></div>
        <div class="b3-label__text">${window.shehab.languages.about18}</div>
</div>
<div class="b3-label${(window.shehab.config.readonly || (isBrowser() && !isInIOS() && !isInAndroid() && !isIPad() && !isInHarmony())) ? " fn__none" : ""}">
    ${window.shehab.languages.about5}
    <div class="fn__hr"></div>
    <button class="b3-button b3-button--outline fn__block" id="authCode">
        <svg><use xlink:href="#iconLock"></use></svg>${window.shehab.languages.config}
    </button>
    <div class="b3-label__text">${window.shehab.languages.about6}</div>
</div>
<div class="b3-label${window.shehab.config.readonly ? " fn__none" : ""}">
    ${window.shehab.languages.dataRepoKey}
    <div class="fn__hr"></div>
    <div class="${window.shehab.config.repo.key ? "fn__none" : ""}">
        <button class="b3-button b3-button--outline fn__block" id="importKey">
            <svg><use xlink:href="#iconDownload"></use></svg>${window.shehab.languages.importKey}
        </button>
        <div class="fn__hr"></div>
        <button class="b3-button b3-button--outline fn__block" id="initKey">
            <svg><use xlink:href="#iconLock"></use></svg>${window.shehab.languages.genKey}
        </button>
        <div class="fn__hr"></div>
        <button class="b3-button b3-button--outline fn__block" id="initKeyByPW">
            <svg><use xlink:href="#iconKey"></use></svg>${window.shehab.languages.genKeyByPW}
        </button>
    </div>
    <div class="${window.shehab.config.repo.key ? "" : "fn__none"}">
        <button class="b3-button b3-button--outline fn__block" id="copyKey">
            <svg><use xlink:href="#iconCopy"></use></svg>${window.shehab.languages.copyKey}
        </button>
        <div class="fn__hr"></div>
        <button class="b3-button b3-button--outline fn__block" id="removeKey">
            <svg><use xlink:href="#iconUndo"></use></svg>${window.shehab.languages.resetRepo}
        </button>
    </div>
    <div class="b3-label__text">${window.shehab.languages.dataRepoKeyTip1}</div>
    <div class="b3-label__text ft__error">${window.shehab.languages.dataRepoKeyTip2}</div>
</div>
<div class="b3-label${window.shehab.config.readonly ? " fn__none" : ""}">
    ${window.shehab.languages.dataRepoPurge}
    <div class="fn__hr"></div>
    <button class="b3-button b3-button--outline fn__block" id="purgeRepo">
        <svg><use xlink:href="#iconTrashcan"></use></svg>${window.shehab.languages.purge}
    </button>
    <div class="b3-label__text">${window.shehab.languages.dataRepoPurgeTip}</div>
    <div class="fn__hr"></div>
    <input class="b3-text-field fn__block" style="padding-right: 64px;" id="indexRetentionDays" min="1" type="number" class="b3-text-field" value="${window.shehab.config.repo.indexRetentionDays}">
    <div class="b3-label__text">${window.shehab.languages.dataRepoAutoPurgeIndexRetentionDays}</div>
    <div class="fn__hr"></div>
    <input class="b3-text-field fn__block" style="padding-right: 64px;" id="retentionIndexesDaily" min="1" type="number" class="b3-text-field" value="${window.shehab.config.repo.retentionIndexesDaily}">
    <div class="b3-label__text">${window.shehab.languages.dataRepoAutoPurgeRetentionIndexesDaily}</div>
</div>
<div class="b3-label">
    ${window.shehab.languages.vacuumDataIndex}
    <div class="fn__hr"></div>
    <button class="b3-button b3-button--outline fn__block" id="vacuumDataIndex">
       <svg><use xlink:href="#iconRefresh"></use></svg>${window.shehab.languages.vacuumDataIndex}
    </button>
    <div class="b3-label__text">${window.shehab.languages.vacuumDataIndexTip}</div>
</div>
<div class="b3-label">
    ${window.shehab.languages.rebuildDataIndex}
    <div class="fn__hr"></div>
    <button class="b3-button b3-button--outline fn__block" id="rebuildDataIndex">
       <svg><use xlink:href="#iconRefresh"></use></svg>${window.shehab.languages.rebuildDataIndex}
    </button>
    <div class="b3-label__text">${window.shehab.languages.rebuildDataIndexTip}</div>
</div>
<div class="b3-label">
    ${window.shehab.languages.systemLog}
    <div class="fn__hr"></div>
    <button class="b3-button b3-button--outline fn__block" id="exportLog">
       <svg><use xlink:href="#iconUpload"></use></svg>${window.shehab.languages.export}
    </button>
    <div class="b3-label__text">${window.shehab.languages.systemLogTip}</div>
</div>
<div class="b3-label">
    ${window.shehab.languages.export} Data
    <div class="fn__hr"></div>
    <button class="b3-button b3-button--outline fn__block" id="exportData">
       <svg><use xlink:href="#iconUpload"></use></svg>${window.shehab.languages.export}
    </button>
    <div class="b3-label__text">${window.shehab.languages.exportDataTip}</div>
</div>
<div class="b3-label${window.shehab.config.readonly ? " fn__none" : ""}">
    <div class="fn__flex">
        ${window.shehab.languages.import} Data
    </div>
    <div class="fn__hr"></div>
    <button class="b3-button b3-button--outline fn__block" style="position: relative">
        <input id="importData" class="b3-form__upload" type="file">
        <svg><use xlink:href="#iconDownload"></use></svg> ${window.shehab.languages.import}
    </button>
    <div class="b3-label__text">${window.shehab.languages.importDataTip}</div>
</div>
<div class="b3-label">
    ${window.shehab.languages.exportConf}
    <div class="fn__hr"></div>
    <button class="b3-button b3-button--outline fn__block" id="exportConf">
       <svg><use xlink:href="#iconUpload"></use></svg>${window.shehab.languages.export}
    </button>
    <div class="b3-label__text">${window.shehab.languages.exportConfTip}</div>
</div>
<div class="b3-label${window.shehab.config.readonly ? " fn__none" : ""}">
    <div class="fn__flex">
        ${window.shehab.languages.importConf}
    </div>
    <div class="fn__hr"></div>
    <button class="b3-button b3-button--outline fn__block" style="position: relative">
        <input id="importConf" class="b3-form__upload" type="file">
        <svg><use xlink:href="#iconDownload"></use></svg> ${window.shehab.languages.import}
    </button>
    <div class="b3-label__text">${window.shehab.languages.importConfTip}</div>
</div>
<div class="b3-label${(!window.shehab.config.readonly && (isInAndroid() || isInIOS() || isInHarmony())) ? "" : " fn__none"}">
    ${window.shehab.languages.workspaceList}
    <div class="fn__hr"></div>
    <button id="openWorkspace" class="b3-button b3-button--outline fn__block">${window.shehab.languages.openBy}...</button>
    <div class="fn__hr"></div>
    <ul id="workspaceDir" class="b3-list b3-list--background"></ul>
    <div class="fn__hr"></div>
    <button id="creatWorkspace" class="b3-button fn__block">${window.shehab.languages.new}</button>
</div>
<div class="b3-label${window.shehab.config.readonly ? " fn__none" : ""}">
    ${window.shehab.languages.about13}
    <div class="fn__hr"></div>
    <div class="b3-form__icon">
        <input class="b3-text-field fn__block" id="token" style="padding-right: 64px;" value="${window.shehab.config.api.token}">
        <button class="b3-button b3-button--text" id="tokenCopy" style="position: absolute;right: 0;height: 28px;">
            <svg><use xlink:href="#iconCopy"></use></svg>${window.shehab.languages.copy}
        </button>
    </div>
    <div class="b3-label__text" id="tokenTip">${window.shehab.languages.about14.replace("${token}", window.shehab.config.api.token)}</div>
</div>
<div class="b3-label">
    <div class="config-about__logo">
        <img src="/stage/icon.png">
        <span class="fn__space"></span>
        <div>
            <span>${window.shehab.languages.siyuanNote}</span>
            <span class="fn__space"></span>
            <span class="ft__on-surface">v${Constants.SIYUAN_VERSION}</span>
            <br>
            <span class="ft__on-surface">${window.shehab.languages.slogan}</span>
        </div>
    </div>
    <div style="color:var(--b3-theme-surface);font-family: cursive;">会泽百家&nbsp;至公天下</div>
    ${window.shehab.languages.about1} ${"harmony" === window.shehab.config.system.container? " • " + window.shehab.languages.feedback + " 845765@qq.com" : ""}
</div>
</div>`,
        bindEvent(modelMainElement: HTMLElement) {
            const workspaceDirElement = modelMainElement.querySelector("#workspaceDir");
            genWorkspace(workspaceDirElement);
            const importKeyElement = modelMainElement.querySelector("#importKey");
            modelMainElement.firstElementChild.addEventListener("click", (event) => {
                let target = event.target as HTMLElement;
                while (target && (target !== modelMainElement)) {
                    if (target.id === "authCode") {
                        setAccessAuthCode();
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    } else if (target.id === "importKey") {
                        const passwordDialog = new Dialog({
                            title: "🔑 " + window.shehab.languages.key,
                            content: `<div class="b3-dialog__content">
    <textarea spellcheck="false" style="resize: vertical;"  class="b3-text-field fn__block" placeholder="${window.shehab.languages.keyPlaceholder}"></textarea>
</div>
<div class="b3-dialog__action">
    <button class="b3-button b3-button--cancel">${window.shehab.languages.cancel}</button><div class="fn__space"></div>
    <button class="b3-button b3-button--text">${window.shehab.languages.confirm}</button>
</div>`,
                            width: "92vw",
                        });
                        passwordDialog.element.setAttribute("data-key", Constants.DIALOG_PASSWORD);
                        const textAreaElement = passwordDialog.element.querySelector("textarea");
                        textAreaElement.focus();
                        const btnsElement = passwordDialog.element.querySelectorAll(".b3-button");
                        btnsElement[0].addEventListener("click", () => {
                            passwordDialog.destroy();
                        });
                        btnsElement[1].addEventListener("click", () => {
                            fetchPost("/api/repo/importRepoKey", {key: textAreaElement.value}, (response) => {
                                window.shehab.config.repo.key = response.data.key;
                                importKeyElement.parentElement.classList.add("fn__none");
                                importKeyElement.parentElement.nextElementSibling.classList.remove("fn__none");
                                passwordDialog.destroy();
                            });
                        });
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    } else if (target.id === "initKey") {
                        confirmDialog("🔑 " + window.shehab.languages.genKey, window.shehab.languages.initRepoKeyTip, () => {
                            fetchPost("/api/repo/initRepoKey", {}, (response) => {
                                window.shehab.config.repo.key = response.data.key;
                                importKeyElement.parentElement.classList.add("fn__none");
                                importKeyElement.parentElement.nextElementSibling.classList.remove("fn__none");
                            });
                        });
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    } else if (target.id === "initKeyByPW") {
                        setKey(false, () => {
                            importKeyElement.parentElement.classList.add("fn__none");
                            importKeyElement.parentElement.nextElementSibling.classList.remove("fn__none");
                        });
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    } else if (target.id === "copyKey") {
                        showMessage(window.shehab.languages.copied);
                        writeText(window.shehab.config.repo.key);
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    } else if (target.id === "removeKey") {
                        confirmDialog("⚠️ " + window.shehab.languages.resetRepo, window.shehab.languages.resetRepoTip, () => {
                            fetchPost("/api/repo/resetRepo", {}, () => {
                                window.shehab.config.repo.key = "";
                                window.shehab.config.sync.enabled = false;
                                processSync();
                                importKeyElement.parentElement.classList.remove("fn__none");
                                importKeyElement.parentElement.nextElementSibling.classList.add("fn__none");
                            });
                        });
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    } else if (target.id === "purgeRepo") {
                        confirmDialog("♻️ " + window.shehab.languages.dataRepoPurge, window.shehab.languages.dataRepoPurgeConfirm, () => {
                            fetchPost("/api/repo/purgeRepo");
                        });
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    } else if (target.id === "tokenCopy") {
                        showMessage(window.shehab.languages.copied);
                        writeText(window.shehab.config.api.token);
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    } else if (target.id === "exportData") {
                        fetchPost("/api/export/exportData", {}, response => {
                            openByMobile(response.data.zip);
                        });
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    } else if (target.id === "exportConf") {
                        fetchPost("/api/system/exportConf", {}, response => {
                            openByMobile(response.data.zip);
                        });
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    } else if (target.id === "vacuumDataIndex") {
                        fetchPost("/api/system/vacuumDataIndex", {}, () => {});
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    } else if (target.id === "rebuildDataIndex") {
                        fetchPost("/api/system/rebuildDataIndex", {}, () => {});
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    } else if (target.id === "exportLog") {
                        fetchPost("/api/system/exportLog", {}, (response) => {
                            openByMobile(response.data.zip);
                        });
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    } else if (target.id === "openWorkspace") {
                        fetchPost("/api/system/getMobileWorkspaces", {}, (response) => {
                            let selectHTML = "";
                            response.data.forEach((item: string, index: number) => {
                                selectHTML += `<option value="${item}"${index === 0 ? ' selected="selected"' : ""}>${pathPosix().basename(item)}</option>`;
                            });
                            const openWorkspaceDialog = new Dialog({
                                title: window.shehab.languages.openBy,
                                content: `<div class="b3-dialog__content">
    <select class="b3-text-field fn__block">${selectHTML}</select>
</div>
<div class="b3-dialog__action">
    <button class="b3-button b3-button--cancel">${window.shehab.languages.cancel}</button><div class="fn__space"></div>
    <button class="b3-button b3-button--text">${window.shehab.languages.confirm}</button>
</div>`,
                                width: "92vw",
                            });
                            openWorkspaceDialog.element.setAttribute("data-key", Constants.SIYUAN_OPEN_WORKSPACE);
                            const btnsElement = openWorkspaceDialog.element.querySelectorAll(".b3-button");
                            btnsElement[0].addEventListener("click", () => {
                                openWorkspaceDialog.destroy();
                            });
                            btnsElement[1].addEventListener("click", () => {
                                const openPath = openWorkspaceDialog.element.querySelector("select").value;
                                if (openPath === window.shehab.config.system.workspaceDir) {
                                    openWorkspaceDialog.destroy();
                                    return;
                                }
                                confirmDialog(window.shehab.languages.confirm, `${pathPosix().basename(window.shehab.config.system.workspaceDir)} -> ${pathPosix().basename(openPath)}?`, () => {
                                    fetchPost("/api/system/setWorkspaceDir", {
                                        path: openPath
                                    }, () => {
                                        exitSiYuan(false);
                                    });
                                });
                            });
                        });
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    } else if (target.id === "creatWorkspace") {
                        const createWorkspaceDialog = new Dialog({
                            title: window.shehab.languages.new,
                            content: `<div class="b3-dialog__content">
    <input class="b3-text-field fn__block">
</div>
<div class="b3-dialog__action">
    <button class="b3-button b3-button--cancel">${window.shehab.languages.cancel}</button><div class="fn__space"></div>
    <button class="b3-button b3-button--text">${window.shehab.languages.confirm}</button>
</div>`,
                            width: "92vw",
                        });
                        createWorkspaceDialog.element.setAttribute("data-key", Constants.DIALOG_CREATEWORKSPACE);
                        const inputElement = createWorkspaceDialog.element.querySelector("input");
                        inputElement.focus();
                        const btnsElement = createWorkspaceDialog.element.querySelectorAll(".b3-button");
                        btnsElement[0].addEventListener("click", () => {
                            createWorkspaceDialog.destroy();
                        });
                        btnsElement[1].addEventListener("click", () => {
                            fetchPost("/api/system/createWorkspaceDir", {
                                path: pathPosix().join(pathPosix().dirname(window.shehab.config.system.workspaceDir), inputElement.value)
                            }, () => {
                                genWorkspace(workspaceDirElement);
                                createWorkspaceDialog.destroy();
                            });
                        });
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    } else if (target.getAttribute("data-type") === "remove") {
                        const removePath = target.parentElement.getAttribute("data-path");
                        fetchPost("/api/system/removeWorkspaceDir", {path: removePath}, () => {
                            genWorkspace(workspaceDirElement);
                            confirmDialog(window.shehab.languages.deleteOpConfirm, window.shehab.languages.removeWorkspacePhysically.replace("${x}", removePath), () => {
                                fetchPost("/api/system/removeWorkspaceDirPhysically", {path: removePath});
                            }, undefined, true);
                        });
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    } else if (target.classList.contains("b3-list-item") && !target.classList.contains("b3-list-item--focus")) {
                        confirmDialog(window.shehab.languages.confirm, `${pathPosix().basename(window.shehab.config.system.workspaceDir)} -> ${pathPosix().basename(target.getAttribute("data-path"))}?`, () => {
                            fetchPost("/api/system/setWorkspaceDir", {
                                path: target.getAttribute("data-path")
                            }, () => {
                                exitSiYuan(false);
                            });
                        });
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    }
                    target = target.parentElement;
                }
            });
            modelMainElement.querySelector("#importData").addEventListener("change", (event: InputEvent & {
                target: HTMLInputElement
            }) => {
                const formData = new FormData();
                formData.append("file", event.target.files[0]);
                fetchPost("/api/import/importData", formData);
            });
            modelMainElement.querySelector("#importConf").addEventListener("change", (event: InputEvent & {
                target: HTMLInputElement
            }) => {
                const formData = new FormData();
                formData.append("file", event.target.files[0]);
                fetchPost("/api/system/importConf", formData, (response) => {
                    if (response.code !== 0) {
                        showMessage(response.msg);
                        return;
                    }

                    exitSiYuan();
                });
            });
            const networkServeElement = modelMainElement.querySelector("#networkServe") as HTMLInputElement;
            networkServeElement.addEventListener("change", () => {
                fetchPost("/api/system/setNetworkServe", {networkServe: networkServeElement.checked}, () => {
                    exitSiYuan();
                });
            });
            const tokenElement = modelMainElement.querySelector("#token") as HTMLInputElement;
            tokenElement.addEventListener("change", () => {
                fetchPost("/api/system/setAPIToken", {token: tokenElement.value}, () => {
                    window.shehab.config.api.token = tokenElement.value;
                    modelMainElement.querySelector("#tokenTip").innerHTML = window.shehab.languages.about14.replace("${token}", window.shehab.config.api.token);
                });
            });
            const indexRetentionDaysElement = modelMainElement.querySelector("#indexRetentionDays") as HTMLInputElement;
            indexRetentionDaysElement.addEventListener("change", () => {
                fetchPost("/api/repo/setRepoIndexRetentionDays", {days: parseInt(indexRetentionDaysElement.value)}, () => {
                    window.shehab.config.repo.indexRetentionDays = parseInt(indexRetentionDaysElement.value);
                });
            });
            const retentionIndexesDailyElement = modelMainElement.querySelector("#retentionIndexesDaily") as HTMLInputElement;
            retentionIndexesDailyElement.addEventListener("change", () => {
                fetchPost("/api/repo/setRetentionIndexesDaily", {indexes: parseInt(retentionIndexesDailyElement.value)}, () => {
                    window.shehab.config.repo.retentionIndexesDaily = parseInt(retentionIndexesDailyElement.value);
                });
            });
        }
    });
};

const genWorkspace = (workspaceDirElement: Element) => {
    fetchPost("/api/system/getWorkspaces", {}, (response) => {
        let html = "";
        response.data.forEach((item: IWorkspace) => {
            html += `<li data-path="${item.path}" class="b3-list-item b3-list-item--narrow${window.shehab.config.system.workspaceDir === item.path ? " b3-list-item--focus" : ""}">
    <span class="b3-list-item__text">${pathPosix().basename(item.path)}</span>
    <span data-type="remove" class="b3-list-item__action">
        <svg><use xlink:href="#iconMin"></use></svg>
    </span>
</li>`;
        });
        workspaceDirElement.innerHTML = html;
    });
};
