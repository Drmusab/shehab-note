import {MenuItem} from "./Menu";
import {fetchPost} from "../util/fetch";
import {confirmDialog} from "../dialog/confirmDialog";
import {escapeHtml} from "../util/escape";
import {renameTag} from "../util/noRelyPCFunction";
import {getDockByType} from "../layout/tabUtil";
import {Tag} from "../layout/dock/Tag";
import {Constants} from "../constants";

export const openTagMenu = (element: HTMLElement, event: MouseEvent, labelName: string) => {
    if (!window.shehab.menus.menu.element.classList.contains("fn__none") &&
        window.shehab.menus.menu.element.getAttribute("data-name") === Constants.MENU_TAG) {
        window.shehab.menus.menu.remove();
        return;
    }
    window.shehab.menus.menu.remove();
    window.shehab.menus.menu.append(new MenuItem({
        icon: "iconEdit",
        label: window.shehab.languages.rename,
        click: () => {
            renameTag(labelName);
        }
    }).element);
    window.shehab.menus.menu.append(new MenuItem({
        icon: "iconTrashcan",
        label: window.shehab.languages.remove,
        click: () => {
            confirmDialog(window.shehab.languages.deleteOpConfirm, `${window.shehab.languages.confirmDelete} <b>${escapeHtml(labelName)}</b>?`, () => {
                fetchPost("/api/tag/removeTag", {label: labelName}, () => {
                    /// #if MOBILE
                    window.shehab.mobile.docks.tag.update();
                    /// #else
                    const dockTag = getDockByType("tag");
                    (dockTag.data.tag as Tag).update();
                    /// #endif
                });
            }, undefined, true);
        }
    }).element);
    window.shehab.menus.menu.element.setAttribute("data-name", Constants.MENU_TAG);
    window.shehab.menus.menu.popup({x: event.clientX - 11, y: event.clientY + 11, h: 22, w: 12});
};
