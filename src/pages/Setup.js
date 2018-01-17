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
import connect from 'react-redux/lib/connect/connect';
import CheckboxSwitch from '../components/CheckboxSwitch';
import { ListSeries } from '../components/ListSeries';
import selectionChanged from "../actions/selectionChanged";
import syllabaryChanged from "../actions/syllabaryChanged";
import writingChanged from "../actions/writingChanged";

import './css/Setup.css';
import SelectionHint from '../components/SelectionHint';

class Setup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            syllabary_selection: (!!this.props.syllabary_selection && this.props.syllabary_selection === 1)
        }

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {

        const { data, selection, dispatch } = this.props;
        return (
            <div className='setup'>
                <div className='wrapper'>
                    <div className='row test-what'>
                        <span>Choose what syllabary option to test:</span>
                        <CheckboxSwitch
                            id='test-what-switch'
                            labelOn={this.props.syllabary_label_on}
                            labelOff={this.props.syllabary_label_off}
                            iconOn={'カ'}
                            iconOff={'か'}
                            isChecked={!!this.props.syllabary_selection}
                            onChecked={(newState) => {
                                dispatch(syllabaryChanged(newState ? 1 : 0));
                            }}
                        />
                    </div>
                    <div className='row writing'>
                        <span>Choose what writing option to test:</span>
                        <CheckboxSwitch
                            id='writing-switch'
                            labelOn={this.props.writing_label_on}
                            labelOff={this.props.writing_label_off}
                            iconOn={'仮名'}
                            iconOff={'Ro'}
                            isChecked={!!this.props.writing_selection}
                            onChecked={(newState) => {
                                dispatch(writingChanged(newState ? 1 : 0));
                            }} />
                    </div>
                    <div className='row list-toolbar'>
                        <button
                            className='selection-button'
                            onClick={() => {
                                if (selection.length === 0) {
                                    //select all
                                    dispatch(selectionChanged(this.props.fullSelection));
                                } else {
                                    //deselect all
                                    dispatch(selectionChanged([]));
                                }
                            }}
                        >{selection.length === 0 ? 'Select All' : 'Deselect All'}</button>
                        <SelectionHint
                            pattern={"It is selected {k} Kana of {s} series."}
                            selection={selection}
                            data={data} />
                    </div>
                    <ListSeries className='row series-list'
                        data={data}
                        selection={selection}
                        onItemClicked={(id, selected) => {
                            let newSelection = selection.concat();
                            if (selected) {
                                // deselect
                                let index = newSelection.indexOf(parseInt(id, 10));
                                if (index >= 0) {
                                    newSelection.splice(index, 1);
                                }
                            } else {
                                newSelection.push(parseInt(id, 10))
                            }

                            dispatch(selectionChanged(newSelection));
                        }} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { syllabary, writing, selection, data } = state;
    let _selection = selection;
    let _fullSelection = [];


    if (selection && selection.length === 1 && isNaN(selection[0])) {
        //'all' - convert to list of ID's
        _selection = data.map(item => item.id);
    }
    if (selection && selection.length > 0 && selection.length !== _selection.length) {
        // all
        _fullSelection = _selection.concat();
    } else {
        // create
        _fullSelection = data.map(item => item.id);
    }


    return {
        fullSelection: _fullSelection,
        selection: _selection,
        data: data,

        "syllabary_label_on": syllabary && syllabary.options && syllabary.options.length > 0 ? syllabary.options[1] : '',
        "syllabary_label_off": syllabary && syllabary.options && syllabary.options.length > 0 ? syllabary.options[0] : '',
        "syllabary_selection": syllabary && syllabary.options && syllabary.options.length > 0 ? syllabary.selection : 0,
        "writing_label_on": writing && writing.options && writing.options.length > 0 ? writing.options[1] : '',
        "writing_label_off": writing && writing.options && writing.options.length > 0 ? writing.options[0] : '',
        "writing_selection": writing && writing.options && writing.options.length > 0 ? writing.selection : 0,

    }
}

export default connect(mapStateToProps)(Setup);