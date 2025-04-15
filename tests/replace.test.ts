import { PixiVNJson } from "@drincs/pixi-vn-json";
import { expect, test } from "vitest";
import { convertRenpyText } from "../src/functions";

test("Label Statement 1", async () => {
    onReplaceTextAfterTranslation((key) => {
        if (key === "a") {
            return "Alice";
        }
    });

    let expected: PixiVNJson = {
        labels: {
            sample1: [
                {
                    dialogue: "Here is 'sample1' label.",
                },
                {
                    labelToOpen: {
                        type: "call",
                        label: "sample2",
                    },
                },
            ],
            sample2: [
                {
                    dialogue: "Here is 'sample2' label.",
                },
                {
                    dialogue: "a = Alice",
                },
            ],
        },
    };
    let res = convertRenpyText(`
label sample1:
    "Here is 'sample1' label."

label sample2(a="default"):
    "Here is 'sample2' label."
    "a = [a]"
`);
    expect(res).toEqual(expected);
});
