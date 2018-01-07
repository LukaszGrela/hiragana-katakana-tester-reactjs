import React, { Component } from 'react';
import axios from "axios";
import connect from 'react-redux/lib/connect/connect';
import dataAdded from '../actions/dataAdded';
import selectionChanged from '../actions/selectionChanged';

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
                
                const syllabary_series = res.data.syllabary_series.map(obj => {
                    console.log(obj);
                    return obj;
                });
                
                dispatch(dataAdded(syllabary_series));
                dispatch(selectionChanged(selection));
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