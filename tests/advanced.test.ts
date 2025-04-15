import { PixiVNJson } from "@drincs/pixi-vn-json";
import { expect, test } from "vitest";
import { convertRenpyText } from "../src/functions";

test("Label Statement 5", async () => {
    let expected: PixiVNJson = {
        labels: {},
    };
    let res = convertRenpyText(`
default a = 3

label start:
    menu:
        "Call":
            call label_with_params(5)
        "Jump":
            jump label_without_params
    jump start

label label_with_params(a):
label label_without_params:
    e "a = [a]" # displays 5 or 3 depending on what path was taken
    return
`);
    expect(res).toEqual(expected);
});
