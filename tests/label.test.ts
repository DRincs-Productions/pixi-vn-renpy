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
