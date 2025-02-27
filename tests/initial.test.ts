import { expect, test } from "vitest";
import { importRenpyText } from "../src";

test("Pixi.js Application", async () => {
    try {
        importRenpyText(`
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
