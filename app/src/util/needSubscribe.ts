import {showMessage} from "../dialog/message";
import {getCloudURL} from "../config/util/about";

export const needSubscribe = (tip = window.shehab.languages._kernel[29]) => {
    if (window.shehab.user && (window.shehab.user.userSiYuanProExpireTime === -1 || window.shehab.user.userSiYuanProExpireTime > 0)) {
        return false;
    }
    if (tip) {
        if (tip === window.shehab.languages._kernel[29] && window.shehab.config.system.container === "ios") {
            showMessage(window.shehab.languages._kernel[122]);
        } else {
            if (tip === window.shehab.languages._kernel[29]) {
                tip = window.shehab.languages._kernel[29].replaceAll("${accountServer}", getCloudURL(""));
            }
            showMessage(tip);
        }
    }
    return true;
};

export const isPaidUser = () => {
    return window.shehab.user && (0 === window.shehab.user.userSiYuanSubscriptionStatus || 1 === window.shehab.user.userSiYuanOneTimePayStatus);
};
