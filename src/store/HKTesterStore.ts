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
import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";

import reducer from "../reducers";

// Redux Toolkit: `configureStore` zastepuje `createStore`/`legacy_createStore`
// i wlacza domyslne middleware (m.in. thunk) + DevTools.
// `logger` zostaje na koncu lancucha, jak dotychczas (dev: podglad akcji).
const hkTesterStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type TRootState = ReturnType<typeof hkTesterStore.getState>;
export type TAppDispatch = typeof hkTesterStore.dispatch;

export default hkTesterStore;
