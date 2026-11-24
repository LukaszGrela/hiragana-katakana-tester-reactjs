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
import type { TSelection, TSyllabarySeries } from "../../store/types";

/**
 * `selection` może zawierać `"all"` — rozwijamy je do listy ID z `data`
 * (dawniej robił to `mapStateToProps` w `connect()`).
 */
export const resolveSelection = (
  selection: TSelection,
  data: TSyllabarySeries,
): number[] => {
  if (selection && selection.length === 1 && isNaN(Number(selection[0]))) {
    //'all' - convert to list of ID's
    return data.map((item) => item.id);
  }

  return selection as number[];
};
