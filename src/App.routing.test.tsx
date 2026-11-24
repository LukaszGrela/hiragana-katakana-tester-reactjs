import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import { describe, expect, it } from "vitest";

import App from "./App";
import reducer from "./reducers";

const renderApp = (path = "/") => {
  const store = createStore(reducer);

  const view = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </Provider>,
  );

  return { store, ...view };
};

describe("App routing", () => {
  it("shows the splash screen on the start page without data", () => {
    const { container } = renderApp("/");

    expect(screen.getByTestId("App")).toHaveClass("App", "page-home");
    expect(container.querySelector(".splash")).not.toBeNull();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("redirects a deep link to the splash screen while there is no data", () => {
    const { container } = renderApp("/game");

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(container.querySelector(".App")).toHaveClass("page-home");
    expect(container.querySelector(".game")).toBeNull();
  });

  it("renders the home page once the data is loaded", async () => {
    const { container, store } = renderApp("/");

    await waitFor(() => expect(store.getState().data.length).toBe(6));

    expect(container.querySelector(".splash")).toBeNull();
    expect(container.querySelector(".home")).not.toBeNull();
    expect(
      container.querySelector(".start-button") as HTMLButtonElement,
    ).not.toBeDisabled();
    expect(screen.getByText("START TEST")).toBeInTheDocument();
  });
});
