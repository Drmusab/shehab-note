/// #if !BROWSER
import * as path from "path";
/// #endif
import {Constants} from "../constants";
import {exportLayout, resetLayout} from "../layout/util";
import {isBrowser} from "../util/functions";
import {fetchPost} from "../util/fetch";
import {genLangOptions, genOptions} from "../util/genOptions";
import {openSnippets} from "./util/snippets";
import {loadAssets} from "../util/assets";
import {resetFloatDockSize} from "../layout/dock/util";
import {confirmDialog} from "../dialog/confirmDialog";
import {useShell} from "../util/pathName";
import {setStatusBar} from "./util/setStatusBar";

export const appearance = {
    element: undefined as Element,
    genHTML: () => {
        return `<div class="fn__flex b3-label config__item">
    <div class="fn__flex-1">
        ${window.shehab.languages.appearance4}
        <div class="b3-label__text">${window.shehab.languages.appearance5}</div>
    </div>
    <span class="fn__space"></span>
    <select class="b3-select fn__flex-center fn__size200" id="mode">
      <option value="0" ${(window.shehab.config.appearance.mode === 0 && !window.shehab.config.appearance.modeOS) ? "selected" : ""}>${window.shehab.languages.themeLight}</option>
      <option value="1" ${(window.shehab.config.appearance.mode === 1 && !window.shehab.config.appearance.modeOS) ? "selected" : ""}>${window.shehab.languages.themeDark}</option>
      <option value="2" ${window.shehab.config.appearance.modeOS ? "selected" : ""}>${window.shehab.languages.themeOS}</option>
    </select>
</div>
<div class="b3-label">
    <div class="fn__flex">
        <div class="fn__flex-center fn__flex-1">${window.shehab.languages.theme}</div>
        <span class="fn__space"></span>
        <button class="b3-button b3-button--outline fn__flex-center fn__size200${isBrowser() ? " fn__none" : ""}" id="appearanceOpenTheme">
            <svg><use xlink:href="#iconFolder"></use></svg>
            ${window.shehab.languages.appearance9}
        </button>
    </div>
    <div class="fn__hr"></div>
    <div class="fn__flex config__item">
        <div class="fn__flex-center fn__flex-1 ft__on-surface">
            ${window.shehab.languages.theme11}
        </div>
        <span class="fn__space"></span>
        <select class="b3-select fn__flex-center fn__size200" id="themeLight">
          ${genOptions(window.shehab.config.appearance.lightThemes, window.shehab.config.appearance.themeLight)}
        </select>
    </div>
    <div class="fn__hr"></div>
    <div class="fn__flex config__item">
        <div class="fn__flex-center fn__flex-1 ft__on-surface">
            ${window.shehab.languages.theme12}
        </div>
        <span class="fn__space"></span>
        <select class="b3-select fn__flex-center fn__size200" id="themeDark">
           ${genOptions(window.shehab.config.appearance.darkThemes, window.shehab.config.appearance.themeDark)}
        </select>
    </div>
</div>
<div class="b3-label">
    <div class="fn__flex config__item">
        <div class="fn__flex-center fn__flex-1">
            ${window.shehab.languages.icon}
        </div>
        <span class="fn__space"></span>
        <button class="b3-button b3-button--outline fn__flex-center fn__size200${isBrowser() ? " fn__none" : ""}" id="appearanceOpenIcon">
            <svg><use xlink:href="#iconFolder"></use></svg>
            ${window.shehab.languages.appearance8}
        </button>
    </div>
    <div class="fn__hr"></div>
    <div class="fn__flex config__item">
        <div class="fn__flex-center fn__flex-1 ft__on-surface">${window.shehab.languages.theme2}</div>
        <span class="fn__space"></span>
        <select class="b3-select fn__flex-center fn__size200" id="icon">
            ${genOptions(window.shehab.config.appearance.icons, window.shehab.config.appearance.icon)}
        </select>
    </div>
</div>
<div class="b3-label fn__flex">
    <div class="fn__block">
        <div>
            ${window.shehab.languages.appearance1}
        </div>
        <div class="fn__hr"></div>
        <div class="fn__flex config__item">
            <div class="fn__flex-center fn__flex-1 ft__on-surface">${window.shehab.languages.appearance2}</div>
            <span class="fn__space"></span>
            <select id="codeBlockThemeLight" class="b3-select fn__size200">
                ${genOptions(Constants.SIYUAN_CONFIG_APPEARANCE_LIGHT_CODE, window.shehab.config.appearance.codeBlockThemeLight)}
            </select>
        </div>
        <div class="fn__hr"></div>
        <div class="fn__flex config__item">
            <div class="fn__flex-center fn__flex-1 ft__on-surface">${window.shehab.languages.appearance3}</div>
            <span class="fn__space"></span>
            <select id="codeBlockThemeDark" class="b3-select fn__size200">
                ${genOptions(Constants.SIYUAN_CONFIG_APPEARANCE_DARK_CODE, window.shehab.config.appearance.codeBlockThemeDark)}
            </select>
        </div>
    </div>
</div>
<div class="fn__flex b3-label config__item">
    <div class="fn__flex-1">
        ${window.shehab.languages.language}
        <div class="b3-label__text">${window.shehab.languages.language1}</div>
    </div>
    <span class="fn__space"></span>
    <select id="lang" class="b3-select fn__flex-center fn__size200">${genLangOptions(window.shehab.config.langs, window.shehab.config.appearance.lang)}</select>
</div>
<div class="b3-label config__item${isBrowser() ? " fn__none" : " fn__flex"}">
    <div class="fn__flex-1">
        ${window.shehab.languages.customEmoji}
        <div class="b3-label__text">${window.shehab.languages.customEmojiTip}</div>
    </div>
    <span class="fn__space"></span>
    <button class="b3-button b3-button--outline fn__flex-center fn__size200" id="appearanceOpenEmoji">
        <svg><use xlink:href="#iconFolder"></use></svg>
        ${window.shehab.languages.showInFolder}
    </button>
</div>
<div class="b3-label fn__flex config__item">
   <div class="fn__flex-1">
        ${window.shehab.languages.resetLayout}
        <div class="b3-label__text">${window.shehab.languages.appearance6}</div>
    </div>
    <span class="fn__space"></span>
    <button class="b3-button b3-button--outline fn__flex-center fn__size200" id="resetLayout">
        <svg><use xlink:href="#iconUndo"></use></svg>${window.shehab.languages.reset}
    </button>
</div>
<div class="b3-label">
    <div class="fn__flex config__item">
        <div class="fn__flex-1 fn__flex-center">
            ${window.shehab.languages.codeSnippet}
        </div>
        <span class="fn__space"></span>
        <a class="b3-button b3-button--outline fn__flex-center fn__size200${"zh_CN" !== window.shehab.config.lang ? " fn__none" : ""}" target="_blank" href="https://ld246.com/tag/code-snippet">
            <svg><use xlink:href="#iconUpload"></use></svg>${window.shehab.languages.visitCommunityShare}
        </a>
    </div>
    <div class="fn__hr"></div>
    <div class="fn__flex config__item">
        <div class="fn__flex-center fn__flex-1 ft__on-surface">
            ${window.shehab.languages.codeSnippetTip}
        </div>
        <span class="fn__space"></span>
        <button class="b3-button b3-button--outline fn__flex-center fn__size200" id="codeSnippet">
            <svg><use xlink:href="#iconSettings"></use></svg>${window.shehab.languages.config}
        </button>
    </div>
</div>
<div class="b3-label">
    ${window.shehab.languages.appearance16}
    <div class="fn__hr"></div>
    <label class="fn__flex">
        <div class="fn__flex-center fn__flex-1 ft__on-surface">
           ${window.shehab.languages.appearance17}
        </div>
        <span class="fn__space"></span>
        <input class="b3-switch fn__flex-center" id="hideStatusBar" type="checkbox"${window.shehab.config.appearance.hideStatusBar ? " checked" : ""}>
    </label>
    <div class="fn__hr"></div>
    <div class="fn__flex config__item">
        <div class="fn__flex-center fn__flex-1 ft__on-surface">
            ${window.shehab.languages.appearance18}
        </div>
        <span class="fn__space"></span>
        <button class="b3-button b3-button--outline fn__flex-center fn__size200" id="statusBarSetting">
            <svg><use xlink:href="#iconSettings"></use></svg>${window.shehab.languages.config}
        </button>
    </div>
</div>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
        ${window.shehab.languages.appearance10}
        <div class="b3-label__text">${window.shehab.languages.appearance11}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="closeButtonBehavior" type="checkbox"${window.shehab.config.appearance.closeButtonBehavior === 0 ? "" : " checked"}>
</label>`;
    },
    _send: () => {
        const themeLight = (appearance.element.querySelector("#themeLight") as HTMLSelectElement).value;
        const themeDark = (appearance.element.querySelector("#themeDark") as HTMLSelectElement).value;
        const modeElementValue = parseInt((appearance.element.querySelector("#mode") as HTMLSelectElement).value);
        const OSTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        fetchPost("/api/setting/setAppearance", {
            icon: (appearance.element.querySelector("#icon") as HTMLSelectElement).value,
            mode: modeElementValue === 2 ? (OSTheme === "light" ? 0 : 1) : modeElementValue,
            modeOS: modeElementValue === 2,
            codeBlockThemeDark: (appearance.element.querySelector("#codeBlockThemeDark") as HTMLSelectElement).value,
            codeBlockThemeLight: (appearance.element.querySelector("#codeBlockThemeLight") as HTMLSelectElement).value,
            themeDark,
            themeLight,
            darkThemes: window.shehab.config.appearance.darkThemes,
            lightThemes: window.shehab.config.appearance.lightThemes,
            icons: window.shehab.config.appearance.icons,
            lang: (appearance.element.querySelector("#lang") as HTMLSelectElement).value,
            closeButtonBehavior: (appearance.element.querySelector("#closeButtonBehavior") as HTMLInputElement).checked ? 1 : 0,
            hideStatusBar: (appearance.element.querySelector("#hideStatusBar") as HTMLInputElement).checked,
            statusBar: {
                msgTaskDatabaseIndexCommitDisabled: window.shehab.config.appearance.statusBar.msgTaskDatabaseIndexCommitDisabled,
                msgTaskHistoryDatabaseIndexCommitDisabled: window.shehab.config.appearance.statusBar.msgTaskHistoryDatabaseIndexCommitDisabled,
                msgTaskAssetDatabaseIndexCommitDisabled: window.shehab.config.appearance.statusBar.msgTaskAssetDatabaseIndexCommitDisabled,
                msgTaskHistoryGenerateFileDisabled: window.shehab.config.appearance.statusBar.msgTaskHistoryGenerateFileDisabled,
            }
        }, () => {
            resetFloatDockSize();
        });
    },
    bindEvent: () => {
        setStatusBar(appearance.element.querySelector("#statusBarSetting"));
        appearance.element.querySelector("#codeSnippet").addEventListener("click", () => {
            openSnippets();
        });
        appearance.element.querySelector("#resetLayout").addEventListener("click", () => {
            confirmDialog("⚠️ " + window.shehab.languages.reset, window.shehab.languages.appearance6, () => {
                resetLayout();
            });
        });
        /// #if !BROWSER
        appearance.element.querySelector("#appearanceOpenIcon").addEventListener("click", () => {
            useShell("openPath", path.join(window.shehab.config.system.confDir, "appearance", "icons"));
        });
        appearance.element.querySelector("#appearanceOpenTheme").addEventListener("click", () => {
            useShell("openPath", path.join(window.shehab.config.system.confDir, "appearance", "themes"));
        });
        appearance.element.querySelector("#appearanceOpenEmoji").addEventListener("click", () => {
            useShell("openPath", path.join(window.shehab.config.system.dataDir, "emojis"));
        });
        /// #endif
        appearance.element.querySelectorAll("select").forEach(item => {
            item.addEventListener("change", () => {
                appearance._send();
            });
        });
        appearance.element.querySelectorAll(".b3-switch").forEach((item) => {
            item.addEventListener("change", () => {
                appearance._send();
            });
        });
    },
    onSetAppearance(data: Config.IAppearance) {
        if (data.lang !== window.shehab.config.appearance.lang) {
            exportLayout({
                cb() {
                    window.location.reload();
                },
                errorExit: false,
            });
            return;
        }

        window.shehab.config.appearance = data;
        if (appearance.element) {
            const modeElement = appearance.element.querySelector("#mode") as HTMLSelectElement;
            if (modeElement) {
                if (data.modeOS) {
                    modeElement.value = "2";
                } else {
                    modeElement.value = data.mode === 0 ? "0" : "1";
                }
            }
            const themeLightElement = appearance.element.querySelector("#themeLight") as HTMLSelectElement;
            if (themeLightElement) {
                themeLightElement.innerHTML = genOptions(window.shehab.config.appearance.lightThemes, window.shehab.config.appearance.themeLight);
            }
            const themeDarkElement = appearance.element.querySelector("#themeDark") as HTMLSelectElement;
            if (themeDarkElement) {
                themeDarkElement.innerHTML = genOptions(window.shehab.config.appearance.darkThemes, window.shehab.config.appearance.themeDark);
            }
            const iconElement = appearance.element.querySelector("#icon") as HTMLSelectElement;
            if (iconElement) {
                iconElement.innerHTML = genOptions(window.shehab.config.appearance.icons, window.shehab.config.appearance.icon);
            }
        }
        loadAssets(data);
        document.querySelector("#barMode use")?.setAttribute("xlink:href", `#icon${window.shehab.config.appearance.modeOS ? "Mode" : (window.shehab.config.appearance.mode === 0 ? "Light" : "Dark")}`);
    }
};
