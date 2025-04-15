import { PixiVNJson, PixiVNJsonLabels } from "@drincs/pixi-vn-json";
import { LabelStatementNode } from "../vscode-extension/src/parser/ast-nodes";
import { getRenpyLabels } from "./labels-converter";
import { logger } from "./log-utility";
import { parser } from "./parser";

export function convertRenpyText(text: string): PixiVNJson | undefined {
    let result: PixiVNJson = {};
    let obj = parser(text);

    if (obj.errors.length > 0) {
        return undefined;
    }

    const labels: PixiVNJsonLabels = {};

    obj.nodes.forEach((node, index) => {
        if (node instanceof LabelStatementNode) {
            const nexts = obj.nodes.slice(index + 1);
            getRenpyLabels(node, nexts, labels);
        } else {
            logger.error("Error parsing renpy file", node);
        }
    });

    result.labels = labels;

    return result;
}
