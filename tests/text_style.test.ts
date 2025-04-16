import { PixiVNJson } from "@drincs/pixi-vn-json";
import { test } from "vitest";
import { convertRenpyText } from "../src/functions";

test("Say Statement", async () => {
    let expected: PixiVNJson = {
        labels: {},
    };
    let res = convertRenpyText(`
define e = Character("Eileen", who_color="#c8ffc8")

label start:
    "This is narration."
    "Eileen" "This is dialogue, with an explicit character name."
    e "This is dialogue, using a character object instead."
    "Bam!!" with vpunch
`);
    // expect(res).toEqual(expected);
});
