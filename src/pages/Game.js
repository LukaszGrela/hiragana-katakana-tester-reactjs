import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/lib/connect/connect';
import { shuffle } from "../utils/math";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            current: {},
            index: 0
        }
    }

    componentDidMount() {
        this.generateQuestionPool();
    }

    generateQuestionPool() {
        const { selection, data, syllabary, writing } = this.props;
        let pool = data.map((item) => {
            if (selection.indexOf(item.id) !== -1) {
                // test from which source:
                // pytamy o kana czy romaji
                // jak kana to z ktorego syllabariusza - romaji bedzie w opcjach odpowiedzi
                // jak romaji to z ktorego syllabariusza wziasc odpowiedzi

               return Object.assign({}, item); 
            }
        });
        shuffle(pool);
        console.log(pool);
    }

    render() {
        return (
            <div>-=GAME=-</div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('Game#mapStateToProps', state);
    const { syllabary, writing, selection, data } = state;

    let _selection = [];


    if (selection && selection.length === 1 && isNaN(selection[0])) {
        //'all' - convert to list of ID's
        _selection = data.map(item => item.id);
    }

    return {
        selection: _selection,
        data: data,
        syllabary: syllabary && syllabary.options && syllabary.options.length > 0 ? syllabary.options[syllabary.selection] : '',
        writing: writing && writing.options && writing.options.length > 0 ? writing.options[writing.selection] : '',
    }
}
export default withRouter(connect(mapStateToProps)(Game))