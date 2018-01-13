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

import './css/OnOffSwitch.css'

class CheckboxSwitch extends Component {
    constructor(props) {
        super(props);
        console.log("CheckboxSwitch#constructor",props);
        this.state = {
            selected: props.isChecked || false
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if(this.state.selected !== nextProps.isChecked) {
            this.setState({selected:nextProps.isChecked});
        }
    }


    render() {
        return (
            <div className={"onoffswitch ." + this.props.id}>
                <input
                    type="checkbox"
                    name="onoffswitch"
                    className="onoffswitch-checkbox"
                    id={this.props.id}
                    checked={this.state.selected}
                    onChange={(e) => {
                        //this.setState({ selected: !this.state.selected });
                        this.props.onChecked && this.props.onChecked(!this.state.selected);
                    }}
                />
                <label className="onoffswitch-label" htmlFor={this.props.id}>
                    <span className="onoffswitch-inner">
                        <span className="before">{this.props.labelOn || "ON"}</span><span className="after">{this.props.labelOff || "OFF"}</span>
                    </span>
                    <span className="onoffswitch-switch">
                        <span className="before">{this.props.iconOn || "+"}</span><span className="after">{this.props.iconOff || "-"}</span>
                    </span>
                </label>
            </div>
        )
    }
}

export default CheckboxSwitch;