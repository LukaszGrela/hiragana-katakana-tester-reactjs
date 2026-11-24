import { afterEach, describe, expect, it, vi } from "vitest";

import { randomOption, randomRange, shuffle } from "./math";

/** Makes `Math.random` return the given values, then repeats the last one. */
const mockRandom = (...values: number[]) => {
  const spy = vi.spyOn(Math, "random");
  values.forEach((value) => spy.mockReturnValueOnce(value));
  spy.mockReturnValue(values[values.length - 1] ?? 0);
  return spy;
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("randomRange", () => {
  it("returns the lower bound when random is 0", () => {
    mockRandom(0);

    expect(randomRange(2, 5)).toBe(2);
  });

  it("returns the upper bound when random is close to 1", () => {
    mockRandom(0.999);

    expect(randomRange(2, 5)).toBe(5);
  });

  it("falls back to a 0..max range when bounds are equal", () => {
    mockRandom(0.5);

    expect(randomRange(5, 5)).toBe(3);
  });
});

describe("randomOption", () => {
  it("picks an element by index", () => {
    mockRandom(0.5, 0.5);

    expect(randomOption(["a", "b", "c"])).toBe("b");
  });

  it("returns undefined for an empty list", () => {
    mockRandom(0.5, 0.5);

    expect(randomOption([])).toBeUndefined();
  });
});

describe("shuffle", () => {
  it("mutates and returns the very same array", () => {
    mockRandom(0);

    const list = ["a", "b", "c", "d"];

    expect(shuffle(list)).toBe(list);
    expect(list).toHaveLength(4);
    expect([...list].sort()).toEqual(["a", "b", "c", "d"]);
  });

  it("produces a deterministic permutation for a known random sequence", () => {
    mockRandom(0);

    expect(shuffle([1, 2, 3])).toEqual([2, 3, 1]);
  });

  it("handles an empty list", () => {
    mockRandom(0);

    expect(shuffle([])).toEqual([]);
  });
});
