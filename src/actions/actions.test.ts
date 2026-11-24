import { describe, expect, it } from "vitest";

import dataAdded, { DATA_ADDED } from "./dataAdded";
import selectionChanged, { SELECTION_CHANGED } from "./selectionChanged";
import syllabaryAdded, { SYLLABARY_DATA_ADDED } from "./syllabaryAdded";
import syllabaryChanged, { SYLLABARY_CHANGED } from "./syllabaryChanged";
import writingAdded, { WRITING_DATA_ADDED } from "./writingAdded";
import writingChanged, { WRITING_CHANGED } from "./writingChanged";

import {
  seriesFixture,
  syllabaryFixture,
  writingFixture,
} from "../test/fixtures";

describe("action types", () => {
  it("exposes stable action type strings", () => {
    expect(DATA_ADDED).toBe("DATA_ADDED");
    expect(SELECTION_CHANGED).toBe("SELECTION_CHANGED");
    expect(SYLLABARY_DATA_ADDED).toBe("SYLLABARY_DATA_ADDED");
    expect(SYLLABARY_CHANGED).toBe("SYLLABARY_CHANGED");
    expect(WRITING_DATA_ADDED).toBe("WRITING_DATA_ADDED");
    expect(WRITING_CHANGED).toBe("WRITING_CHANGED");
  });
});

describe("dataAdded", () => {
  it("passes the series payload through", () => {
    expect(dataAdded(seriesFixture)).toEqual({
      type: DATA_ADDED,
      payload: seriesFixture,
    });
  });

  it("defaults to an empty list", () => {
    expect(dataAdded()).toEqual({ type: DATA_ADDED, payload: [] });
  });
});

describe("selectionChanged", () => {
  it("passes the selection through", () => {
    expect(selectionChanged([0, 2])).toEqual({
      type: SELECTION_CHANGED,
      payload: [0, 2],
    });
  });

  it("passes the `all` sentinel through", () => {
    expect(selectionChanged(["all"])).toEqual({
      type: SELECTION_CHANGED,
      payload: ["all"],
    });
  });
});

describe("syllabary actions", () => {
  it("syllabaryAdded passes the options through", () => {
    expect(syllabaryAdded(syllabaryFixture)).toEqual({
      type: SYLLABARY_DATA_ADDED,
      payload: syllabaryFixture,
    });
  });

  it("syllabaryAdded defaults to an empty selection", () => {
    expect(syllabaryAdded()).toEqual({
      type: SYLLABARY_DATA_ADDED,
      payload: { selection: 0, options: [] },
    });
  });

  it("syllabaryChanged carries the selected index", () => {
    expect(syllabaryChanged(1)).toEqual({
      type: SYLLABARY_CHANGED,
      payload: 1,
    });
  });

  it("syllabaryChanged defaults to 0", () => {
    expect(syllabaryChanged()).toEqual({
      type: SYLLABARY_CHANGED,
      payload: 0,
    });
  });
});

describe("writing actions", () => {
  it("writingAdded passes the options through", () => {
    expect(writingAdded(writingFixture)).toEqual({
      type: WRITING_DATA_ADDED,
      payload: writingFixture,
    });
  });

  it("writingAdded defaults to an empty selection", () => {
    expect(writingAdded()).toEqual({
      type: WRITING_DATA_ADDED,
      payload: { selection: 0, options: [] },
    });
  });

  it("writingChanged carries the selected index", () => {
    expect(writingChanged(1)).toEqual({ type: WRITING_CHANGED, payload: 1 });
  });

  it("writingChanged defaults to 0", () => {
    expect(writingChanged()).toEqual({ type: WRITING_CHANGED, payload: 0 });
  });
});
