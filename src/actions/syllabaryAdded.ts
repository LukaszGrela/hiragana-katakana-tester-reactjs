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
import type { TSyllabary } from '../store/types';

export const SYLLABARY_DATA_ADDED = 'SYLLABARY_DATA_ADDED';

export type TSyllabaryAddedAction = {
  type: typeof SYLLABARY_DATA_ADDED;
  payload: TSyllabary;
};

export default function syllabaryAdded(
  data: TSyllabary = { selection: 0, options: [] },
): TSyllabaryAddedAction {
  return {
    type: SYLLABARY_DATA_ADDED,
    payload: data,
  };
}
