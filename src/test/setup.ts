import "@testing-library/jest-dom/vitest";
import { mswServer } from "./mswjs/node";
import { afterAll, afterEach, beforeAll } from "vitest";

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
