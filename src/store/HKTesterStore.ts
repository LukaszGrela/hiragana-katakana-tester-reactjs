/*
   Copyright 2018 Łukasz 'Severiaan' Grela GrelaDesign

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
import { legacy_createStore, applyMiddleware } from "redux";
import type { Middleware } from "redux";
import { logger } from "redux-logger";

import reducer, { type TRootState as TReducerState } from "../reducers";

const loggerMiddleware: Middleware<{}, TReducerState> = logger;
// Redux 5: `legacy_createStore` jest zamiennikiem przestarzałego `createStore`
// (pełny następca to `configureStore` z Redux Toolkit).
const middleware = applyMiddleware<{}, TReducerState>(loggerMiddleware);

const hkTesterStore = legacy_createStore(reducer, undefined, middleware);

export type TRootState = ReturnType<typeof hkTesterStore.getState>;
export type TAppDispatch = typeof hkTesterStore.dispatch;

export default hkTesterStore;
