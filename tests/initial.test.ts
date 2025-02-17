import { expect, test } from "vitest";
import { testParser } from "../src/functions";

test("Pixi.js Application", async () => {
    try {
        testParser();
        expect(true).toBe(true);
    } catch (e) {
        console.error(e);
        expect(false).toBe(true);
    }
});
