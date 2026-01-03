import {fetchPost} from "../../util/fetch";
import {genLangOptions, genOptions} from "../../util/genOptions";
import {openModel} from "../menu/model";
import {setStatusBar} from "../../config/util/setStatusBar";

export const initAppearance = () => {
    openModel({
        title: window.shehab.languages.appearance,
        icon: "iconTheme",
        html: `<div class="b3-label">
    ${window.shehab.languages.appearance4}
    <div class="fn__hr"></div>
    <select class="b3-select fn__block" id="mode">
      <option value="0" ${(window.shehab.config.appearance.mode === 0 && !window.shehab.config.appearance.modeOS) ? "selected" : ""}>${window.shehab.languages.themeLight}</option>
      <option value="1" ${(window.shehab.config.appearance.mode === 1 && !window.shehab.config.appearance.modeOS) ? "selected" : ""}>${window.shehab.languages.themeDark}</option>
      <option value="2" ${window.shehab.config.appearance.modeOS ? "selected" : ""}>${window.shehab.languages.themeOS}</option>
    </select>
    <div class="b3-label__text">${window.shehab.languages.appearance5}</div>
</div>
<div class="b3-label">
    ${window.shehab.languages.theme}
    <div class="fn__hr"></div>
    <select class="b3-select fn__block" id="themeLight">
      ${genOptions(window.shehab.config.appearance.lightThemes, window.shehab.config.appearance.themeLight)}
    </select>
    <div class="b3-label__text">${window.shehab.languages.theme11}</div>
    <div class="fn__hr"></div>
    <select class="b3-select fn__block" id="themeDark">
       ${genOptions(window.shehab.config.appearance.darkThemes, window.shehab.config.appearance.themeDark)}
    </select>
    <div class="b3-label__text">${window.shehab.languages.theme12}</div>
</div>
<div class="b3-label">
    ${window.shehab.languages.icon}
    <div class="fn__hr"></div>
    <select class="b3-select fn__block" id="icon">
        ${genOptions(window.shehab.config.appearance.icons, window.shehab.config.appearance.icon)}
    </select>
    <div class="b3-label__text">${window.shehab.languages.theme2}</div>
</div>
<div class="b3-label">
    ${window.shehab.languages.language}
    <div class="fn__hr"></div>
    <select id="lang" class="b3-select fn__block">${genLangOptions(window.shehab.config.langs, window.shehab.config.appearance.lang)}</select>
    <div class="b3-label__text">${window.shehab.languages.language1}</div>
</div>
<div class="b3-label">
    <label class="fn__flex">
        <div class="fn__flex-1">
            ${window.shehab.languages.appearance16}
            <div class="b3-label__text">${window.shehab.languages.appearance17}</div>
        </div>
        <span class="fn__space"></span>
        <input class="b3-switch fn__flex-center" id="hideStatusBar" type="checkbox"${window.shehab.config.appearance.hideStatusBar ? " checked" : ""}>
    </label>
    <div class="fn__hr"></div>
    <button class="b3-button b3-button--outline fn__block" data-action="hideStatusBarSetting">
       <svg><use xlink:href="#iconSettings"></use></svg>${window.shehab.languages.config}
    </button>
    <div class="b3-label__text">${window.shehab.languages.appearance18}</div>
</div>`,
        bindEvent(modelMainElement: HTMLElement) {
            setStatusBar(modelMainElement.querySelector('[data-action="hideStatusBarSetting"]'));
            modelMainElement.querySelectorAll("select, .b3-switch").forEach(item => {
                item.addEventListener("change", () => {
                    const modeElementValue = parseInt((modelMainElement.querySelector("#mode") as HTMLSelectElement).value);
                    fetchPost("/api/setting/setAppearance", Object.assign({}, window.shehab.config.appearance, {
                        icon: (modelMainElement.querySelector("#icon") as HTMLSelectElement).value,
                        mode: modeElementValue === 2 ? window.shehab.config.appearance.mode : modeElementValue,
                        modeOS: modeElementValue === 2,
                        themeDark: (modelMainElement.querySelector("#themeDark") as HTMLSelectElement).value,
                        themeLight: (modelMainElement.querySelector("#themeLight") as HTMLSelectElement).value,
                        lang: (modelMainElement.querySelector("#lang") as HTMLSelectElement).value,
                        hideStatusBar: (modelMainElement.querySelector("#hideStatusBar") as HTMLInputElement).checked,
                    }));
                });
            });
        }
    });
};
