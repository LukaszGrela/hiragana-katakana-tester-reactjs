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
import { Component } from "react";
import { connect } from "react-redux";
import dataAdded from "../actions/dataAdded";
import selectionChanged from "../actions/selectionChanged";
import syllabaryAdded from "../actions/syllabaryAdded";
import syllabaryChanged from "../actions/syllabaryChanged";
import writingAdded from "../actions/writingAdded";
import writingChanged from "../actions/writingChanged";

import "./css/Splash.css";

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    fetch(`${import.meta.env.BASE_URL}/data/data.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log("res", data);
        const selection = data.selection;
        const syllabary = data.syllabary;
        const writing = data.writing;
        const syllabary_series = data.syllabary_series.map((obj) => {
          return obj;
        });

        // -------------------------
        dispatch(dataAdded(syllabary_series));
        dispatch(syllabaryAdded(syllabary));
        dispatch(writingAdded(writing));
        dispatch(syllabaryChanged(1));
        dispatch(writingChanged(0));
        dispatch(syllabaryChanged(syllabary.selection));
        dispatch(writingChanged(writing.selection));
        dispatch(selectionChanged(selection));
        // -------------------------
      })
      .catch((reason) => {
        console.error("Splash#componentDidMount", reason);
      });
  }

  render() {
    return (
      <div className="splash">
        <div className="wrapper">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }
}

const SplashConnected = connect()(Splash);

export default SplashConnected;
