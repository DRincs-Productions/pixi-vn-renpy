import { expect, test } from "vitest";
import { parser } from "../src/functions";

test("Pixi.js Application", async () => {
    try {
        parser(`
        label start:
            "Hello, World!"
            "This is a test."
            "This is a test."
        label end:
            "Goodbye, World!"
        `);
        expect(true).toBe(true);
    } catch (e) {
        console.error(e);
        expect(false).toBe(true);
    }
});
