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

import SelectionHint from "../components/SelectionHint";
import { useAppSelector } from "../store/hooks";
import kanaCounter from "../utils/kanaCounter";

import "./css/Home.css";

export type THomeProps = {
  onNavigation?: (destination: string) => void;
};

const Home = ({ onNavigation }: THomeProps): ReactElement => {
  const data = useAppSelector((state) => state.data);
  const selection = useAppSelector((state) => state.selection);
  const syllabaryOption = useAppSelector((state) => state.syllabary);
  const writingOption = useAppSelector((state) => state.writing);

  const hasSelection = selection.length > 0;
  //'all' - convert to list of ID's
  const selectionIds: number[] =
    selection.length === 1 && isNaN(Number(selection[0]))
      ? data.map((item) => item.id)
      : (selection as number[]);

  const syllabary =
    syllabaryOption.options.length > 0
      ? syllabaryOption.options[syllabaryOption.selection]
      : "";
  const writing =
    writingOption.options.length > 0
      ? writingOption.options[writingOption.selection]
      : "";

  const { kana } = kanaCounter(data, selectionIds);
  return (
    <div className="home">
      <div className="wrapper">
        <button
          className="start-button"
          disabled={!hasSelection || kana < 5}
          onClick={() => {
            onNavigation?.("game");
          }}
        >
          <span className="button-content-wrapper">
            <span className="selection-syllabary">{syllabary}</span>
            <span className="selection-connect">with</span>
            <span className="selection-writing">{writing}</span>
            <span className="selection-sufix">test</span>
            <span className="button-label">START TEST</span>
          </span>
          <SelectionHint
            className="stats"
            pattern={"Selected {k} Kana of {s} series."}
            selection={selectionIds}
            data={data}
          />
        </button>
      </div>
    </div>
  );
};

export default Home;
