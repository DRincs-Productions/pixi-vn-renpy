import {
    PixiVNJsonConditionalStatements,
    PixiVNJsonDialog,
    PixiVNJsonDialogText,
    PixiVNJsonLabels,
    PixiVNJsonLabelStep,
} from "@drincs/pixi-vn-json";
import {
    ASTNode,
    CallStatementNode,
    JumpStatementNode,
    LabelStatementNode,
    ReturnStatementNode,
    SayStatementNode,
    StatementNode,
} from "../vscode-extension/src/parser/ast-nodes";
import { logger } from "./log-utility";

export function getRenpyLabels(node: LabelStatementNode, nexts: (ASTNode | null)[], labels: PixiVNJsonLabels) {
    try {
        if (node === null) {
            return;
        }
        let labelName = node.labelName.globalName;
        if (!labelName) {
            logger.error("Label name is undefined", node);
            return;
        }
        let steps: PixiVNJsonLabelStep[] = node.block.map(stepMapper);
        nexts.forEach((nextNode) => {
            if (nextNode instanceof LabelStatementNode) {
                let nextLabelName = nextNode.labelName.globalName;
                if (nextLabelName) {
                    steps.push({
                        labelToOpen: {
                            type: "call",
                            label: nextLabelName,
                        },
                    });
                }
                return;
            }
        });
        labels[labelName] = steps;
    } catch (e) {
        logger.error("Error parsing renpy file", e);
    }
}

function stepMapper(block: StatementNode): PixiVNJsonLabelStep {
    if (block instanceof SayStatementNode) {
        return {
            dialogue: dialogueMapper(block),
        };
    } else if (block instanceof CallStatementNode) {
        return {
            labelToOpen: {
                type: "call",
                label: block.target.globalName,
            },
        };
    } else if (block instanceof ReturnStatementNode) {
        return {
            end: "label_end",
            goNextStep: true,
        };
    } else if (block instanceof JumpStatementNode) {
        return {
            labelToOpen: {
                type: "jump",
                label: block.target.globalName,
            },
        };
    } else {
        logger.error("Unknown block type", block);
    }

    return {};
}

function dialogueMapper(
    block: SayStatementNode
):
    | PixiVNJsonDialog<PixiVNJsonDialogText>
    | PixiVNJsonConditionalStatements<PixiVNJsonDialog<PixiVNJsonDialogText>>
    | undefined {
    let text = block.what ? `${block.what.value}` : undefined;
    let character = block.who ? block.who.name : undefined;
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
