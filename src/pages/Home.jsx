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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SelectionHint from '../components/SelectionHint';

import './css/Home.css';
import kanaCounter from '../utils/kanaCounter';

const Home = (props) => {
  const { data, selection } = props;
  const { kana } = kanaCounter(data, selection);
  return (
    <div className='home'>
      <div className='wrapper'>
        <button
          className='start-button'
          disabled={!props.hasSelection || kana < 5}
          onClick={() => {
            props.onNavigation && props.onNavigation('game');
          }}
        >
          <span className='button-content-wrapper'>
            <span className='selection-syllabary'>{props.syllabary}</span>
            <span className='selection-connect'>with</span>
            <span className='selection-writing'>{props.writing}</span>
            <span className='selection-sufix'>test</span>
            <span className='button-label'>START TEST</span>
          </span>
          <SelectionHint
            className='stats'
            pattern={'Selected {k} Kana of {s} series.'}
            selection={selection}
            data={data}
          />
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { syllabary, writing, selection, data } = state;

  let hasSelection = false,
    _selection = selection;
  if (selection && selection.length > 0) {
    hasSelection = true;
  }

  if (selection && selection.length === 1 && isNaN(selection[0])) {
    //'all' - convert to list of ID's
    _selection = data.map((item) => item.id);
  }

  return {
    selection: _selection,
    data: data,
    syllabary:
      syllabary && syllabary.options && syllabary.options.length > 0
        ? syllabary.options[syllabary.selection]
        : '',
    writing:
      writing && writing.options && writing.options.length > 0
        ? writing.options[writing.selection]
        : '',
    hasSelection,
  };
};
export default withRouter(connect(mapStateToProps)(Home));
