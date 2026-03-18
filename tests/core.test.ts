import { describe, it, expect } from "vitest";
import { Stocksense } from "../src/core.js";
describe("Stocksense", () => {
  it("init", () => { expect(new Stocksense().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Stocksense(); await c.process(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Stocksense(); await c.process(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
