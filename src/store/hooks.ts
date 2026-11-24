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
import { useDispatch, useSelector } from "react-redux";

import type { TRootState } from "../reducers";
import type { TAppDispatch } from "./HKTesterStore";

/**
 * Typowane hooki `react-redux` (API `.withTypes` z v9).
 * Zamiast `connect()` + `mapStateToProps` w komponentach funkcyjnych.
 */
export const useAppDispatch = useDispatch.withTypes<TAppDispatch>();
export const useAppSelector = useSelector.withTypes<TRootState>();
