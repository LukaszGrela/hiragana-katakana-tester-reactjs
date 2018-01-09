import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/lib/connect/connect';
import { shuffle } from "../utils/math";

class Game extends Component {
    constructor(props) {
        super(props);
        console.log('Game#constructor', props);
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

        if (data && syllabary && writing) {
            const whatToTest = writing.selection;//romaji-0
            const romajiLabel = writing.options[0].toLowerCase();
            const syllabaryChosen = syllabary.options[syllabary.selection].toLowerCase();


            let questions = [];
            let pool = data.filter((item) => {
                // test from which source:
                // pytamy o kana czy romaji
                // jak kana to z ktorego syllabariusza - romaji bedzie w opcjach odpowiedzi
                // jak romaji to z ktorego syllabariusza wziasc odpowiedzi
                if (selection.indexOf(item.id) !== -1) {
                    console.log('whatToTest', whatToTest, 'whatToTestLabel', romajiLabel, 'syllabaryChosen', syllabaryChosen);
                    if (whatToTest === 1) {
                        // test kana
                        item.source[romajiLabel].forEach((element, index) => {
                            questions.push({
                                // correct/distracters from romaji
                                correct: element,
                                // question from syllabary
                                question: item.source[syllabaryChosen][index]
                            });
                        });
                    } else {
                        // test romaji
                        item.source[syllabaryChosen].forEach((element, index) => {
                            questions.push({
                                // correct/distracters from kana
                                correct: element,
                                // question from romaji
                                question: item.source[romajiLabel][index]
                            });
                        });
                    }
                    return true;
                }
                return false;
            });


            shuffle(questions);
            console.log(questions);
        }
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

    let _selection = selection;


    if (selection && selection.length === 1 && isNaN(selection[0])) {
        //'all' - convert to list of ID's
        _selection = data.map(item => item.id);
    }

    return {
        selection: _selection,
        data,
        syllabary,
        writing,
    }
}
export default withRouter(connect(mapStateToProps)(Game))