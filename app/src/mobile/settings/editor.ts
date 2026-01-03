import {openModel} from "../menu/model";
import {fetchPost} from "../../util/fetch";
import {reloadProtyle} from "../../protyle/util/reload";
import {setInlineStyle} from "../../util/assets";
import {confirmDialog} from "../../dialog/confirmDialog";

const setEditor = (modelMainElement: Element) => {
    let dynamicLoadBlocks = parseInt((modelMainElement.querySelector("#dynamicLoadBlocks") as HTMLInputElement).value);
    if (48 > dynamicLoadBlocks) {
        dynamicLoadBlocks = 48;
        (modelMainElement.querySelector("#dynamicLoadBlocks") as HTMLInputElement).value = "48";
    }
    if (1024 < dynamicLoadBlocks) {
        dynamicLoadBlocks = 1024;
        (modelMainElement.querySelector("#dynamicLoadBlocks") as HTMLInputElement).value = "1024";
    }
    window.shehab.config.editor.markdown = {
        inlineAsterisk: (modelMainElement.querySelector("#editorMarkdownInlineAsterisk") as HTMLInputElement).checked,
        inlineUnderscore: (modelMainElement.querySelector("#editorMarkdownInlineUnderscore") as HTMLInputElement).checked,
        inlineSup: (modelMainElement.querySelector("#editorMarkdownInlineSup") as HTMLInputElement).checked,
        inlineSub: (modelMainElement.querySelector("#editorMarkdownInlineSub") as HTMLInputElement).checked,
        inlineTag: (modelMainElement.querySelector("#editorMarkdownInlineTag") as HTMLInputElement).checked,
        inlineMath: (modelMainElement.querySelector("#editorMarkdownInlineMath") as HTMLInputElement).checked,
        inlineStrikethrough: (modelMainElement.querySelector("#editorMarkdownInlineStrikethrough") as HTMLInputElement).checked,
        inlineMark: (modelMainElement.querySelector("#editorMarkdownInlineMark") as HTMLInputElement).checked
    };
    window.shehab.config.editor.allowHTMLBLockScript = (modelMainElement.querySelector("#allowHTMLBLockScript") as HTMLInputElement).checked;
    window.shehab.config.editor.dynamicLoadBlocks = dynamicLoadBlocks;
    window.shehab.config.editor.justify = (modelMainElement.querySelector("#justify") as HTMLInputElement).checked;
    window.shehab.config.editor.rtl = (modelMainElement.querySelector("#rtl") as HTMLInputElement).checked;
    window.shehab.config.editor.readOnly = (modelMainElement.querySelector("#readOnly") as HTMLInputElement).checked;
    window.shehab.config.editor.displayBookmarkIcon = (modelMainElement.querySelector("#displayBookmarkIcon") as HTMLInputElement).checked;
    window.shehab.config.editor.displayNetImgMark = (modelMainElement.querySelector("#displayNetImgMark") as HTMLInputElement).checked;
    window.shehab.config.editor.codeSyntaxHighlightLineNum = (modelMainElement.querySelector("#codeSyntaxHighlightLineNum") as HTMLInputElement).checked;
    window.shehab.config.editor.embedBlockBreadcrumb = (modelMainElement.querySelector("#embedBlockBreadcrumb") as HTMLInputElement).checked;
    window.shehab.config.editor.headingEmbedMode = parseInt((modelMainElement.querySelector("#headingEmbedMode") as HTMLSelectElement).value);
    window.shehab.config.editor.listLogicalOutdent = (modelMainElement.querySelector("#listLogicalOutdent") as HTMLInputElement).checked;
    window.shehab.config.editor.listItemDotNumberClickFocus = (modelMainElement.querySelector("#listItemDotNumberClickFocus") as HTMLInputElement).checked;
    window.shehab.config.editor.spellcheck = (modelMainElement.querySelector("#spellcheck") as HTMLInputElement).checked;
    window.shehab.config.editor.onlySearchForDoc = (modelMainElement.querySelector("#onlySearchForDoc") as HTMLInputElement).checked;
    window.shehab.config.editor.plantUMLServePath = (modelMainElement.querySelector("#plantUMLServePath") as HTMLInputElement).value;
    window.shehab.config.editor.katexMacros = (modelMainElement.querySelector("#katexMacros") as HTMLTextAreaElement).value;
    window.shehab.config.editor.codeLineWrap = (modelMainElement.querySelector("#codeLineWrap") as HTMLInputElement).checked;
    window.shehab.config.editor.virtualBlockRef = (modelMainElement.querySelector("#virtualBlockRef") as HTMLInputElement).checked;
    window.shehab.config.editor.virtualBlockRefInclude = (modelMainElement.querySelector("#virtualBlockRefInclude") as HTMLTextAreaElement).value;
    window.shehab.config.editor.virtualBlockRefExclude = (modelMainElement.querySelector("#virtualBlockRefExclude") as HTMLTextAreaElement).value;
    window.shehab.config.editor.blockRefDynamicAnchorTextMaxLen = parseInt((modelMainElement.querySelector("#blockRefDynamicAnchorTextMaxLen") as HTMLInputElement).value);
    window.shehab.config.editor.backlinkExpandCount = parseInt((modelMainElement.querySelector("#backlinkExpandCount") as HTMLInputElement).value);
    window.shehab.config.editor.backmentionExpandCount = parseInt((modelMainElement.querySelector("#backmentionExpandCount") as HTMLInputElement).value);
    window.shehab.config.editor.backlinkContainChildren = (modelMainElement.querySelector("#backlinkContainChildren") as HTMLInputElement).checked;
    window.shehab.config.editor.codeLigatures = (modelMainElement.querySelector("#codeLigatures") as HTMLInputElement).checked;
    window.shehab.config.editor.codeTabSpaces = parseInt((modelMainElement.querySelector("#codeTabSpaces") as HTMLInputElement).value);
    window.shehab.config.editor.fontSize = parseInt((modelMainElement.querySelector("#fontSize") as HTMLInputElement).value);
    window.shehab.config.editor.generateHistoryInterval = parseInt((modelMainElement.querySelector("#generateHistoryInterval") as HTMLInputElement).value);
    window.shehab.config.editor.historyRetentionDays = parseInt((modelMainElement.querySelector("#historyRetentionDays") as HTMLInputElement).value);
    fetchPost("/api/setting/setEditor", window.shehab.config.editor, response => {
        window.shehab.config.editor = response.data;
        reloadProtyle(window.shehab.mobile.editor.protyle, false);
        setInlineStyle();
    });
};

export const initEditor = () => {
    let fontSizeHTML = "";
    for (let i = 9; i <= 72; i++) {
        fontSizeHTML += `<option ${window.shehab.config.editor.fontSize === i ? "selected" : ""} value="${i}">${i}</option>`;
    }
    openModel({
        title: window.shehab.languages.editor,
        icon: "iconEdit",
        html: `<label class="fn__flex b3-label">
    <div class="fn__flex-1">
        ${window.shehab.languages.justify}
        <div class="b3-label__text">${window.shehab.languages.justifyTip}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="justify" type="checkbox"${window.shehab.config.editor.justify ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
        ${window.shehab.languages.rtl}
        <div class="b3-label__text">${window.shehab.languages.rtlTip}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="rtl" type="checkbox"${window.shehab.config.editor.rtl ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
        ${window.shehab.languages.editReadonly}
        <div class="b3-label__text">${window.shehab.languages.editReadonlyTip}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="readOnly" type="checkbox"${window.shehab.config.editor.readOnly ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
        ${window.shehab.languages.md12}
        <div class="b3-label__text">${window.shehab.languages.md16}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="displayBookmarkIcon" type="checkbox"${window.shehab.config.editor.displayBookmarkIcon ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
        ${window.shehab.languages.md7}
        <div class="b3-label__text">${window.shehab.languages.md8}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="displayNetImgMark" type="checkbox"${window.shehab.config.editor.displayNetImgMark ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
        ${window.shehab.languages.embedBlockBreadcrumb}
        <div class="b3-label__text">${window.shehab.languages.embedBlockBreadcrumbTip}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="embedBlockBreadcrumb" type="checkbox"${window.shehab.config.editor.embedBlockBreadcrumb ? " checked" : ""}/>
</label>
<div class="b3-label">
    ${window.shehab.languages.headingEmbedMode}
    <span class="fn__hr"></span>
    <select class="b3-select fn__block" id="headingEmbedMode">
      <option value="0" ${window.shehab.config.editor.headingEmbedMode === 0 ? "selected" : ""}>${window.shehab.languages.showHeadingWithBlocks}</option>
      <option value="1" ${window.shehab.config.editor.headingEmbedMode === 1 ? "selected" : ""}>${window.shehab.languages.showHeadingOnlyTitle}</option>
      <option value="2" ${window.shehab.config.editor.headingEmbedMode === 2 ? "selected" : ""}>${window.shehab.languages.showHeadingOnlyBlocks}</option>
    </select>
    <div class="b3-label__text">${window.shehab.languages.headingEmbedModeTip}</div>
</div>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
        ${window.shehab.languages.outlineOutdent}
        <div class="b3-label__text">${window.shehab.languages.outlineOutdentTip}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="listLogicalOutdent" type="checkbox"${window.shehab.config.editor.listLogicalOutdent ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
        ${window.shehab.languages.listItemDotNumberClickFocus}
        <div class="b3-label__text">${window.shehab.languages.listItemDotNumberClickFocusTip}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="listItemDotNumberClickFocus" type="checkbox"${window.shehab.config.editor.listItemDotNumberClickFocus ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
        ${window.shehab.languages.spellcheck}
        <div class="b3-label__text">${window.shehab.languages.spellcheckTip}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="spellcheck" type="checkbox"${window.shehab.config.editor.spellcheck ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
        ${window.shehab.languages.onlySearchForDoc}
        <div class="b3-label__text">${window.shehab.languages.onlySearchForDocTip}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="onlySearchForDoc" type="checkbox"${window.shehab.config.editor.spellcheck ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
        ${window.shehab.languages.md31}
        <div class="b3-label__text">${window.shehab.languages.md32}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="codeLineWrap" type="checkbox"${window.shehab.config.editor.codeLineWrap ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
        ${window.shehab.languages.md2}
        <div class="b3-label__text">${window.shehab.languages.md3}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="codeLigatures" type="checkbox"${window.shehab.config.editor.codeLigatures ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
        ${window.shehab.languages.md27}
        <div class="b3-label__text">${window.shehab.languages.md28}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="codeSyntaxHighlightLineNum" type="checkbox"${window.shehab.config.editor.codeSyntaxHighlightLineNum ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
        ${window.shehab.languages.md33}
        <div class="b3-label__text">${window.shehab.languages.md34}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="virtualBlockRef" type="checkbox"${window.shehab.config.editor.virtualBlockRef ? " checked" : ""}/>
</label>
<div class="b3-label">
    ${window.shehab.languages.md9}
    <span class="fn__hr"></span>
    <textarea class="b3-text-field fn__block" id="virtualBlockRefInclude">${window.shehab.config.editor.virtualBlockRefInclude}</textarea>
    <div class="b3-label__text">${window.shehab.languages.md36}</div>
</div>
<div class="b3-label">
    ${window.shehab.languages.md35}
    <span class="fn__hr"></span>
    <textarea class="b3-text-field fn__block" id="virtualBlockRefExclude">${window.shehab.config.editor.virtualBlockRefExclude}</textarea>
    <div class="b3-label__text">${window.shehab.languages.md36}</div>
    <div class="b3-label__text">${window.shehab.languages.md41}</div>
</div>
<div class="b3-label">
    ${window.shehab.languages.md39}
    <span class="fn__hr"></span>
    <input class="b3-text-field fn__block" id="plantUMLServePath" value="${window.shehab.config.editor.plantUMLServePath}"/>
    <div class="b3-label__text">${window.shehab.languages.md40}</div>
</div>
<div class="b3-label">
    ${window.shehab.languages.dynamicLoadBlocks}
    <span class="fn__hr"></span>
    <input class="b3-text-field fn__block" id="dynamicLoadBlocks" type="number" min="48" value="${window.shehab.config.editor.dynamicLoadBlocks}"/>
    <div class="b3-label__text">${window.shehab.languages.dynamicLoadBlocksTip}</div>
</div>
<div class="b3-label">
    ${window.shehab.languages.md37}
    <span class="fn__hr"></span>
    <input class="b3-text-field fn__block" id="blockRefDynamicAnchorTextMaxLen" type="number" min="1" max="5120" value="${window.shehab.config.editor.blockRefDynamicAnchorTextMaxLen}"/>
    <div class="b3-label__text">${window.shehab.languages.md38}</div>
</div>
<div class="b3-label">
    ${window.shehab.languages.backlinkExpand}
    <span class="fn__hr"></span>
    <input class="b3-text-field fn__block" id="backlinkExpandCount" type="number" min="0" max="512" value="${window.shehab.config.editor.backlinkExpandCount}"/>
    <div class="b3-label__text">${window.shehab.languages.backlinkExpandTip}</div>
</div>
<div class="b3-label">
    ${window.shehab.languages.backmentionExpand}
    <span class="fn__hr"></span>
    <input class="b3-text-field fn__block" id="backmentionExpandCount" type="number" min="-1" max="512" value="${window.shehab.config.editor.backmentionExpandCount}"/>
    <div class="b3-label__text">${window.shehab.languages.backmentionExpandTip}</div>
</div>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
        ${window.shehab.languages.backlinkContainChildren}
        <div class="b3-label__text">${window.shehab.languages.backlinkContainChildrenTip}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="backlinkContainChildren" type="checkbox"${window.shehab.config.editor.backlinkContainChildren ? " checked" : ""}/>
</label>
<div class="b3-label">
    ${window.shehab.languages.generateHistory}
    <span class="fn__hr"></span>
    <input class="b3-text-field fn__block" id="generateHistoryInterval" type="number" min="0" max="120" value="${window.shehab.config.editor.generateHistoryInterval}"/>
    <div class="b3-label__text">${window.shehab.languages.generateHistoryInterval}</div>
</div>
<div class="b3-label">
    ${window.shehab.languages.historyRetentionDays} 
    <a href="javascript:void(0)" id="clearHistory">${window.shehab.languages.clearHistory}</a>
    <span class="fn__hr"></span>
    <input class="b3-text-field fn__block" id="historyRetentionDays" type="number" min="1" max="3650" value="${window.shehab.config.editor.historyRetentionDays}"/>
    <div class="b3-label__text">${window.shehab.languages.historyRetentionDaysTip}</div>
</div>
<div class="b3-label">
    ${window.shehab.languages.fontSize} 
    <span class="ft__on-surface">${window.shehab.config.editor.fontSize}</span>
    <div class="fn__hr"></div>
    <select id="fontSize" class="b3-select fn__block">${fontSizeHTML}</select>
    <div class="b3-label__text">${window.shehab.languages.fontSizeTip}</div>
</div>
<div class="b3-label">
    ${window.shehab.languages.md29} 
    <div class="fn__hr"></div>
    <select id="codeTabSpaces" class="b3-select fn__block">
        <option ${window.shehab.config.editor.codeTabSpaces === 0 ? "selected" : ""} value="0">0</option>
        <option ${window.shehab.config.editor.codeTabSpaces === 2 ? "selected" : ""} value="2">2</option>
        <option ${window.shehab.config.editor.codeTabSpaces === 4 ? "selected" : ""} value="4">4</option>
        <option ${window.shehab.config.editor.codeTabSpaces === 6 ? "selected" : ""} value="6">6</option>
        <option ${window.shehab.config.editor.codeTabSpaces === 8 ? "selected" : ""} value="8">8</option>
    </select>
    <div class="b3-label__text">${window.shehab.languages.md30}</div>
</div>
<div class="b3-label">
    ${window.shehab.languages.katexMacros}
    <div class="fn__hr"></div>
    <textarea class="b3-text-field fn__block" id="katexMacros">${window.shehab.config.editor.katexMacros}</textarea>
    <div class="b3-label__text">${window.shehab.languages.katexMacrosTip}</div>
</div>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
       ${window.shehab.languages.allowHTMLBLockScript}
        <div class="b3-label__text">${window.shehab.languages.allowHTMLBLockScriptTip}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="allowHTMLBLockScript" type="checkbox"${window.shehab.config.editor.allowHTMLBLockScript ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
       ${window.shehab.languages.editorMarkdownInlineAsterisk}
        <div class="b3-label__text">${window.shehab.languages.editorMarkdownInlineAsteriskTip}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="editorMarkdownInlineAsterisk" type="checkbox"${window.shehab.config.editor.markdown.inlineAsterisk ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
       ${window.shehab.languages.editorMarkdownInlineUnderscore}
        <div class="b3-label__text">${window.shehab.languages.editorMarkdownInlineUnderscoreTip}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="editorMarkdownInlineUnderscore" type="checkbox"${window.shehab.config.editor.markdown.inlineUnderscore ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
       ${window.shehab.languages.editorMarkdownInlineSup}
        <div class="b3-label__text">${window.shehab.languages.editorMarkdownInlineSupTip}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="editorMarkdownInlineSup" type="checkbox"${window.shehab.config.editor.markdown.inlineSup ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
       ${window.shehab.languages.editorMarkdownInlineSub}
        <div class="b3-label__text">${window.shehab.languages.editorMarkdownInlineSubTip}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="editorMarkdownInlineSub" type="checkbox"${window.shehab.config.editor.markdown.inlineSub ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
       ${window.shehab.languages.editorMarkdownInlineTag}
        <div class="b3-label__text">${window.shehab.languages.editorMarkdownInlineTagTip}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="editorMarkdownInlineTag" type="checkbox"${window.shehab.config.editor.markdown.inlineTag ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
       ${window.shehab.languages.editorMarkdownInlineMath}
        <div class="b3-label__text">${window.shehab.languages.editorMarkdownInlineMathTip}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="editorMarkdownInlineMath" type="checkbox"${window.shehab.config.editor.markdown.inlineMath ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
       ${window.shehab.languages.editorMarkdownInlineStrikethrough}
        <div class="b3-label__text">${window.shehab.languages.editorMarkdownInlineStrikethroughTip}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="editorMarkdownInlineStrikethrough" type="checkbox"${window.shehab.config.editor.markdown.inlineStrikethrough ? " checked" : ""}/>
</label>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
       ${window.shehab.languages.editorMarkdownInlineMark}
        <div class="b3-label__text">${window.shehab.languages.editorMarkdownInlineMarkTip}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="editorMarkdownInlineMark" type="checkbox"${window.shehab.config.editor.markdown.inlineMark ? " checked" : ""}/>
</label>`,
        bindEvent(modelMainElement: HTMLElement) {
            modelMainElement.querySelector("#clearHistory").addEventListener("click", () => {
                confirmDialog(window.shehab.languages.clearHistory, window.shehab.languages.confirmClearHistory, () => {
                    fetchPost("/api/history/clearWorkspaceHistory", {});
                });
            });

            modelMainElement.querySelectorAll("input.b3-switch, select.b3-select, input.b3-slider").forEach((item) => {
                item.addEventListener("change", () => {
                    setEditor(modelMainElement);
                });
            });
            modelMainElement.querySelectorAll("textarea.b3-text-field, input.b3-text-field, input.b3-slider").forEach((item) => {
                item.addEventListener("blur", () => {
                    setEditor(modelMainElement);
                });
            });
            modelMainElement.querySelectorAll("input.b3-slider").forEach((item) => {
                item.addEventListener("input", (event) => {
                    const target = event.target as HTMLInputElement;
                    target.previousElementSibling.previousElementSibling.textContent = target.value;
                });
            });
        }
    });
};
