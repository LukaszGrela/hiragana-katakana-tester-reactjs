import { legacy_createStore as createStore } from "redux";
import { describe, expect, it } from "vitest";

import dataAdded from "../actions/dataAdded";
import selectionChanged from "../actions/selectionChanged";
import syllabaryAdded from "../actions/syllabaryAdded";
import syllabaryChanged from "../actions/syllabaryChanged";
import writingAdded from "../actions/writingAdded";
import writingChanged from "../actions/writingChanged";
import type { TAction } from "../store/types";
import {
  seriesFixture,
  syllabaryFixture,
  writingFixture,
} from "../test/fixtures";

import reducer, { type TRootState } from "./index";

const initAction = { type: "@@INIT" } as unknown as TAction;

describe("root reducer", () => {
  it("provides an initial state for every slice", () => {
    expect(reducer(undefined, initAction)).toEqual({
      data: [],
      selection: [],
      syllabary: { selection: 0, options: [] },
      writing: { selection: 0, options: [] },
    });
  });

  it("applies the whole data.json bootstrap sequence", () => {
    const store = createStore(reducer);

    store.dispatch(dataAdded(seriesFixture));
    store.dispatch(selectionChanged(["all"]));
    store.dispatch(syllabaryAdded(syllabaryFixture));
    store.dispatch(writingAdded(writingFixture));

    const state: TRootState = store.getState();

    expect(state.data).toHaveLength(3);
    expect(state.selection).toEqual(["all"]);
    expect(state.syllabary).toEqual({
      selection: 0,
      options: ["Hiragana", "Katakana"],
    });
    expect(state.writing).toEqual({
      selection: 0,
      options: ["Romaji", "Kana"],
    });
  });

  it("updates the writing and syllabary selection", () => {
    const store = createStore(reducer);

    store.dispatch(syllabaryAdded(syllabaryFixture));
    store.dispatch(writingAdded(writingFixture));
    store.dispatch(syllabaryChanged(1));
    store.dispatch(writingChanged(1));

    expect(store.getState().syllabary.selection).toBe(1);
    expect(store.getState().writing.selection).toBe(1);
  });

  it("notifies subscribers on every change", () => {
    const store = createStore(reducer);
    let calls = 0;
    const unsubscribe = store.subscribe(() => {
      calls += 1;
    });

    store.dispatch(selectionChanged([0]));
    store.dispatch(selectionChanged([0, 1]));
    unsubscribe();
    store.dispatch(selectionChanged([2]));

    expect(calls).toBe(2);
  });
});
