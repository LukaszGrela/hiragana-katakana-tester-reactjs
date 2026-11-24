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

import { TSyllabarySeries } from "../store/types";

/**
 * Returns count of kana and series
 */
export default function kanaCounter(
  data: TSyllabarySeries,
  selection: number[],
) {
  let _nKanaLength = 0,
    _nSeriesLength = 0;
  const _nListLength = data ? data.length : 0;
  for (let i = 0; i < _nListLength; i++) {
    if (selection.indexOf(data[i].id) !== -1) {
      _nSeriesLength++;
      _nKanaLength += data[i].source.romaji.length;
    }
  }
  return { kana: _nKanaLength, series: _nSeriesLength };
}
