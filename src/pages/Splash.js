import React, { Component } from 'react';
import axios from "axios";
import connect from 'react-redux/lib/connect/connect';
import dataAdded from '../actions/dataAdded';
import selectionChanged from '../actions/selectionChanged';
import testAdded from '../actions/testAdded';
import testChanged from '../actions/testChanged';
import writingAdded from '../actions/writingAdded';
import writingChanged from '../actions/writingChanged';

class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;
        axios.get('/data/data.json')
            .then(res => {

                const selection = res.data.selection;
                const test = res.data.test;
                const writing = res.data.writing;
                const syllabary_series = res.data.syllabary_series.map(obj => {
                    return obj;
                });
                
                // -------------------------
                dispatch(dataAdded(syllabary_series));
                dispatch(testAdded(test));
                dispatch(writingAdded(writing));
                dispatch(testChanged(1));
                dispatch(writingChanged(0));
                dispatch(testChanged(test.selection));
                dispatch(writingChanged(writing.selection));
                dispatch(selectionChanged(selection));
                // -------------------------
            }).catch(reason => {
                console.error('Splash#componentDidMount', reason);
            })
    }

    render() {
        return (
            <div className='splash'>
                <div className='wrapper'>
                    <div className='loading'>Loading...</div>
                </div>
            </div>
        )
    }
}

export default connect()(Splash);