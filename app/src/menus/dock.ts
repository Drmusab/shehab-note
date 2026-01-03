import {MenuItem} from "./Menu";

const moveMenuItem = (label: string, target: Element) => {
    return new MenuItem({
        label: window.shehab.languages[label],
        icon: label.replace("moveTo", "icon"),
        click: () => {
            if (label.indexOf("moveToLeft") > -1) {
                window.shehab.layout.leftDock.add(label.endsWith("Top") ? 0 : 1, target);
            } else if (label.indexOf("moveToRight") > -1) {
                window.shehab.layout.rightDock.add(label.endsWith("Top") ? 0 : 1, target);
            } else if (label.indexOf("moveToBottom") > -1) {
                window.shehab.layout.bottomDock.add(label.endsWith("Left") ? 0 : 1, target);
            }
        }
    });
};

export const initDockMenu = (target: Element) => {
    window.shehab.menus.menu.remove();
    window.shehab.menus.menu.append(moveMenuItem("moveToLeftTop", target).element);
    window.shehab.menus.menu.append(moveMenuItem("moveToLeftBottom", target).element);
    window.shehab.menus.menu.append(moveMenuItem("moveToRightTop", target).element);
    window.shehab.menus.menu.append(moveMenuItem("moveToRightBottom", target).element);
    window.shehab.menus.menu.append(moveMenuItem("moveToBottomLeft", target).element);
    window.shehab.menus.menu.append(moveMenuItem("moveToBottomRight", target).element);
    return window.shehab.menus.menu;
};
