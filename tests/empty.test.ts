import { PixiVNJson } from "@drincs/pixi-vn-json";
import { expect, test } from "vitest";
import { convertRenpyText } from "../src/functions";

test("Empty test 1", async () => {
    let expected: PixiVNJson = {
        labels: {
            start: [
                {
                    dialogue: "Hello",
                },
                {
                    dialogue: "# This isn't a comment, since it's part of a string.",
                },
            ],
        },
    };
    let res = convertRenpyText(`
label start:
    # This is a comment.
    "Hello" # this is also a comment.
    "# This isn't a comment, since it's part of a string."
`);
    expect(res).toEqual(expected);
});
