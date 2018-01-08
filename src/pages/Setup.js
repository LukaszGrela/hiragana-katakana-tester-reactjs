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

import './css/Setup.css';

class Setup extends Component {
    constructor(props) {
        super(props);
        console.log("Setup#constructor");
        this.state = {
            syllabary_selection: (!!this.props.syllabary_selection && this.props.syllabary_selection === 1)
        }

    }

    render() {

        const { data, selection, dispatch } = this.props;
        return (
            <div className='setup'>
                <div className='wrapper'>
                    <div className='row test-what'>
                        <CheckboxSwitch
                            id='test-what-switch'
                            labelOn={this.props.syllabary_label_on}
                            labelOff={this.props.syllabary_label_off}
                            isChecked={!!this.props.syllabary_selection}
                        />
                    </div>
                    <div className='row writing'>
                        <CheckboxSwitch
                            id='writing-switch'
                            labelOn={this.props.writing_label_on}
                            labelOff={this.props.writing_label_off}
                            isChecked={!!this.props.writing_selection} />
                    </div>
                    <div className='row selection-buttons'>
                        <button
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
                        {
                            'Zaznaczono XXX kana z YYY serii.'
                        }
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
                            console.log('onItemClicked', id, selected);
                            dispatch(selectionChanged(newSelection));
                        }} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { test, writing, selection, data } = state;
    let _selection = selection;
    let _fullSelection = [];
    console.log("mapStateToProps");

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

        "syllabary_label_on": test && test.options && test.options.length > 0 ? test.options[1] : '',
        "syllabary_label_off": test && test.options && test.options.length > 0 ? test.options[0] : '',
        "syllabary_selection": test && test.options && test.options.length > 0 ? test.selection : 0,
        "writing_label_on": writing && writing.options && writing.options.length > 0 ? writing.options[1] : '',
        "writing_label_off": writing && writing.options && writing.options.length > 0 ? writing.options[0] : '',
        "writing_selection": writing && writing.options && writing.options.length > 0 ? writing.selection : 0,

    }
}

export default connect(mapStateToProps)(Setup);