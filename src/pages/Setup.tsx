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
import type { ReactElement } from "react";

import selectionChanged from "../actions/selectionChanged";
import syllabaryChanged from "../actions/syllabaryChanged";
import writingChanged from "../actions/writingChanged";
import CheckboxSwitch from "../components/CheckboxSwitch";
import ListSeries from "../components/ListSeries";
import SelectionHint from "../components/SelectionHint";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import "./css/Setup.css";

const Setup = (): ReactElement => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.data);
  const rawSelection = useAppSelector((state) => state.selection);
  const syllabary = useAppSelector((state) => state.syllabary);
  const writing = useAppSelector((state) => state.writing);

  const hasSyllabaryOptions = syllabary.options.length > 0;
  const hasWritingOptions = writing.options.length > 0;

  //'all' - convert to list of ID's
  const selection: number[] =
    rawSelection.length === 1 && isNaN(Number(rawSelection[0]))
      ? data.map((item) => item.id)
      : (rawSelection as number[]);

  const fullSelection: number[] =
    rawSelection.length > 0 && rawSelection.length !== selection.length
      ? selection.concat()
      : data.map((item) => item.id);

  return (
    <div className="setup">
      <div className="wrapper">
        <div className="row test-what">
          <span>Choose what syllabary option to test:</span>
          <CheckboxSwitch
            id="test-what-switch"
            labelOn={hasSyllabaryOptions ? syllabary.options[1] : ""}
            labelOff={hasSyllabaryOptions ? syllabary.options[0] : ""}
            iconOn={"カ"}
            iconOff={"か"}
            isChecked={hasSyllabaryOptions && !!syllabary.selection}
            onChecked={(newState) => {
              dispatch(syllabaryChanged(newState ? 1 : 0));
            }}
          />
        </div>
        <div className="row writing">
          <span>Choose what writing option to test:</span>
          <CheckboxSwitch
            id="writing-switch"
            labelOn={hasWritingOptions ? writing.options[1] : ""}
            labelOff={hasWritingOptions ? writing.options[0] : ""}
            iconOn={"仮名"}
            iconOff={"Ro"}
            isChecked={hasWritingOptions && !!writing.selection}
            onChecked={(newState) => {
              dispatch(writingChanged(newState ? 1 : 0));
            }}
          />
        </div>
        <div className="row list-toolbar">
          <button
            className="selection-button"
            onClick={() => {
              if (selection.length === 0) {
                //select all
                dispatch(selectionChanged(fullSelection));
              } else {
                //deselect all
                dispatch(selectionChanged([]));
              }
            }}
          >
            {selection.length === 0 ? "Select All" : "Deselect All"}
          </button>
          <SelectionHint
            className="selection-stats"
            pattern={"It is selected {k} Kana of {s} series."}
            selection={selection}
            data={data}
          />
        </div>
        <ListSeries
          className="row series-list"
          data={data}
          selection={selection}
          onItemClicked={(id, selected) => {
            const newSelection = selection.concat();

            if (selected) {
              // deselect
              const index = newSelection.indexOf(id);

              if (index >= 0) {
                newSelection.splice(index, 1);
              }
            } else {
              newSelection.push(id);
            }

            dispatch(selectionChanged(newSelection));
          }}
        />
      </div>
    </div>
  );
};

export default Setup;
