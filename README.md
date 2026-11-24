# hiragana-katakana-tester-reactjs

App to test Hiragana/Katakana syllabary, written in React + TypeScript.

## Live Link

[Hiragana/Katakana [syllabary] Tester Web App](https://greladesign.co/hiragana-katakana-tester)

## Tech stack

| Layer            | What is used                                                               |
| ---------------- | -------------------------------------------------------------------------- |
| UI               | React 19 (`createRoot`), React DOM 19                                      |
| Language / build | TypeScript 6, Vite 7                                                       |
| State            | Redux 5, React Redux 9, Redux Toolkit 2 (`configureStore`), `redux-logger` |
| Routing          | React Router 7 (`Routes` / `Route element`)                                |
| Helpers          | `react-responsive`, `bowser`                                               |
| Tests            | Vitest 5, jsdom, Testing Library, MSW 3                                    |
| Quality          | ESLint 8 + `@typescript-eslint`, `oxfmt`                                   |

## Requirements

- Node.js 20.19+ or 22.12+ (minimum for Vite 7)
- npm

## Getting started

```bash
git clone https://github.com/LukaszGrela/hiragana-katakana-tester-reactjs.git
cd hiragana-katakana-tester-reactjs
npm ci
npm run dev
```

Open http://localhost:5173/hiragana-katakana-tester/ — the app is served from the
`/hiragana-katakana-tester` base path configured in `vite.config.js`.

## Scripts

| Command                             | Description                             |
| ----------------------------------- | --------------------------------------- |
| `npm run dev`                       | Dev server with HMR                     |
| `npm run build`                     | Production build to `dist/`             |
| `npm run preview`                   | Preview the production build            |
| `npm run typecheck`                 | `tsc --noEmit`                          |
| `npm run lint`                      | ESLint, zero warnings allowed           |
| `npm test`                          | Vitest single run                       |
| `npm run fmt` / `npm run fmt:check` | Format / verify formatting with `oxfmt` |

## Project structure

```
public/data/data.json   syllabary data (series, options) loaded at runtime
src/pages               route views: AppView (routes), Splash, Home, Setup, Game, About, NoMatch
src/components          shared UI: ListSeries, CheckboxSwitch, Distractors,
                        SelectionHint, CorrectFeedback, IncorrectFeedback, GameOver, Stars, Footer
src/actions             Redux action creators
src/reducers            reducers (data, selection, syllabary, writing)
src/store               store setup, typed hooks, shared types
src/icons               SVG icon components
src/utils               helpers (kana counter, math)
src/test                Vitest setup, MSW handlers, fixtures
src/typings             ambient module declarations
```

## Data

`public/data/data.json` holds the syllabary series (romaji → hiragana/katakana),
display options and writing modes. It is fetched once on startup by `Splash`
(`${import.meta.env.BASE_URL}/data/data.json`) and kept in Redux. Series and modes
are driven by that file, so extending them does not require component edits.

## State management

The store is created with `configureStore` in `src/store/HKTesterStore.ts`, with
`redux-logger` appended to the default middleware. Components consume it through
the typed hooks in `src/store/hooks.ts` — `useAppSelector` and `useAppDispatch`,
exported via `.withTypes<T>()`.

`Game` and `Splash` remain class components. Their logic is untouched; a thin
function-component wrapper supplies store and router values by hook, so `connect`
is no longer used anywhere in `src`.

## Testing

12 test files run under Vitest with jsdom. `src/test/setup.ts` registers Testing
Library and jest-dom matchers and starts the MSW server; the handler in
`src/test/mswjs/handlers/data.ts` answers the `data.json` request, so component
tests render against real data without network access. Fixtures live in
`src/test/fixtures.ts`.

```bash
npm test
npx vitest run --coverage    # @vitest/coverage-v8
```

## Build and deployment

`npm run build` emits a static bundle to `dist/`. The app is published under
`/hiragana-katakana-tester/`, which is why `vite.config.js` sets that as `base`.
For Apache hosting, `public/.htaccess` is copied into the bundle and rewrites
unknown paths to `index.html`, keeping client-side routing alive after a refresh.

## Browser support

Target: modern evergreen browsers — Chrome (desktop and Android), Firefox,
Safari (macOS and iOS) and Edge.

## License

Apache License 2.0 — see [LICENSE](LICENSE).
© 2018 Łukasz "Severiaan" Grela (GrelaDesign)
