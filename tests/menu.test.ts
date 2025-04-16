import { PixiVNJson } from "@drincs/pixi-vn-json";
import { expect, test } from "vitest";
import { convertRenpyText } from "../src/functions";

test("Menus, Labels, and Jumps", async () => {
    let expected: PixiVNJson = {
        labels: {},
    };
    let res = convertRenpyText(`
define s = Character('Sylvie', color="#c8ffc8")
define m = Character('Me', color="#c8c8ff")

label start:
    s "Sure, but what's a \"visual novel?\""

    menu:
        "It's a videogame.":
            jump game
        "It's an interactive book.":
            jump book

label game:
    m "It's a kind of videogame you can play on your computer or a console."
    jump marry

label book:
    m "It's like an interactive book that you can read on a computer or a console."
    jump marry

label marry:
    "And so, we become a visual novel creating duo."
`);
    expect(res).toEqual(expected);
});

test("In-Game Menus", async () => {
    let expected: PixiVNJson = {
        labels: {},
    };
    let res = convertRenpyText(`
label start:
    menu:
        "What should I do?"

        "Drink coffee.":
            "I drink the coffee, and it's good to the last drop."

        "Drink tea.":
            $ drank_tea = True
            "I drink the tea, trying not to make a political statement as I do."

        "Genuflect.":
            jump genuflect_ending

label after_menu:
    "After having my drink, I got on with my morning."
    return

label genuflect_ending:
    "I genuflect, and the world is a better place for it."
    return
`);
    expect(res).toEqual(expected);
});

test("Menu Set", async () => {
    let expected: PixiVNJson = {
        labels: {},
    };
    let res = convertRenpyText(`
default menuset = set()

menu chapter_1_places:
    set menuset
    "Where should I go?"

    "Go to class.":
        jump go_to_class

    "Go to the bar.":
        jump go_to_bar

    "Go to jail.":
        jump go_to_jail

label chapter_1_after_places:
    "Wow, that was one heck of a Tuesday."
`);
    // expect(res).toEqual(expected);
});

test("Menu Arguments", async () => {
    let expected: PixiVNJson = {
        labels: {},
    };
    let res = convertRenpyText(`
menu ("jfk", screen="airport"):
    "Chicago, IL" (200):
        jump chicago_trip

    "Dallas, TX" (150, sale=True):
        jump dallas_trip

    "Hot Springs, AR" (300) if secret_unlocked:
        jump hot_springs_trip
`);
    // expect(res).toEqual(expected);
});
