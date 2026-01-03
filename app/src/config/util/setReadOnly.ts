import {fetchPost} from "../../util/fetch";

export const setReadOnly = (readOnly: boolean) => {
    window.shehab.config.editor.readOnly = readOnly;
    fetchPost("/api/setting/setEditor", window.shehab.config.editor);
};
