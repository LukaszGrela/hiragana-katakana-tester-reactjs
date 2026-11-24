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
import { connect } from "react-redux";

import selectionChanged from "../actions/selectionChanged";
import syllabaryChanged from "../actions/syllabaryChanged";
import writingChanged from "../actions/writingChanged";
import CheckboxSwitch from "../components/CheckboxSwitch";
import ListSeries from "../components/ListSeries";
import SelectionHint from "../components/SelectionHint";
import type { TRootState } from "../reducers";
import type { TAppDispatch } from "../store/HKTesterStore";
import type { TSyllabarySeries } from "../store/types";

import "./css/Setup.css";

type TSetupStateProps = {
  fullSelection: number[];
  selection: number[];
  data: TSyllabarySeries;
  syllabary_label_on: string;
  syllabary_label_off: string;
  syllabary_selection: number;
  writing_label_on: string;
  writing_label_off: string;
  writing_selection: number;
};

type TSetupProps = TSetupStateProps & {
  dispatch: TAppDispatch;
};

const Setup = (props: TSetupProps): ReactElement => {
  const { dispatch } = props;
  return (
    <div className="setup">
      <div className="wrapper">
        <div className="row test-what">
          <span>Choose what syllabary option to test:</span>
          <CheckboxSwitch
            id="test-what-switch"
            labelOn={props.syllabary_label_on}
            labelOff={props.syllabary_label_off}
            iconOn={"カ"}
            iconOff={"か"}
            isChecked={!!props.syllabary_selection}
            onChecked={(newState) => {
              dispatch(syllabaryChanged(newState ? 1 : 0));
            }}
          />
        </div>
        <div className="row writing">
          <span>Choose what writing option to test:</span>
          <CheckboxSwitch
            id="writing-switch"
            labelOn={props.writing_label_on}
            labelOff={props.writing_label_off}
            iconOn={"仮名"}
            iconOff={"Ro"}
            isChecked={!!props.writing_selection}
            onChecked={(newState) => {
              dispatch(writingChanged(newState ? 1 : 0));
            }}
          />
        </div>
        <div className="row list-toolbar">
          <button
            className="selection-button"
            onClick={() => {
              if (props.selection.length === 0) {
                //select all
                dispatch(selectionChanged(props.fullSelection));
              } else {
                //deselect all
                dispatch(selectionChanged([]));
              }
            }}
          >
            {props.selection.length === 0 ? "Select All" : "Deselect All"}
          </button>
          <SelectionHint
            className="selection-stats"
            pattern={"It is selected {k} Kana of {s} series."}
            selection={props.selection}
            data={props.data}
          />
        </div>
        <ListSeries
          className="row series-list"
          data={props.data}
          selection={props.selection}
          onItemClicked={(id, selected) => {
            const newSelection = props.selection.concat();

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

const mapStateToProps = (state: TRootState): TSetupStateProps => {
  const { syllabary, writing, selection, data } = state;
  let _selection: number[] = selection as number[];
  let _fullSelection: number[] = [];

  if (selection && selection.length === 1 && isNaN(Number(selection[0]))) {
    //'all' - convert to list of ID's
    _selection = data.map((item) => item.id);
  }
  if (
    selection &&
    selection.length > 0 &&
    selection.length !== _selection.length
  ) {
    // all
    _fullSelection = _selection.concat();
  } else {
    // create
    _fullSelection = data.map((item) => item.id);
  }

  return {
    fullSelection: _fullSelection,
    selection: _selection,
    data: data,

    syllabary_label_on:
      syllabary && syllabary.options && syllabary.options.length > 0
        ? syllabary.options[1]
        : "",
    syllabary_label_off:
      syllabary && syllabary.options && syllabary.options.length > 0
        ? syllabary.options[0]
        : "",
    syllabary_selection:
      syllabary && syllabary.options && syllabary.options.length > 0
        ? syllabary.selection
        : 0,
    writing_label_on:
      writing && writing.options && writing.options.length > 0
        ? writing.options[1]
        : "",
    writing_label_off:
      writing && writing.options && writing.options.length > 0
        ? writing.options[0]
        : "",
    writing_selection:
      writing && writing.options && writing.options.length > 0
        ? writing.selection
        : 0,
  };
};

const mapDispatchToProps = (dispatch: TAppDispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
