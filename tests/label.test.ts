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
                        type: "call",
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
                        type: "call",
                        label: "hurry_home",
                    },
                },
                {
                    labelToOpen: {
                        type: "call",
                        label: "hurry_home",
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

test("Label test 3", async () => {
    let expected: PixiVNJson = {
        labels: {
            back_in_london: [
                {
                    dialogue: "We arrived into London at 9.45pm exactly.",
                },
                {
                    labelToOpen: {
                        type: "jump",
                        label: "hurry_home",
                    },
                },
                {
                    labelToOpen: {
                        type: "call",
                        label: "hurry_home",
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
    jump hurry_home

label hurry_home:
    "We hurried home to Savile Row as fast as we could."
    return
`);
    expect(res).toEqual(expected);
});

test("A Simple Game", async () => {
    let expected: PixiVNJson = {
        labels: {
            back_in_london: [
                {
                    dialogue: "We arrived into London at 9.45pm exactly.",
                },
                {
                    labelToOpen: {
                        type: "jump",
                        label: "hurry_home",
                    },
                },
                {
                    labelToOpen: {
                        type: "call",
                        label: "hurry_home",
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
label start:
    "Sylvie" "Hi there! How was class?"
    "Me" "Good..."
    "I can't bring myself to admit that it all went in one ear and out the other."
    "Me" "Are you going home now? Wanna walk back with me?"
    "Sylvie" "Sure!"
`);
    expect(res).toEqual(expected);
});

test("Label Statement 3", async () => {
    let expected: PixiVNJson = {
        labels: {},
    };
    let res = convertRenpyText(`
label origin:
"a"
label hasblock:
    "b"
"c"
return
`);
    expect(res).toEqual(expected);
});

test("Label Statement 4", async () => {
    let expected: PixiVNJson = {
        labels: {},
    };
    let res = convertRenpyText(`
label global_label:
    "Under a global label.."
label .local_label:
    "..resides a local one."
    jump .another_local
label .another_local:
    "And another !"
    jump .local_label
    return

label another_global:
    "Now lets jump inside a local label located somewhere else."
    jump global_label.local_name
`);
    expect(res).toEqual(expected);
});

test("Jump Statement", async () => {
    let expected: PixiVNJson = {
        labels: {},
    };
    let res = convertRenpyText(`
label loop_start:
    e "Oh no! It looks like we're trapped in an infinite loop."
    jump loop_start
`);
    expect(res).toEqual(expected);
});

test("Call Statement", async () => {
    let expected: PixiVNJson = {
        labels: {},
    };
    let res = convertRenpyText(`
label start:
    e "First, we will call a subroutine."
    call subroutine
    call subroutine(2)
    call expression "sub" + "routine" pass (count=3)
    return

# ...

label subroutine(count=1):
    e "I came here [count] time(s)."
    e "Next, we will return from the subroutine."
    return
`);
    expect(res).toEqual(expected);
});
