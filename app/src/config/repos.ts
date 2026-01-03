import {isPaidUser, needSubscribe} from "../util/needSubscribe";
import {fetchPost} from "../util/fetch";
import {showMessage} from "../dialog/message";
import {bindSyncCloudListEvent, getSyncCloudList} from "../sync/syncGuide";
import {processSync} from "../dialog/processSystem";
import {getCloudURL} from "./util/about";
import {openByMobile} from "../protyle/util/compatibility";
import {confirmDialog} from "../dialog/confirmDialog";

const renderProvider = (provider: number) => {
    if (provider === 0) {
        if (needSubscribe("")) {
            return `<div class="b3-label b3-label--inner">${window.shehab.config.system.container === "ios" ? window.shehab.languages._kernel[122] : window.shehab.languages._kernel[29].replaceAll("${accountServer}", getCloudURL(""))}</div>
<div class="b3-label b3-label--inner">
    ${window.shehab.languages.cloudIntro1}
    <div class="b3-label__text">
        <ul class="fn__list">
            <li>${window.shehab.languages.cloudIntro2}</li>
            <li>${window.shehab.languages.cloudIntro3}</li>
            <li>${window.shehab.languages.cloudIntro4}</li>
            <li>${window.shehab.languages.cloudIntro5}</li>
            <li>${window.shehab.languages.cloudIntro6}</li>
            <li>${window.shehab.languages.cloudIntro7}</li>
            <li>${window.shehab.languages.cloudIntro8}</li>
        </ul>
    </div>
</div>
<div class="b3-label b3-label--inner">
    ${window.shehab.languages.cloudIntro9}
    <div class="b3-label__text">
        <ul style="padding-left: 2em">
            <li>${window.shehab.languages.cloudIntro10}</li>
            <li>${window.shehab.languages.cloudIntro11}</li>
        </ul>
    </div>
</div>`;
        }
        return `<div class="b3-label b3-label--inner">
    ${window.shehab.languages.syncOfficialProviderIntro}
</div>`;
    }
    if (!isPaidUser()) {
        return `<div>
    ${window.shehab.languages["_kernel"][214].replaceAll("${accountServer}", getCloudURL(""))}
</div>
<div class="ft__error${provider == 4 ? "" : " fn__none"}">
    <div class="fn__hr--b"></div>
    ${window.shehab.languages.mobileNotSupport}
</div>`;
    }
    if (provider === 2) {
        return `<div class="b3-label b3-label--inner">
    ${window.shehab.languages.syncThirdPartyProviderS3Intro}
    <div class="fn__hr"></div>
    <em>${window.shehab.languages.proFeature}</em>
    <div class="fn__hr"></div>
    ${window.shehab.languages.syncThirdPartyProviderTip}
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-center fn__size200">Endpoint</div>
    <div class="fn__space"></div>
    <input id="endpoint" class="b3-text-field fn__block" value="${window.shehab.config.sync.s3.endpoint}">
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-center fn__size200">Access Key</div>
    <div class="fn__space"></div>
    <input id="accessKey" class="b3-text-field fn__block" value="${window.shehab.config.sync.s3.accessKey}">
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-center fn__size200">Secret Key</div>
    <div class="fn__space"></div>
    <div class="b3-form__icona fn__block">
        <input id="secretKey" type="password" class="b3-text-field b3-form__icona-input" value="${window.shehab.config.sync.s3.secretKey}">
        <svg class="b3-form__icona-icon" data-action="togglePassword"><use xlink:href="#iconEye"></use></svg>
    </div>
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-center fn__size200">Bucket</div>
    <div class="fn__space"></div>
    <input id="bucket" class="b3-text-field fn__block" value="${window.shehab.config.sync.s3.bucket}">
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-center fn__size200">Region ID</div>
    <div class="fn__space"></div>
    <input id="region" class="b3-text-field fn__block" value="${window.shehab.config.sync.s3.region}">
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-center fn__size200">Timeout (s)</div>
    <div class="fn__space"></div>
    <input id="timeout" class="b3-text-field fn__block" type="number" min="7" max="300" value="${window.shehab.config.sync.s3.timeout}">
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-center fn__size200">Addressing</div>
    <div class="fn__space"></div>
    <select class="b3-select fn__block" id="pathStyle">
        <option ${window.shehab.config.sync.s3.pathStyle ? "selected" : ""} value="true">Path-style</option>
        <option ${window.shehab.config.sync.s3.pathStyle ? "" : "selected"} value="false">Virtual-hosted-style</option>
    </select>
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-center fn__size200">TLS Verify</div>
    <div class="fn__space"></div>
    <select class="b3-select fn__block" id="s3SkipTlsVerify">
        <option ${window.shehab.config.sync.s3.skipTlsVerify ? "" : "selected"} value="false">Verify</option>
        <option ${window.shehab.config.sync.s3.skipTlsVerify ? "selected" : ""} value="true">Skip</option>
    </select>
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-center fn__size200">Concurrent Reqs</div>
    <div class="fn__space"></div>
    <input id="s3ConcurrentReqs" class="b3-text-field fn__block" type="number" min="1" max="16" value="${window.shehab.config.sync.s3.concurrentReqs}">
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-1"></div>
    <button class="b3-button b3-button--outline fn__size200" data-action="purgeData">
        <svg><use xlink:href="#iconTrashcan"></use></svg>${window.shehab.languages.purge}
    </button>
    <div class="fn__space"></div>
    <button class="b3-button b3-button--outline fn__size200" style="position: relative">
        <input id="importData" class="b3-form__upload" type="file" data-type="s3">
        <svg><use xlink:href="#iconDownload"></use></svg>${window.shehab.languages.import}
    </button>
    <div class="fn__space"></div>
    <button class="b3-button b3-button--outline fn__size200" data-action="exportData" data-type="s3">
        <svg><use xlink:href="#iconUpload"></use></svg>${window.shehab.languages.export}
    </button>
</div>`;
    } else if (provider === 3) {
        return `<div class="b3-label b3-label--inner">
    ${window.shehab.languages.syncThirdPartyProviderWebDAVIntro}
    <div class="fn__hr"></div>
    <em>${window.shehab.languages.proFeature}</em>
    <div class="fn__hr"></div>
    ${window.shehab.languages.syncThirdPartyProviderTip}
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-center fn__size200">Endpoint</div>
    <div class="fn__space"></div>
    <input id="endpoint" class="b3-text-field fn__block" value="${window.shehab.config.sync.webdav.endpoint}">
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-center fn__size200">Username</div>
    <div class="fn__space"></div>
    <input id="username" class="b3-text-field fn__block" value="${window.shehab.config.sync.webdav.username}">
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-center fn__size200">Password</div>
    <div class="fn__space"></div>
    <div class="b3-form__icona fn__block">
        <input id="password" type="password" class="b3-text-field b3-form__icona-input" value="${window.shehab.config.sync.webdav.password}">
        <svg class="b3-form__icona-icon" data-action="togglePassword"><use xlink:href="#iconEye"></use></svg>
    </div>
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-center fn__size200">Timeout (s)</div>
    <div class="fn__space"></div>
    <input id="timeout" class="b3-text-field fn__block" type="number" min="7" max="300" value="${window.shehab.config.sync.webdav.timeout}">
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-center fn__size200">TLS Verify</div>
    <div class="fn__space"></div>
    <select class="b3-select fn__block" id="webdavSkipTlsVerify">
        <option ${window.shehab.config.sync.webdav.skipTlsVerify ? "" : "selected"} value="false">Verify</option>
        <option ${window.shehab.config.sync.webdav.skipTlsVerify ? "selected" : ""} value="true">Skip</option>
    </select>
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-center fn__size200">Concurrent Reqs</div>
    <div class="fn__space"></div>
    <input id="webdavConcurrentReqs" class="b3-text-field fn__block" type="number" min="1" max="16" value="${window.shehab.config.sync.webdav.concurrentReqs}">
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-1"></div>
    <button class="b3-button b3-button--outline fn__size200" data-action="purgeData">
        <svg><use xlink:href="#iconTrashcan"></use></svg>${window.shehab.languages.purge}
    </button>
    <div class="fn__space"></div>
    <button class="b3-button b3-button--outline fn__size200" style="position: relative">
        <input id="importData" class="b3-form__upload" type="file" data-type="webdav">
        <svg><use xlink:href="#iconDownload"></use></svg>${window.shehab.languages.import}
    </button>
    <div class="fn__space"></div>
    <button class="b3-button b3-button--outline fn__size200" data-action="exportData" data-type="webdav">
        <svg><use xlink:href="#iconUpload"></use></svg>${window.shehab.languages.export}
    </button>
</div>`;
    } else if (provider === 4) {
        return `<div class="b3-label b3-label--inner">
    <div class="ft__error">
        ${window.shehab.languages.mobileNotSupport}
    </div>
    <div class="fn__hr"></div>
    ${window.shehab.languages.syncThirdPartyProviderLocalIntro}
    <div class="fn__hr"></div>
    <em>${window.shehab.languages.proFeature}</em>
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-center fn__size200">Endpoint</div>
    <div class="fn__space"></div>
    <input id="endpoint" class="b3-text-field fn__block" value="${window.shehab.config.sync.local.endpoint}">
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-center fn__size200">Timeout (s)</div>
    <div class="fn__space"></div>
    <input id="timeout" class="b3-text-field fn__block" type="number" min="7" max="300" value="${window.shehab.config.sync.local.timeout}">
</div>
<div class="b3-label b3-label--inner fn__flex">
    <div class="fn__flex-center fn__size200">Concurrent Reqs</div>
    <div class="fn__space"></div>
    <input id="localConcurrentReqs" class="b3-text-field fn__block" type="number" min="1" max="1024" value="${window.shehab.config.sync.local.concurrentReqs}">
</div>`;
    }
    return "";
};

const bindProviderEvent = () => {
    const importElement = repos.element.querySelector("#importData") as HTMLInputElement;
    if (importElement) {
        importElement.addEventListener("change", () => {
            const formData = new FormData();
            formData.append("file", importElement.files[0]);
            const isS3 = importElement.getAttribute("data-type") === "s3";
            fetchPost(isS3 ? "/api/sync/importSyncProviderS3" : "/api/sync/importSyncProviderWebDAV", formData, (response) => {
                if (isS3) {
                    window.shehab.config.sync.s3 = response.data.s3;
                } else {
                    window.shehab.config.sync.webdav = response.data.webdav;
                }
                repos.element.querySelector("#syncProviderPanel").innerHTML = renderProvider(window.shehab.config.sync.provider);
                bindProviderEvent();
                showMessage(window.shehab.languages.imported);
                importElement.value = "";
            });
        });
    }

    const reposDataElement = repos.element.querySelector("#reposData");
    const loadingElement = repos.element.querySelector("#reposLoading");
    if (window.shehab.config.sync.provider === 0) {
        if (needSubscribe("")) {
            loadingElement.classList.add("fn__none");
            let nextElement = reposDataElement;
            while (nextElement) {
                nextElement.classList.add("fn__none");
                nextElement = nextElement.nextElementSibling;
            }
            return;
        }
        fetchPost("/api/cloud/getCloudSpace", {}, (response) => {
            loadingElement.classList.add("fn__none");
            if (response.code === 1) {
                reposDataElement.innerHTML = response.msg;
                return;
            } else {
                reposDataElement.innerHTML = `<div class="fn__flex">
    <div class="fn__flex-1">
        ${window.shehab.languages.cloudStorage}
        <div class="fn__hr"></div>
        <ul class="b3-list" style="margin-left: 12px">
            <li class="b3-list-item" style="cursor: auto;">${window.shehab.languages.sync}<span class="b3-list-item__meta">${response.data.sync ? response.data.sync.hSize : "0B"}</span></li>
            <li class="b3-list-item" style="cursor: auto;">${window.shehab.languages.backup}<span class="b3-list-item__meta">${response.data.backup ? response.data.backup.hSize : "0B"}</span></li>
            <li class="b3-list-item" style="cursor: auto;"><a href="${getCloudURL("settings/file?type=3")}" target="_blank">${window.shehab.languages.cdn}</a><span class="b3-list-item__meta">${response.data.hAssetSize}</span></li>
            <li class="b3-list-item" style="cursor: auto;">${window.shehab.languages.total}<span class="b3-list-item__meta">${response.data.hSize}</span></li>
            <li class="b3-list-item" style="cursor: auto;">${window.shehab.languages.sizeLimit}<span class="b3-list-item__meta">${response.data.hTotalSize}</span></li>
            <li class="b3-list-item" style="cursor: auto;"><a href="${getCloudURL("settings/point")}" target="_blank">${window.shehab.languages.pointExchangeSize}</a><span class="b3-list-item__meta">${response.data.hExchangeSize}</span></li>
        </ul>
    </div>
    <div class="fn__flex-1">
        ${window.shehab.languages.trafficStat}
        <div class="fn__hr"></div>
        <ul class="b3-list" style="margin-left: 12px">
            <li class="b3-list-item" style="cursor: auto;">${window.shehab.languages.upload}<span class="fn__space"></span><span class="ft__on-surface">${response.data.hTrafficUploadSize}</span></li>
            <li class="b3-list-item" style="cursor: auto;">${window.shehab.languages.download}<span class="fn__space"></span><span class="ft__on-surface">${response.data.hTrafficDownloadSize}</span></li>
            <li class="b3-list-item" style="cursor: auto;">API GET<span class="fn__space"></span><span class="ft__on-surface">${response.data.hTrafficAPIGet}</span></li>
            <li class="b3-list-item" style="cursor: auto;">API PUT<span class="fn__space"></span><span class="ft__on-surface">${response.data.hTrafficAPIPut}</span></li>
        </ul>
    </div>
</div>`;
            }
        });
        reposDataElement.classList.remove("fn__none");
        return;
    }

    loadingElement.classList.add("fn__none");
    let nextElement = reposDataElement.nextElementSibling;
    while (nextElement) {
        if (isPaidUser()) {
            nextElement.classList.remove("fn__none");
        } else {
            nextElement.classList.add("fn__none");
        }
        nextElement = nextElement.nextElementSibling;
    }
    reposDataElement.classList.add("fn__none");
    const providerPanelElement = repos.element.querySelector("#syncProviderPanel");
    providerPanelElement.querySelectorAll(".b3-text-field, .b3-select").forEach(item => {
        item.addEventListener("blur", () => {
            if (window.shehab.config.sync.provider === 2) {
                let timeout = parseInt((providerPanelElement.querySelector("#timeout") as HTMLInputElement).value, 10);
                if (7 > timeout) {
                    if (1 > timeout) {
                        timeout = 30;
                    } else {
                        timeout = 7;
                    }
                }
                if (300 < timeout) {
                    timeout = 300;
                }
                let concurrentReqs = parseInt((providerPanelElement.querySelector("#s3ConcurrentReqs") as HTMLInputElement).value, 10);
                if (1 > concurrentReqs) {
                    concurrentReqs = 1;
                }
                if (16 < concurrentReqs) {
                    concurrentReqs = 16;
                }
                (providerPanelElement.querySelector("#timeout") as HTMLInputElement).value = timeout.toString();
                let endpoint = (providerPanelElement.querySelector("#endpoint") as HTMLInputElement).value;
                endpoint = endpoint.trim().replace("http://http(s)://", "https://");
                endpoint = endpoint.replace("http(s)://", "https://");
                if (!endpoint.startsWith("http")) {
                    endpoint = "http://" + endpoint;
                }
                const s3 = {
                    endpoint: endpoint,
                    accessKey: (providerPanelElement.querySelector("#accessKey") as HTMLInputElement).value.trim(),
                    secretKey: (providerPanelElement.querySelector("#secretKey") as HTMLInputElement).value.trim(),
                    bucket: (providerPanelElement.querySelector("#bucket") as HTMLInputElement).value.trim(),
                    pathStyle: (providerPanelElement.querySelector("#pathStyle") as HTMLInputElement).value === "true",
                    region: (providerPanelElement.querySelector("#region") as HTMLInputElement).value.trim(),
                    skipTlsVerify: (providerPanelElement.querySelector("#s3SkipTlsVerify") as HTMLInputElement).value === "true",
                    timeout: timeout,
                    concurrentReqs: concurrentReqs,
                };
                fetchPost("/api/sync/setSyncProviderS3", {s3}, () => {
                    window.shehab.config.sync.s3 = s3;
                });
            } else if (window.shehab.config.sync.provider === 3) {
                let timeout = parseInt((providerPanelElement.querySelector("#timeout") as HTMLInputElement).value, 10);
                if (7 > timeout) {
                    timeout = 7;
                }
                if (300 < timeout) {
                    timeout = 300;
                }
                let concurrentReqs = parseInt((providerPanelElement.querySelector("#webdavConcurrentReqs") as HTMLInputElement).value, 10);
                if (1 > concurrentReqs) {
                    concurrentReqs = 1;
                }
                if (16 < concurrentReqs) {
                    concurrentReqs = 16;
                }
                (providerPanelElement.querySelector("#timeout") as HTMLInputElement).value = timeout.toString();
                let endpoint = (providerPanelElement.querySelector("#endpoint") as HTMLInputElement).value;
                endpoint = endpoint.trim().replace("http://http(s)://", "https://");
                endpoint = endpoint.replace("http(s)://", "https://");
                if (!endpoint.startsWith("http")) {
                    endpoint = "http://" + endpoint;
                }
                const webdav = {
                    endpoint: endpoint,
                    username: (providerPanelElement.querySelector("#username") as HTMLInputElement).value.trim(),
                    password: (providerPanelElement.querySelector("#password") as HTMLInputElement).value.trim(),
                    skipTlsVerify: (providerPanelElement.querySelector("#webdavSkipTlsVerify") as HTMLInputElement).value === "true",
                    timeout: timeout,
                    concurrentReqs: concurrentReqs,
                };
                fetchPost("/api/sync/setSyncProviderWebDAV", {webdav}, () => {
                    window.shehab.config.sync.webdav = webdav;
                });
            } else if (window.shehab.config.sync.provider === 4) {
                let timeout = parseInt((providerPanelElement.querySelector("#timeout") as HTMLInputElement).value, 10);
                if (7 > timeout) {
                    timeout = 7;
                }
                if (300 < timeout) {
                    timeout = 300;
                }
                let concurrentReqs = parseInt((providerPanelElement.querySelector("#localConcurrentReqs") as HTMLInputElement).value, 10);
                if (1 > concurrentReqs) {
                    concurrentReqs = 1;
                }
                if (1024 < concurrentReqs) {
                    concurrentReqs = 1024;
                }
                (providerPanelElement.querySelector("#timeout") as HTMLInputElement).value = timeout.toString();
                const local = {
                    endpoint: (providerPanelElement.querySelector("#endpoint") as HTMLInputElement).value,
                    timeout: timeout,
                    concurrentReqs: concurrentReqs,
                };
                fetchPost("/api/sync/setSyncProviderLocal", {local}, (response) => {
                    if (response.code === 0) {
                        window.shehab.config.sync.local = response.data.local;

                        const endpoint = providerPanelElement.querySelector<HTMLInputElement>("#endpoint");
                        if (endpoint) {
                            endpoint.value = response.data.local.endpoint;
                        }
                    } else {
                        window.shehab.config.sync.local = local;
                    }
                });
            }
        });
    });
};

export const repos = {
    element: undefined as Element,
    genHTML: () => {
        return `<div>
<div style="position: fixed;width: 800px;height: 434px;box-sizing: border-box;text-align: center;display: flex;align-items: center;justify-content: center;z-index: 1;" id="reposLoading">
    <img src="/stage/loading-pure.svg">
</div>
<div class="fn__flex b3-label config__item">
    <div class="fn__flex-1">
        ${window.shehab.languages.syncProvider}
        <div class="b3-label__text">${window.shehab.languages.syncProviderTip}</div>
    </div>
    <span class="fn__space"></span>
    <select id="syncProvider" class="b3-select fn__flex-center fn__size200">
        <option value="0" ${window.shehab.config.sync.provider === 0 ? "selected" : ""}>SiYuan</option>
        <option value="2" ${window.shehab.config.sync.provider === 2 ? "selected" : ""}>S3</option>
        <option value="3" ${window.shehab.config.sync.provider === 3 ? "selected" : ""}>WebDAV</option>
        <option value="4" ${window.shehab.config.sync.provider === 4 ? "selected" : ""}>${window.shehab.languages.localFileSystem}</option>
    </select>
</div>
<div id="syncProviderPanel" class="b3-label">
    ${renderProvider(window.shehab.config.sync.provider)}
</div>
<div id="reposData" class="b3-label">
    <div class="fn__flex">
        <div class="fn__flex-1">
            ${window.shehab.languages.cloudStorage}
        </div>
        <div class="fn__flex-1">
            ${window.shehab.languages.trafficStat}
        </div>
    </div>
</div>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
        ${window.shehab.languages.openSyncTip1}
        <div class="b3-label__text">${window.shehab.languages.openSyncTip2}</div>
    </div>
    <span class="fn__space"></span>
    <input type="checkbox" id="reposCloudSyncSwitch"${window.shehab.config.sync.enabled ? " checked='checked'" : ""} class="b3-switch fn__flex-center">
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
        ${window.shehab.languages.generateConflictDoc}
        <div class="b3-label__text">${window.shehab.languages.generateConflictDocTip}</div>
    </div>
    <span class="fn__space"></span>
    <input type="checkbox" id="generateConflictDoc"${window.shehab.config.sync.generateConflictDoc ? " checked='checked'" : ""} class="b3-switch fn__flex-center">
</label>
<div class="b3-label">
    <div class="fn__flex config__item">
        <div class="fn__flex-1">
            ${window.shehab.languages.syncMode}
            <div class="b3-label__text">${window.shehab.languages.syncModeTip}</div>
        </div>
        <span class="fn__space"></span>
        <select id="syncMode" class="b3-select fn__flex-center fn__size200">
            <option value="1" ${window.shehab.config.sync.mode === 1 ? "selected" : ""}>${window.shehab.languages.syncMode1}</option>
            <option value="2" ${window.shehab.config.sync.mode === 2 ? "selected" : ""}>${window.shehab.languages.syncMode2}</option>
            <option value="3" ${window.shehab.config.sync.mode === 3 ? "selected" : ""}>${window.shehab.languages.syncMode3}</option>
        </select>
    </div>
    <div class="fn__flex b3-label${(window.shehab.config.sync.mode !== 1) ? " fn__none" : ""}">
        <div class="fn__flex-1">
            ${window.shehab.languages.syncInterval}
            <div class="b3-label__text">${window.shehab.languages.syncIntervalTip}</div>
        </div>
        <span class="fn__space"></span>
        <input type="number" min="30" max="43200" id="syncInterval" class="b3-text-field fn__flex-center" value="${window.shehab.config.sync.interval}" >
        <span class="fn__space"></span>        
        <span class="fn__flex-center ft__on-surface">${window.shehab.languages.second}</span> 
    </div>
    <label class="fn__flex b3-label${(window.shehab.config.sync.mode !== 1 || window.shehab.config.system.container === "docker" || window.shehab.config.sync.provider !== 0) ? " fn__none" : ""}">
        <div class="fn__flex-1">
            ${window.shehab.languages.syncPerception}
            <div class="b3-label__text">${window.shehab.languages.syncPerceptionTip}</div>
        </div>
        <span class="fn__space"></span>
        <input type="checkbox" id="syncPerception"${window.shehab.config.sync.perception ? " checked='checked'" : ""} class="b3-switch fn__flex-center">
    </label>
</div>
<div class="b3-label">
    <div class="fn__flex config__item">
        <div class="fn__flex-1">
            ${window.shehab.languages.cloudSyncDir}
            <div class="b3-label__text">${window.shehab.languages.cloudSyncDirTip}</div>
        </div>
        <div class="fn__space"></div>
        <button class="b3-button b3-button--outline fn__flex-center fn__size200" data-action="config">
            <svg><use xlink:href="#iconSettings"></use></svg>${window.shehab.languages.config}
        </button>
    </div>
    <div id="reposCloudSyncList" class="fn__none b3-label"><img style="margin: 0 auto;display: block;width: 64px;height: 100%" src="/stage/loading-pure.svg"></div>
</div>
<div class="b3-label fn__flex">
    <div class="fn__flex-center">${window.shehab.languages.cloudBackup}</div>
    <div class="b3-list-item__meta fn__flex-center">${window.shehab.languages.cloudBackupTip}</div>
</div>
</div>`;
    },
    bindEvent: () => {
        bindProviderEvent();
        const switchElement = repos.element.querySelector("#reposCloudSyncSwitch") as HTMLInputElement;
        switchElement.addEventListener("change", () => {
            if (switchElement.checked && window.shehab.config.sync.cloudName === "") {
                switchElement.checked = false;
                showMessage(window.shehab.languages._kernel[123]);
                return;
            }
            fetchPost("/api/sync/setSyncEnable", {enabled: switchElement.checked}, () => {
                window.shehab.config.sync.enabled = switchElement.checked;
                processSync();
            });
        });
        const syncIntervalElement = repos.element.querySelector("#syncInterval") as HTMLInputElement;
        syncIntervalElement.addEventListener("change", () => {
            let interval = parseInt(syncIntervalElement.value);
            if (30 > interval) {
                interval = 30;
            }
            if (43200 < interval) {
                interval = 43200;
            }
            syncIntervalElement.value = interval.toString();
            fetchPost("/api/sync/setSyncInterval", {interval: interval}, () => {
                window.shehab.config.sync.interval = interval;
                processSync();
            });
        });
        const syncPerceptionElement = repos.element.querySelector("#syncPerception") as HTMLInputElement;
        syncPerceptionElement.addEventListener("change", () => {
            fetchPost("/api/sync/setSyncPerception", {enabled: syncPerceptionElement.checked}, () => {
                window.shehab.config.sync.perception = syncPerceptionElement.checked;
                processSync();
            });
        });
        const switchConflictElement = repos.element.querySelector("#generateConflictDoc") as HTMLInputElement;
        switchConflictElement.addEventListener("change", () => {
            fetchPost("/api/sync/setSyncGenerateConflictDoc", {enabled: switchConflictElement.checked}, () => {
                window.shehab.config.sync.generateConflictDoc = switchConflictElement.checked;
            });
        });
        const syncModeElement = repos.element.querySelector("#syncMode") as HTMLSelectElement;
        syncModeElement.addEventListener("change", () => {
            fetchPost("/api/sync/setSyncMode", {mode: parseInt(syncModeElement.value, 10)}, () => {
                if (syncModeElement.value === "1" && window.shehab.config.sync.provider === 0 && window.shehab.config.system.container !== "docker") {
                    syncPerceptionElement.parentElement.classList.remove("fn__none");
                } else {
                    syncPerceptionElement.parentElement.classList.add("fn__none");
                }
                if (syncModeElement.value === "1") {
                    syncIntervalElement.parentElement.classList.remove("fn__none");
                } else {
                    syncIntervalElement.parentElement.classList.add("fn__none");
                }
                window.shehab.config.sync.mode = parseInt(syncModeElement.value, 10);
            });
        });
        const syncConfigElement = repos.element.querySelector("#reposCloudSyncList");
        const syncProviderElement = repos.element.querySelector("#syncProvider") as HTMLSelectElement;
        syncProviderElement.addEventListener("change", () => {
            fetchPost("/api/sync/setSyncProvider", {provider: parseInt(syncProviderElement.value, 10)}, (response) => {
                if (response.code === 1) {
                    showMessage(response.msg);
                    syncProviderElement.value = "0";
                    window.shehab.config.sync.provider = 0;
                } else {
                    window.shehab.config.sync.provider = parseInt(syncProviderElement.value, 10);
                }
                repos.element.querySelector("#syncProviderPanel").innerHTML = renderProvider(window.shehab.config.sync.provider);
                bindProviderEvent();
                syncConfigElement.innerHTML = "";
                syncConfigElement.classList.add("fn__none");
                if (window.shehab.config.sync.mode !== 1 || window.shehab.config.system.container === "docker" || window.shehab.config.sync.provider !== 0) {
                    syncPerceptionElement.parentElement.classList.add("fn__none");
                } else {
                    syncPerceptionElement.parentElement.classList.remove("fn__none");
                }
                if (window.shehab.config.sync.mode !== 1) {
                    syncIntervalElement.parentElement.classList.add("fn__none");
                } else {
                    syncIntervalElement.parentElement.classList.remove("fn__none");
                }
            });
        });
        const loadingElement = repos.element.querySelector("#reposLoading") as HTMLElement;
        loadingElement.style.width = repos.element.clientWidth + "px";
        loadingElement.style.height = repos.element.clientHeight + "px";
        bindSyncCloudListEvent(syncConfigElement);
        repos.element.firstElementChild.addEventListener("click", (event) => {
            let target = event.target as HTMLElement;
            while (target && target !== repos.element) {
                const action = target.getAttribute("data-action");
                if (action === "config") {
                    if (syncConfigElement.classList.contains("fn__none")) {
                        getSyncCloudList(syncConfigElement, true);
                        syncConfigElement.classList.remove("fn__none");
                    } else {
                        syncConfigElement.classList.add("fn__none");
                    }
                    break;
                } else if (action === "togglePassword") {
                    const isEye = target.firstElementChild.getAttribute("xlink:href") === "#iconEye";
                    target.firstElementChild.setAttribute("xlink:href", isEye ? "#iconEyeoff" : "#iconEye");
                    target.previousElementSibling.setAttribute("type", isEye ? "text" : "password");
                    break;
                } else if (action === "exportData") {
                    fetchPost(target.getAttribute("data-type") === "s3" ? "/api/sync/exportSyncProviderS3" : "/api/sync/exportSyncProviderWebDAV", {}, response => {
                        openByMobile(response.data.zip);
                    });
                    break;
                } else if (action === "purgeData") {
                    confirmDialog("♻️ " + window.shehab.languages.cloudStoragePurge, `<div class="b3-typography">${window.shehab.languages.cloudStoragePurgeConfirm}</div>`, () => {
                        fetchPost("/api/repo/purgeCloudRepo");
                    });
                    break;
                }
                target = target.parentElement;
            }
        });
    },
};
