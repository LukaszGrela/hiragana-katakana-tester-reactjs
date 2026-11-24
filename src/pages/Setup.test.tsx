import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, it } from "vitest";

import dataAdded from "../actions/dataAdded";
import selectionChanged from "../actions/selectionChanged";
import syllabaryAdded from "../actions/syllabaryAdded";
import syllabaryChanged from "../actions/syllabaryChanged";
import writingAdded from "../actions/writingAdded";
import writingChanged from "../actions/writingChanged";
import reducer from "../reducers";
import type { TSelection } from "../store/types";
import {
  seriesFixture,
  syllabaryFixture,
  writingFixture,
} from "../test/fixtures";
import Setup from "./Setup";

type TSetupOptions = {
  selection?: TSelection;
  syllabary?: number;
  writing?: number;
};

const renderSetup = ({
  selection = [],
  syllabary = 0,
  writing = 0,
}: TSetupOptions = {}) => {
  const store = configureStore({ reducer });

  store.dispatch(dataAdded(seriesFixture));
  store.dispatch(syllabaryAdded(syllabaryFixture));
  store.dispatch(writingAdded(writingFixture));
  store.dispatch(syllabaryChanged(syllabary));
  store.dispatch(writingChanged(writing));
  store.dispatch(selectionChanged(selection));

  const view = render(
    <Provider store={store}>
      <Setup />
    </Provider>,
  );

  return { store, ...view };
};

const optionItems = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLElement>("li.option"));

describe("Setup page", () => {
  it("shows both switches and the whole series list", () => {
    const { container } = renderSetup();

    expect(container.querySelector("#test-what-switch")).not.toBeNull();
    expect(container.querySelector("#writing-switch")).not.toBeNull();
    expect(container.querySelector(".selection-button")).toHaveTextContent(
      "Select All",
    );
    expect(container.querySelector(".selection-stats")).toHaveTextContent(
      "It is selected 0 Kana of 0 series.",
    );
    expect(optionItems(container)).toHaveLength(3);
  });

  it("selects every series with Select All and clears them again", () => {
    const { container, store } = renderSetup();

    fireEvent.click(container.querySelector(".selection-button") as Element);

    expect(store.getState().selection).toEqual([0, 1, 2]);
    expect(container.querySelector(".selection-button")).toHaveTextContent(
      "Deselect All",
    );
    expect(container.querySelector(".selection-stats")).toHaveTextContent(
      "It is selected 15 Kana of 3 series.",
    );
    expect(container.querySelectorAll("li.option.selected")).toHaveLength(3);

    fireEvent.click(container.querySelector(".selection-button") as Element);

    expect(store.getState().selection).toEqual([]);
    expect(container.querySelector(".selection-button")).toHaveTextContent(
      "Select All",
    );
    expect(container.querySelectorAll("li.option.selected")).toHaveLength(0);
  });

  it("toggles a single series by clicking it", () => {
    const { container, store } = renderSetup();

    fireEvent.click(optionItems(container)[0]);

    expect(store.getState().selection).toEqual([0]);
    expect(optionItems(container)[0]).toHaveClass("selected");
    expect(container.querySelector(".selection-stats")).toHaveTextContent(
      "It is selected 5 Kana of 1 series.",
    );

    fireEvent.click(optionItems(container)[0]);

    expect(store.getState().selection).toEqual([]);
    expect(optionItems(container)[0]).not.toHaveClass("selected");
  });

  it("adds a second series to an existing selection", () => {
    const { container, store } = renderSetup({ selection: [0] });

    fireEvent.click(optionItems(container)[2]);

    expect(store.getState().selection).toEqual([0, 2]);
  });

  it("switches the writing test to kana", () => {
    const { container, store } = renderSetup({ selection: [0, 1, 2] });

    const input = container.querySelector(
      ".writing-switch input",
    ) as HTMLInputElement;

    expect(input.checked).toBe(false);
    expect(container.querySelector(".selection-hint")).toHaveTextContent(
      "It is selected 15 Kana of 3 series.",
    );

    fireEvent.click(input);

    expect(store.getState().writing.selection).toBe(1);
    expect(input.checked).toBe(true);
    expect(container.querySelector(".writing .before")).toHaveTextContent(
      "Kana",
    );
  });

  it("switches the syllabary test to katakana", () => {
    const { container, store } = renderSetup();

    const input = container.querySelector(
      "#test-what-switch",
    ) as HTMLInputElement;

    expect(container.querySelector(".test-what .after")).toHaveTextContent(
      "Hiragana",
    );

    fireEvent.click(input);

    expect(store.getState().syllabary.selection).toBe(1);
    expect(container.querySelector(".test-what .before")).toHaveTextContent(
      "Katakana",
    );
  });

  it("shows every series as selected for the `all` selection", () => {
    const { container, store } = renderSetup({ selection: ["all"] });

    expect(container.querySelectorAll("li.option.selected")).toHaveLength(3);
    expect(container.querySelector(".selection-stats")).toHaveTextContent(
      "It is selected 15 Kana of 3 series.",
    );

    fireEvent.click(container.querySelector(".selection-button") as Element);

    expect(store.getState().selection).toEqual([]);
  });
});
