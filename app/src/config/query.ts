import {fetchPost} from "../util/fetch";

export const query = {
    element: undefined as Element,
    genHTML: () => {
        return `<div class="b3-label">
    <div>${window.shehab.languages.searchBlockType}</div>
    <div class="fn__flex config-query">
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconMath"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                ${window.shehab.languages.math}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="mathBlock" type="checkbox"${window.shehab.config.search.mathBlock ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconTable"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                ${window.shehab.languages.table}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="table" type="checkbox"${window.shehab.config.search.table ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconParagraph"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                ${window.shehab.languages.paragraph}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="paragraph" type="checkbox"${window.shehab.config.search.paragraph ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconHeadings"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                ${window.shehab.languages.headings}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="heading" type="checkbox"${window.shehab.config.search.heading ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconCode"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                ${window.shehab.languages.code}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="codeBlock" type="checkbox"${window.shehab.config.search.codeBlock ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconHTML5"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                HTML
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="htmlBlock" type="checkbox"${window.shehab.config.search.htmlBlock ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconDatabase"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                ${window.shehab.languages.database}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="databaseBlock" type="checkbox"${window.shehab.config.search.databaseBlock ? " checked" : ""}/>
        </label>        
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconSQL"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                ${window.shehab.languages.embedBlock}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="embedBlock" type="checkbox"${window.shehab.config.search.embedBlock ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconVideo"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                ${window.shehab.languages.video}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="videoBlock" type="checkbox"${window.shehab.config.search.videoBlock ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconRecord"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                ${window.shehab.languages.audio}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="audioBlock" type="checkbox"${window.shehab.config.search.audioBlock ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconLanguage"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                IFrame
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="iframeBlock" type="checkbox"${window.shehab.config.search.iframeBlock ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconBoth"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                ${window.shehab.languages.widget}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="widgetBlock" type="checkbox"${window.shehab.config.search.widgetBlock ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconQuote"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                ${window.shehab.languages.quote} <sup>[1]</sup>
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="blockquote" type="checkbox"${window.shehab.config.search.blockquote ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconCallout"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                ${window.shehab.languages.callout} <sup>[1]</sup>
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="callout" type="checkbox"${window.shehab.config.search.callout ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconSuper"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                ${window.shehab.languages.superBlock} <sup>[1]</sup>
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="superBlock" type="checkbox"${window.shehab.config.search.superBlock ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconList"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                ${window.shehab.languages.list1} <sup>[1]</sup>
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="list" type="checkbox"${window.shehab.config.search.list ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconListItem"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                ${window.shehab.languages.listItem} <sup>[1]</sup>
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="listItem" type="checkbox"${window.shehab.config.search.listItem ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconFile"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                ${window.shehab.languages.doc}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="document" type="checkbox"${window.shehab.config.search.document ? " checked" : ""}/>
        </label>
    </div>
    <span class="fn__space"></span>
    <div class="fn__flex-1">
        <div class="b3-label__text">[1] ${window.shehab.languages.containerBlockTip1}</div>
    </div>
</div>
<div class="b3-label">
    <div>${window.shehab.languages.searchBlockAttr}</div>
    <div class="config-query">
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconN"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                ${window.shehab.languages.name}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="name" type="checkbox"${window.shehab.config.search.name ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconA"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                ${window.shehab.languages.alias}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="alias" type="checkbox"${window.shehab.config.search.alias ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <svg class="svg"><use xlink:href="#iconM"></use></svg>
            <span class="fn__space"></span>
            <div class="fn__flex-1">
                ${window.shehab.languages.memo}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="memo" type="checkbox"${window.shehab.config.search.memo ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <div class="fn__flex-1">
                ${window.shehab.languages.allAttrs}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="ial" type="checkbox"${window.shehab.config.search.ial ? " checked" : ""}/>
        </label>
    </div>
</div>
<div class="b3-label">
    <div>${window.shehab.languages.searchBackmention}</div>
    <div class="config-query">
        <label class="fn__flex">
            <div class="fn__flex-1">
                ${window.shehab.languages.name}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="backlinkMentionName" type="checkbox"${window.shehab.config.search.backlinkMentionName ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <div class="fn__flex-1">
                ${window.shehab.languages.alias}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="backlinkMentionAlias" type="checkbox"${window.shehab.config.search.backlinkMentionAlias ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <div class="fn__flex-1">
                ${window.shehab.languages.anchor}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="backlinkMentionAnchor" type="checkbox"${window.shehab.config.search.backlinkMentionAnchor ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <div class="fn__flex-1">
                ${window.shehab.languages.docName}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="backlinkMentionDoc" type="checkbox"${window.shehab.config.search.backlinkMentionDoc ? " checked" : ""}/>
        </label>
        <div class="fn__flex label fn__flex-1" style="flex: 2">
            <div>
                ${window.shehab.languages.keywordsLimit}
            </div>
            <span class="fn__space"></span>
            <input class="b3-text-field" id="backlinkMentionKeywordsLimit" type="number" min="1" max="10240" value="${window.shehab.config.search.backlinkMentionKeywordsLimit}">
        </div>
    </div>
</div>
<div class="b3-label">
    <div>${window.shehab.languages.searchVirtualRef}</div>
    <div class="config-query">
        <label class="fn__flex">
            <div class="fn__flex-1">
                ${window.shehab.languages.name}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="virtualRefName" type="checkbox"${window.shehab.config.search.virtualRefName ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <div class="fn__flex-1">
                ${window.shehab.languages.alias}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="virtualRefAlias" type="checkbox"${window.shehab.config.search.virtualRefAlias ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <div class="fn__flex-1">
                ${window.shehab.languages.anchor}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="virtualRefAnchor" type="checkbox"${window.shehab.config.search.virtualRefAnchor ? " checked" : ""}/>
        </label>
        <label class="fn__flex">
            <div class="fn__flex-1">
                ${window.shehab.languages.docName}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="virtualRefDoc" type="checkbox"${window.shehab.config.search.virtualRefDoc ? " checked" : ""}/>
        </label>
    </div>
</div>
<div class="b3-label">
    <div>${window.shehab.languages.searchIndex}</div>
    <div class="config-query">
        <label class="fn__flex">
            <div class="fn__flex-1">
                ${window.shehab.languages.indexAssetPath}
            </div>
            <span class="fn__space"></span>
            <input class="b3-switch" id="indexAssetPath" type="checkbox"${window.shehab.config.search.indexAssetPath ? " checked" : ""}/>
        </label>
    </div>
</div>
<div class="fn__flex b3-label config__item">
    <div class="fn__flex-1">
        ${window.shehab.languages.searchLimit}
         <div class="b3-label__text">${window.shehab.languages.searchLimit1}</div>
         <div class="b3-label__text">${window.shehab.languages.searchLimit2}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-text-field fn__flex-center fn__size200" id="limit" type="number" min="32" max="10240" value="${window.shehab.config.search.limit}">
</div>
<label class="fn__flex b3-label">
    <div class="fn__flex-1">
        ${window.shehab.languages.searchCaseSensitive}
         <div class="b3-label__text">${window.shehab.languages.searchCaseSensitive1}</div>
    </div>
    <span class="fn__space"></span>
    <input class="b3-switch fn__flex-center" id="caseSensitive" type="checkbox"${window.shehab.config.search.caseSensitive ? " checked" : ""}/>
</label>`;
    },
    bindEvent: () => {
        query.element.querySelectorAll("input").forEach((item) => {
            item.addEventListener("change", () => {
                fetchPost("/api/setting/setSearch", {
                    document: (query.element.querySelector("#document") as HTMLInputElement).checked,
                    heading: (query.element.querySelector("#heading") as HTMLInputElement).checked,
                    list: (query.element.querySelector("#list") as HTMLInputElement).checked,
                    listItem: (query.element.querySelector("#listItem") as HTMLInputElement).checked,
                    codeBlock: (query.element.querySelector("#codeBlock") as HTMLInputElement).checked,
                    htmlBlock: (query.element.querySelector("#htmlBlock") as HTMLInputElement).checked,
                    embedBlock: (query.element.querySelector("#embedBlock") as HTMLInputElement).checked,
                    databaseBlock: (query.element.querySelector("#databaseBlock") as HTMLInputElement).checked,
                    audioBlock: (query.element.querySelector("#audioBlock") as HTMLInputElement).checked,
                    videoBlock: (query.element.querySelector("#videoBlock") as HTMLInputElement).checked,
                    iframeBlock: (query.element.querySelector("#iframeBlock") as HTMLInputElement).checked,
                    widgetBlock: (query.element.querySelector("#widgetBlock") as HTMLInputElement).checked,
                    mathBlock: (query.element.querySelector("#mathBlock") as HTMLInputElement).checked,
                    table: (query.element.querySelector("#table") as HTMLInputElement).checked,
                    blockquote: (query.element.querySelector("#blockquote") as HTMLInputElement).checked,
                    callout: (query.element.querySelector("#callout") as HTMLInputElement).checked,
                    superBlock: (query.element.querySelector("#superBlock") as HTMLInputElement).checked,
                    paragraph: (query.element.querySelector("#paragraph") as HTMLInputElement).checked,
                    name: (query.element.querySelector("#name") as HTMLInputElement).checked,
                    alias: (query.element.querySelector("#alias") as HTMLInputElement).checked,
                    memo: (query.element.querySelector("#memo") as HTMLInputElement).checked,
                    ial: (query.element.querySelector("#ial") as HTMLInputElement).checked,
                    indexAssetPath: (query.element.querySelector("#indexAssetPath") as HTMLInputElement).checked,
                    limit: parseInt((query.element.querySelector("#limit") as HTMLInputElement).value),
                    caseSensitive: (query.element.querySelector("#caseSensitive") as HTMLInputElement).checked,
                    backlinkMentionName: (query.element.querySelector("#backlinkMentionName") as HTMLInputElement).checked,
                    backlinkMentionAlias: (query.element.querySelector("#backlinkMentionAlias") as HTMLInputElement).checked,
                    backlinkMentionAnchor: (query.element.querySelector("#backlinkMentionAnchor") as HTMLInputElement).checked,
                    backlinkMentionDoc: (query.element.querySelector("#backlinkMentionDoc") as HTMLInputElement).checked,
                    backlinkMentionKeywordsLimit: parseInt((query.element.querySelector("#backlinkMentionKeywordsLimit") as HTMLInputElement).value),
                    virtualRefName: (query.element.querySelector("#virtualRefName") as HTMLInputElement).checked,
                    virtualRefAlias: (query.element.querySelector("#virtualRefAlias") as HTMLInputElement).checked,
                    virtualRefAnchor: (query.element.querySelector("#virtualRefAnchor") as HTMLInputElement).checked,
                    virtualRefDoc: (query.element.querySelector("#virtualRefDoc") as HTMLInputElement).checked,
                }, response => {
                    window.shehab.config.search = response.data;
                });
            });
        });
    },
};
