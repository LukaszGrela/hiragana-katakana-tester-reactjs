import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, it } from "vitest";

import reducer from "../reducers";
import Splash from "./Splash";

describe("Splash page", () => {
  it("shows the loader before the data arrives", () => {
    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <Splash />
      </Provider>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(store.getState().data).toEqual([]);
  });

  it("fetches data.json and seeds the store", async () => {
    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <Splash />
      </Provider>,
    );

    await waitFor(() => expect(store.getState().data).toHaveLength(6));

    const state = store.getState();

    expect(state.selection).toEqual(["all"]);
    expect(state.syllabary.options).toEqual(["Hiragana", "Katakana"]);
    expect(state.writing.options).toEqual(["Romaji", "Kana"]);
    expect(Object.keys(state.data[0].source)).toEqual([
      "romaji",
      "hiragana",
      "katakana",
    ]);
  });
});
