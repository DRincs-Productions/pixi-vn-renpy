import { importPixiVNJson, PixiVNJson } from "@drincs/pixi-vn-json";
import { convertRenpyText } from "./renpy-to-pixivn";

export async function importRenpyText(text: string | string[]): Promise<PixiVNJson[]> {
    let res: PixiVNJson[] = [];
    // if is array
    if (Array.isArray(text)) {
        for (let t of text) {
            let labels = await importRenpyText(t);
            res.concat(labels);
        }
        return res;
    }
    let data = convertRenpyText(text);
    if (data) {
        importPixiVNJson(data, {
            // TODO: operationStringConvert: HashtagScriptManager.generateOrRunOperationFromHashtagScript,
            skipEmptyDialogs: true,
        });
        res.push(data);
    }
    return res;
}
