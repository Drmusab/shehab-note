// Cloud sync features disabled in Shehab fork
// This file has been simplified to provide only local data repo key management

import {showMessage} from "../dialog/message";
import {fetchPost} from "../util/fetch";
import {Dialog} from "../dialog";
import {confirmDialog} from "../dialog/confirmDialog";
import {isMobile} from "../util/functions";
import {App} from "../index";

const CLOUD_SYNC_DISABLED_MESSAGE = "Cloud sync is not available in Shehab. This is a local-first fork. Please use Export/Import Data for manual synchronization.";

export const addCloudName = (cloudPanelElement: Element) => {
    showMessage(CLOUD_SYNC_DISABLED_MESSAGE);
    return;
};

export const bindSyncCloudListEvent = (cloudPanelElement: Element, cb?: () => void) => {
    // Cloud sync disabled - no event binding needed
    return;
};

export const getSyncCloudList = (cloudPanelElement: Element, reload = false, cb?: () => void) => {
    cloudPanelElement.innerHTML = `<ul><li style="padding: 0 16px" class="b3-list--empty">${CLOUD_SYNC_DISABLED_MESSAGE}</li></ul>`;
    return;
};

export const syncGuide = (app?: App) => {
    showMessage(CLOUD_SYNC_DISABLED_MESSAGE);
    return;
};

// Keep setKey function for local data repo encryption
export const setKey = (isSync: boolean, cb?: () => void) => {
    const dialog = new Dialog({
        title: "🔑 " + window.shehab.languages.dataRepoKey,
        content: `<div class="b3-dialog__content">
    <div class="ft__smaller ft__on-surface">${window.shehab.languages.dataRepoKeyTip}</div>
    <div class="fn__hr--small"></div>
    <input placeholder="${window.shehab.languages.enterPassword}" class="b3-text-field fn__block" type="password">
    <div class="fn__hr--small"></div>
    <input placeholder="${window.shehab.languages.confirmPassword}" class="b3-text-field fn__block" type="password">
    <div class="fn__hr--small"></div>
    <div class="ft__smaller ft__on-surface">${window.shehab.languages.initRepoKeyTip}</div>
</div>
<div class="b3-dialog__action${isMobile() ? "" : " fn__none"}">
    <button class="b3-button b3-button--cancel">${window.shehab.languages.cancel}</button><div class="fn__space"></div>
    <button class="b3-button b3-button--text">${window.shehab.languages.confirm}</button>
</div>`,
        width: isMobile() ? "92vw" : "520px",
    });
    const inputElements = dialog.element.querySelectorAll("input");
    const btnsElement = dialog.element.querySelectorAll(".b3-button");
    dialog.bindInput(inputElements[1], () => {
        (btnsElement[1] as HTMLButtonElement).click();
    });
    btnsElement[0].addEventListener("click", () => {
        dialog.destroy();
    });
    btnsElement[1].addEventListener("click", () => {
        if (!inputElements[0].value || !inputElements[1].value) {
            showMessage(window.shehab.languages._kernel[142]);
            return;
        }
        if (inputElements[0].value !== inputElements[1].value) {
            showMessage(window.shehab.languages.passwordNoMatch);
            return;
        }
        confirmDialog("🔑 " + window.shehab.languages.genKeyByPW, window.shehab.languages.initRepoKeyTip, () => {
            dialog.destroy();
            fetchPost("/api/repo/initRepoKeyFromPassphrase", {pass: inputElements[0].value}, (response) => {
                window.shehab.config.repo.key = response.data.key;
                if (cb) {
                    cb();
                }
            });
        });
    });
    inputElements[0].focus();
};
