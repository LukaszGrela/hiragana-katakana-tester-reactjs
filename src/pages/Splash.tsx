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
import { Component, useMemo, type FC } from "react";

import dataAdded from "../actions/dataAdded";
import selectionChanged from "../actions/selectionChanged";
import syllabaryAdded from "../actions/syllabaryAdded";
import syllabaryChanged from "../actions/syllabaryChanged";
import writingAdded from "../actions/writingAdded";
import writingChanged from "../actions/writingChanged";
import { useAppDispatch } from "../store/hooks";
import type { TDataFile } from "./types";

import "./css/Splash.css";

type TSplashProps = {
  dataAdded: typeof dataAdded;
  selectionChanged: typeof selectionChanged;
  syllabaryAdded: typeof syllabaryAdded;
  syllabaryChanged: typeof syllabaryChanged;
  writingAdded: typeof writingAdded;
  writingChanged: typeof writingChanged;
};

type TSplashState = {
  isLoading: boolean;
};

class Splash extends Component<TSplashProps, TSplashState> {
  constructor(props: TSplashProps) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  override componentDidMount() {
    const {
      dataAdded: addData,
      selectionChanged: changeSelection,
      syllabaryAdded: addSyllabary,
      syllabaryChanged: changeSyllabary,
      writingAdded: addWriting,
      writingChanged: changeWriting,
    } = this.props;
    fetch(`${import.meta.env.BASE_URL}/data/data.json`)
      .then((res) => res.json())
      .then((data: TDataFile) => {
        console.log("res", data);
        const selection = data.selection;
        const syllabary = data.syllabary;
        const writing = data.writing;
        const syllabary_series = data.syllabary_series.map((obj) => {
          return obj;
        });

        // -------------------------
        addData(syllabary_series);
        addSyllabary(syllabary);
        addWriting(writing);
        changeSyllabary(1);
        changeWriting(0);
        changeSyllabary(syllabary.selection);
        changeWriting(writing.selection);
        changeSelection(selection);
        // -------------------------
      })
      .catch((reason) => {
        console.error("Splash#componentDidMount", reason);
      });
  }

  override render() {
    return (
      <div className="splash">
        <div className="wrapper">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }
}

const SplashConnected: FC = () => {
  const dispatch = useAppDispatch();

  const actions = useMemo(
    () => ({
      dataAdded: (...args: Parameters<typeof dataAdded>) =>
        dispatch(dataAdded(...args)),
      selectionChanged: (...args: Parameters<typeof selectionChanged>) =>
        dispatch(selectionChanged(...args)),
      syllabaryAdded: (...args: Parameters<typeof syllabaryAdded>) =>
        dispatch(syllabaryAdded(...args)),
      syllabaryChanged: (...args: Parameters<typeof syllabaryChanged>) =>
        dispatch(syllabaryChanged(...args)),
      writingAdded: (...args: Parameters<typeof writingAdded>) =>
        dispatch(writingAdded(...args)),
      writingChanged: (...args: Parameters<typeof writingChanged>) =>
        dispatch(writingChanged(...args)),
    }),
    [dispatch],
  );

  return <Splash {...actions} />;
};

SplashConnected.displayName = "Splash";
export default SplashConnected;
