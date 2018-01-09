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