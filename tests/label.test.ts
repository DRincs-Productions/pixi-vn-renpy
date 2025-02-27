import { PixiVNJson } from "@drincs/pixi-vn-json";
import { expect, test } from "vitest";
import { convertRenpyText } from "../src/functions";

test("Label test 1", async () => {
    let expected: PixiVNJson = {
        labels: {
            start: [
                {
                    dialogue: "Hello, World!",
                },
                {
                    dialogue: "This is a test.",
                },
                {
                    dialogue: "This is a test.",
                },
                {
                    labelToOpen: {
                        label: "end",
                        type: "jump",
                    },
                },
            ],
            end: [
                {
                    dialogue: "Goodbye, World!",
                },
            ],
        },
    };
    let res = convertRenpyText(`
label start:
	"Hello, World!"
	"This is a test."
	"This is a test."
label end:
	"Goodbye, World!"
`);
    expect(res).toEqual(expected);
});

test("Label test 2", async () => {
    let expected: PixiVNJson = {
        labels: {
            back_in_london: [
                {
                    dialogue: "We arrived into London at 9.45pm exactly.",
                },
                {
                    labelToOpen: {
                        label: "hurry_home",
                        type: "call",
                    },
                },
            ],
            hurry_home: [
                {
                    dialogue: "We hurried home to Savile Row as fast as we could.",
                },
                {
                    end: "label_end",
                    goNextStep: true,
                },
            ],
        },
    };
    let res = convertRenpyText(`
label back_in_london:
    "We arrived into London at 9.45pm exactly."
    call hurry_home

label hurry_home:
    "We hurried home to Savile Row as fast as we could."
    return
`);
    expect(res).toEqual(expected);
});
