import assert from "node:assert";
import { describe, it } from "node:test";

describe("basic math", () => {
  it("adds numbers correctly", () => {
    assert.strictEqual(1 + 1, 2);
  });
});

describe("js anomalies", () => {
  it("shows floating point weirdness", () => {
    assert.notStrictEqual(0.1 + 0.2, 0.3);
  });

  it("reminds us that null is actually an object", () => {
    assert.strictEqual(typeof null, "object");
  });
});
