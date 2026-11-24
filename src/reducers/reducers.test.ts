import { describe, expect, it } from "vitest";

import { DATA_ADDED } from "../actions/dataAdded";
import { SELECTION_CHANGED } from "../actions/selectionChanged";
import { SYLLABARY_CHANGED } from "../actions/syllabaryChanged";
import { SYLLABARY_DATA_ADDED } from "../actions/syllabaryAdded";
import { WRITING_CHANGED } from "../actions/writingChanged";
import { WRITING_DATA_ADDED } from "../actions/writingAdded";
import type { TAction } from "../store/types";
import { seriesFixture, syllabaryFixture } from "../test/fixtures";

import dataAddReducer from "./dataAddReducer";
import seriesSelectionReducer from "./seriesSelectionReducer";
import syllabaryReducer from "./syllabaryReducer";
import writingReducer from "./writingReducer";

const unknownAction = { type: "UNKNOWN" } as unknown as TAction;

describe("dataAddReducer", () => {
  it("defaults to an empty list", () => {
    expect(dataAddReducer(undefined, unknownAction)).toEqual([]);
  });

  it("appends the payload without mutating the previous state", () => {
    const previous = [seriesFixture[0]];
    const next = dataAddReducer(previous, {
      type: DATA_ADDED,
      payload: [seriesFixture[1]],
    } as TAction);

    expect(next).toHaveLength(2);
    expect(next).not.toBe(previous);
    expect(previous).toHaveLength(1);
  });

  it("keeps the same reference for unknown actions", () => {
    const state = [seriesFixture[0]];

    expect(dataAddReducer(state, unknownAction)).toBe(state);
  });
});

describe("seriesSelectionReducer", () => {
  it("defaults to an empty selection", () => {
    expect(seriesSelectionReducer(undefined, unknownAction)).toEqual([]);
  });

  it("replaces the selection with a copy of the payload", () => {
    const payload: number[] = [0, 2];
    const next = seriesSelectionReducer([1], {
      type: SELECTION_CHANGED,
      payload,
    } as TAction);

    expect(next).toEqual([0, 2]);
    expect(next).not.toBe(payload);
  });

  it("accepts the `all` sentinel", () => {
    expect(
      seriesSelectionReducer([], {
        type: SELECTION_CHANGED,
        payload: ["all"],
      } as TAction),
    ).toEqual(["all"]);
  });

  it("keeps the same reference for unknown actions", () => {
    const state = [0, 1];

    expect(seriesSelectionReducer(state, unknownAction)).toBe(state);
  });
});

describe("syllabaryReducer", () => {
  it("defaults to an empty selection with no options", () => {
    expect(syllabaryReducer(undefined, unknownAction)).toEqual({
      selection: 0,
      options: [],
    });
  });

  it("stores the options payload as-is", () => {
    const next = syllabaryReducer(undefined, {
      type: SYLLABARY_DATA_ADDED,
      payload: syllabaryFixture,
    } as TAction);

    expect(next).toBe(syllabaryFixture);
  });

  it("changes only the selected index", () => {
    const state = { selection: 0, options: ["Hiragana", "Katakana"] };
    const next = syllabaryReducer(state, {
      type: SYLLABARY_CHANGED,
      payload: 1,
    } as TAction);

    expect(next).toEqual({ selection: 1, options: ["Hiragana", "Katakana"] });
    expect(next).not.toBe(state);
    expect(state.selection).toBe(0);
  });

  it("keeps the same reference for unknown actions", () => {
    const state = { selection: 1, options: ["Hiragana", "Katakana"] };

    expect(syllabaryReducer(state, unknownAction)).toBe(state);
  });
});

describe("writingReducer", () => {
  it("defaults to an empty selection with no options", () => {
    expect(writingReducer(undefined, unknownAction)).toEqual({
      selection: 0,
      options: [],
    });
  });

  it("stores the options payload as-is", () => {
    const payload = { selection: 0, options: ["Romaji", "Kana"] };

    expect(
      writingReducer(undefined, {
        type: WRITING_DATA_ADDED,
        payload,
      } as TAction),
    ).toBe(payload);
  });

  it("changes only the selected index", () => {
    const state = { selection: 0, options: ["Romaji", "Kana"] };
    const next = writingReducer(state, {
      type: WRITING_CHANGED,
      payload: 1,
    } as TAction);

    expect(next).toEqual({ selection: 1, options: ["Romaji", "Kana"] });
    expect(next).not.toBe(state);
    expect(state.selection).toBe(0);
  });

  it("keeps the same reference for unknown actions", () => {
    const state = { selection: 1, options: ["Romaji", "Kana"] };

    expect(writingReducer(state, unknownAction)).toBe(state);
  });
});
