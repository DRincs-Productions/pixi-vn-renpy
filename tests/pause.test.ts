import { PixiVNJson } from "@drincs/pixi-vn-json";
import { test } from "vitest";
import { convertRenpyText } from "../src/functions";

test("Pause test 1", async () => {
    let expected: PixiVNJson = {
        labels: {},
    };
    let res = convertRenpyText(`
label start:
    "Hi there! How was class?"
    "Good..."
    pause
    "Are you going home now? Wanna walk back with me?"
    pause 0.1
    "Sure!"
`);
    // expect(res).toEqual(expected);
});
