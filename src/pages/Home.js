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
import { withRouter } from 'react-router-dom';

class Home extends Component {
    state = {};

    render() {
        console.log(this.props);
        return (
            <div className='home'>
                <div className='wrapper'>
                    <button  disabled={!this.props.hasSelection}
                    onClick={() => {
                        this.props.onNavigation && this.props.onNavigation('game');
                    }}>
                        <span className='button-label'>START</span>
                        <span className='selection-syllabary'>{this.props.syllabary}</span>
                        <span className='selection-writing'>{this.props.writing}</span>
                    </button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('mapStateToProps', state);
    const { test, writing, selection, data } = state;
    console.log(selection);
    let hasSelection = false
    if(selection && selection.length > 0 && isNaN(parseInt(selection[0],10))) {
        console.log("SELECT ALL");
        hasSelection = true;
    }
    return {
        "syllabary": test && test.options && test.options.length > 0 ? test.options[test.selection] : '',
        "writing": writing && writing.options && writing.options.length > 0 ? writing.options[writing.selection] : '',
        hasSelection,

    }
}
export default withRouter(connect(mapStateToProps)(Home))