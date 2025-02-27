import { PixiVNJson } from "@drincs/pixi-vn-json";
import { getRenpyLabels } from "./labels-converter";
import { parser } from "./parser";

export function convertRenpyText(text: string): PixiVNJson | undefined {
    let result: PixiVNJson = {};
    let obj = parser(text);

    if (obj.errors.length > 0) {
        return undefined;
    }

    result.labels = getRenpyLabels(obj.labels);

    return result;
}
