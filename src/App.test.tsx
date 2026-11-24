import { render } from "@testing-library/react";

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import hkTesterStore from "./store/HKTesterStore";
import { expect } from "vitest";

it("renders without crashing", () => {
  const { getByTestId } = render(
    <Provider store={hkTesterStore}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>,
  );

  expect(getByTestId("App")).toBeInTheDocument();
});
