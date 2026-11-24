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

import { WRITING_DATA_ADDED } from '../actions/writingAdded';
import { WRITING_CHANGED } from '../actions/writingChanged';
import type { TAction, TWriting } from '../store/types';

const writingReducer = (
  state: TWriting = { selection: 0, options: [] },
  action: TAction,
): TWriting => {
  switch (action.type) {
    case WRITING_DATA_ADDED:
      return action.payload;
    case WRITING_CHANGED:
      return { ...state, selection: action.payload };
    default:
      break;
  }

  return state;
};

export default writingReducer;
