import { PixiVNJson } from "@drincs/pixi-vn-json";
import { test } from "vitest";
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
    // expect(res).toEqual(expected);
});

test("Say with Image Attributes 1", async () => {
    let expected: PixiVNJson = {
        labels: {},
    };
    let res = convertRenpyText(`
define e = Character("Eileen", image="eileen")

label start:
    show eileen concerned
    e "I'm a little upset at you."
    e happy "But it's just a passing thing."
`);
    // expect(res).toEqual(expected);
});
