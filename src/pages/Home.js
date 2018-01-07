import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { withRouter } from 'react-router-dom';

class Home extends Component {
    state = {}
    handleClick() {
        this.props.history.push('/game');
    }
    render() {
        console.log(this.props);
        return (
            <div className='home'>
                <div className='wrapper'>
                    <button  disabled={!this.props.hasSelection}
                    onClick={() => {
                        this.handleClick();
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