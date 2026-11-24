import { describe, expect, it } from "vitest";

import type { TSyllabarySeries } from "../store/types";
import { seriesFixture } from "../test/fixtures";
import kanaCounter from "./kanaCounter";

describe("kanaCounter", () => {
  it("returns zeros when data is missing", () => {
    const data = null as unknown as TSyllabarySeries;

    expect(kanaCounter(data, [0, 1])).toEqual({ kana: 0, series: 0 });
  });

  it("returns zeros for an empty selection", () => {
    expect(kanaCounter(seriesFixture, [])).toEqual({ kana: 0, series: 0 });
  });

  it("counts kana of every selected series", () => {
    expect(kanaCounter(seriesFixture, [0, 1])).toEqual({
      kana: 10,
      series: 2,
    });
  });

  it("counts all series", () => {
    expect(kanaCounter(seriesFixture, [0, 1, 2])).toEqual({
      kana: 15,
      series: 3,
    });
  });

  it("ignores ids that are not part of the data", () => {
    expect(kanaCounter(seriesFixture, [99])).toEqual({ kana: 0, series: 0 });
    expect(kanaCounter(seriesFixture, [0, 99])).toEqual({
      kana: 5,
      series: 1,
    });
  });

  it("does not double count duplicated selection ids", () => {
    expect(kanaCounter(seriesFixture, [1, 1, 1])).toEqual({
      kana: 5,
      series: 1,
    });
  });
});
