import {
    PixiVNJsonConditionalStatements,
    PixiVNJsonDialog,
    PixiVNJsonDialogText,
    PixiVNJsonLabels,
    PixiVNJsonLabelStep,
} from "@drincs/pixi-vn-json";
import { ASTNode, SayStatementNode } from "../vscode-extension/src/parser/ast-nodes";
import { logger } from "./log-utility";

export function getRenpyLabels(labels: (ASTNode | null)[]): PixiVNJsonLabels | undefined {
    try {
        let label: PixiVNJsonLabels = {};

        labels.forEach((node) => {
            if (node === null) {
                return;
            }
            let labelName = node.labelName.globalName;
            let steps: PixiVNJsonLabelStep[] = node.block.map(stepMapper);
            label[labelName] = steps;
        });

        return label;
    } catch (e) {
        logger.error("Error parsing renpy file", e);
    }
}

function stepMapper(block: SayStatementNode): PixiVNJsonLabelStep {
    let step: PixiVNJsonLabelStep = {
        dialogue: dialogueMapper(block),
    };

    return step;
}

function dialogueMapper(
    block: SayStatementNode
):
    | PixiVNJsonDialog<PixiVNJsonDialogText>
    | PixiVNJsonConditionalStatements<PixiVNJsonDialog<PixiVNJsonDialogText>>
    | undefined {
    let text = block.what ? `${block.what.value}` : undefined;
    let character = block.who ? block.who.toString() : undefined;
    if (!text) {
        return undefined;
    }
    if (character) {
        return {
            character: character,
            text: text,
        };
    }
    return text;
}
