import { PixiVNJson } from "@drincs/pixi-vn-json";
import { expect, test } from "vitest";
import { convertRenpyText } from "../src/functions";

test("Character test 1", async () => {
    let expected: PixiVNJson = {
        labels: {
            start: [
                {
                    dialogue: {
                        character: "s",
                        text: "Hi there! How was class?",
                    },
                },
                {
                    dialogue: {
                        character: "m",
                        text: "Good...",
                    },
                },
                {
                    dialogue: "I can't bring myself to admit that it all went in one ear and out the other.",
                },
                {
                    dialogue: {
                        character: "s",
                        text: "Are you going home now? Wanna walk back with me?",
                    },
                },
                {
                    dialogue: {
                        character: "m",
                        text: "Sure!",
                    },
                },
            ],
        },
    };
    let res = convertRenpyText(`
define s = Character('Sylvie', color="#c8ffc8")
define m = Character('Me', color="#c8c8ff")

label start:
    s "Hi there! How was class?"
    m "Good..."
    "I can't bring myself to admit that it all went in one ear and out the other."
    s "Are you going home now? Wanna walk back with me?"
    m "Sure!"
`);
    expect(res).toEqual(expected);
});

test("Character test 2", async () => {
    let expected: PixiVNJson = {
        labels: {
            start: [
                {
                    dialogue: {
                        character: "s",
                        text: "Hi there! How was class?",
                    },
                },
                {
                    dialogue: {
                        character: "m",
                        text: "Good...",
                    },
                },
                {
                    labelToOpen: {
                        type: "call",
                        label: "next",
                    },
                },
            ],
            next: [
                {
                    dialogue: "I can't bring myself to admit that it all went in one ear and out the other.",
                },
                {
                    dialogue: {
                        character: "s",
                        text: "Are you going home now? Wanna walk back with me?",
                    },
                },
                {
                    dialogue: {
                        character: "m",
                        text: "Sure!",
                    },
                },
            ],
        },
    };
    let res = convertRenpyText(`
define s = Character('Sylvie', color="#c8ffc8")
define m = Character('Me', color="#c8c8ff")

label start:
    s "Hi there! How was class?"
    m "Good..."

define c = Character('Sylvie', color="#c8ffc8")

label next:
    "I can't bring myself to admit that it all went in one ear and out the other."
    s "Are you going home now? Wanna walk back with me?"
    m "Sure!"
`);
    expect(res).toEqual(expected);
});

test("Character test 3", async () => {
    let expected: PixiVNJson = {
        labels: {
            start: [
                {
                    dialogue: {
                        character: "s",
                        text: "Hi there! How was class?",
                    },
                },
                {
                    dialogue: {
                        character: "m",
                        text: "Good...",
                    },
                },
                {
                    dialogue: "I can't bring myself to admit that it all went in one ear and out the other.",
                },
                {
                    dialogue: {
                        character: "s",
                        text: "Are you going home now? Wanna walk back with me?",
                    },
                },
                {
                    dialogue: {
                        character: "m",
                        text: "Sure!",
                    },
                },
            ],
        },
    };
    let res = convertRenpyText(`
label start:
    s "Hi there! How was class?"
    m "Good..."
    "I can't bring myself to admit that it all went in one ear and out the other."
    s "Are you going home now? Wanna walk back with me?"
    m "Sure!"
`);
    expect(res).toEqual(expected);
});
