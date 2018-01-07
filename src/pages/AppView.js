import React, { Component } from 'react';

export class AppView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className='app-view'>
                <div className='header'>Hiragana/Katakana Tester</div>
                <div className='content'></div>
                <div className='footer'>GrelaDesign (c) 2018</div>
            </div>
        )
    }
}

export default AppView;