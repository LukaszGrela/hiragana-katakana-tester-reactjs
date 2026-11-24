import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { describe, expect, it } from "vitest";

import dataAdded from "../actions/dataAdded";
import selectionChanged from "../actions/selectionChanged";
import syllabaryAdded from "../actions/syllabaryAdded";
import syllabaryChanged from "../actions/syllabaryChanged";
import writingAdded from "../actions/writingAdded";
import writingChanged from "../actions/writingChanged";
import reducer from "../reducers";
import type { TSelection, TSyllabarySeries } from "../store/types";
import {
  seriesFixture,
  shortSeriesFixture,
  syllabaryFixture,
  writingFixture,
} from "../test/fixtures";
import Home from "./Home";

type THomeOptions = {
  selection?: TSelection;
  syllabary?: number;
  writing?: number;
  data?: TSyllabarySeries;
};

const renderHome = ({
  selection = ["all"],
  syllabary = 0,
  writing = 0,
  data = seriesFixture,
}: THomeOptions = {}) => {
  const store = createStore(reducer);

  store.dispatch(dataAdded(data));
  store.dispatch(syllabaryAdded(syllabaryFixture));
  store.dispatch(writingAdded(writingFixture));
  store.dispatch(syllabaryChanged(syllabary));
  store.dispatch(writingChanged(writing));
  store.dispatch(selectionChanged(selection));

  const view = render(
    <Provider store={store}>
      <Home />
    </Provider>,
  );

  return { store, ...view };
};

const startButton = (container: HTMLElement) =>
  container.querySelector(".start-button") as HTMLButtonElement;

describe("Home page", () => {
  it("describes the selected test and enables the start button", () => {
    const { container } = renderHome();

    expect(startButton(container)).not.toBeDisabled();
    expect(container.querySelector(".selection-syllabary")).toHaveTextContent(
      "Hiragana",
    );
    expect(container.querySelector(".selection-writing")).toHaveTextContent(
      "Romaji",
    );
    expect(container.querySelector(".button-label")).toHaveTextContent(
      "START TEST",
    );
    expect(
      screen.getByText("Selected 15 Kana of 3 series."),
    ).toBeInTheDocument();
  });

  it("counts only the selected series", () => {
    const { container } = renderHome({ selection: [0, 1] });

    expect(startButton(container)).not.toBeDisabled();
    expect(container.querySelector(".stats")).toHaveTextContent(
      "Selected 10 Kana of 2 series.",
    );
  });

  it("shows the katakana and kana options when they are selected", () => {
    const { container } = renderHome({ syllabary: 1, writing: 1 });

    expect(container.querySelector(".selection-syllabary")).toHaveTextContent(
      "Katakana",
    );
    expect(container.querySelector(".selection-writing")).toHaveTextContent(
      "Kana",
    );
  });

  it("is disabled without a selection", () => {
    const { container } = renderHome({ selection: [] });

    expect(startButton(container)).toBeDisabled();
    expect(container.querySelector(".stats")).toHaveTextContent(
      "Selected 0 Kana of 0 series.",
    );
  });

  it("is disabled with fewer than five kana", () => {
    const { container } = renderHome({
      data: [...seriesFixture, ...shortSeriesFixture],
      selection: [3],
    });

    expect(startButton(container)).toBeDisabled();
    expect(container.querySelector(".stats")).toHaveTextContent(
      "Selected 3 Kana of 1 series.",
    );
  });
});
