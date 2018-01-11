import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/lib/connect/connect';
import { shuffle } from "../utils/math";

import IconMenu from "../icons/IconMenu";
import IconReplay from "../icons/IconReplay";


import './css/Game.css'


class Game extends Component {

    answeredList = [];

    constructor(props) {
        super(props);
        console.log('Game#constructor', props);
        this.state = {
            questions: [],
            current: {},
            index: 0,
            score: 0,
            correct: null,
            btnId: null,
            gameOver: false
        }
        this.showHint = this.showHint.bind(this);
        this.validateAnswer = this.validateAnswer.bind(this);
    }

    componentDidMount() {
        const questions = this.generateQuestionPool();
        this.setState({
            questions: questions,
            current: this.getNextQuestionData(questions[0]),
            index: 0,
            score: 0,
            correct: null,
            btnId: null,
            gameOver: false
        });
    }

    generateQuestionPool() {
        const { selection, data, syllabary, writing } = this.props;

        if (data && syllabary && writing) {
            const whatToTest = writing.selection;//romaji-0
            const romajiLabel = writing.options[0].toLowerCase();
            const syllabaryChosen = syllabary.options[syllabary.selection].toLowerCase();

            // collect distractors
            let distractors = [];
            data.filter((item) => {
                if (whatToTest === 1) {
                    // test kana
                    item.source[romajiLabel].forEach((element, index) => {
                        distractors.push(element);
                    });
                } else {
                    // test romaji
                    item.source[syllabaryChosen].forEach((element, index) => {
                        distractors.push(element);
                    });
                }
                return false;
            });
            distractors = shuffle(distractors);

            const distractorsCopy = distractors.concat();

            console.log(distractors);
            let questions = [];
            let pool = data.filter((item) => {
                // test from which source:
                // pytamy o kana czy romaji
                // jak kana to z ktorego syllabariusza - romaji bedzie w opcjach odpowiedzi
                // jak romaji to z ktorego syllabariusza wziasc odpowiedzi

                if (selection.indexOf(item.id) !== -1) {
                    console.log('whatToTest', whatToTest, 'whatToTestLabel', romajiLabel, 'syllabaryChosen', syllabaryChosen);
                    let question;
                    let chosenDistractors = [];

                    if (whatToTest === 1) {
                        // test kana
                        item.source[romajiLabel].forEach((element, index) => {
                            chosenDistractors = [];
                            while (chosenDistractors.length < 4) {
                                if (distractors.length === 0) {
                                    distractors = distractorsCopy.concat();
                                    distractors = shuffle(distractors);
                                }
                                if (distractors[0] !== element) {
                                    chosenDistractors.push(distractors.shift());
                                } else {
                                    chosenDistractors.push(distractors.splice(1, 1));
                                }
                            }

                            question = {
                                // correct/distractors from romaji
                                correct: element,
                                // question from syllabary
                                question: item.source[syllabaryChosen][index],
                                distractors: chosenDistractors
                            };
                            questions.push(question);
                        });
                    } else {
                        // test romaji
                        item.source[syllabaryChosen].forEach((element, index) => {
                            chosenDistractors = [];
                            while (chosenDistractors.length < 4) {
                                if (distractors.length === 0) {
                                    distractors = distractorsCopy.concat();
                                    distractors = shuffle(distractors);
                                }
                                if (distractors[0] !== element) {
                                    chosenDistractors.push(distractors.shift());
                                } else {
                                    chosenDistractors.push(distractors.splice(1, 1));
                                }
                            }

                            question = {
                                // correct/distractors from kana
                                correct: element,
                                // question from romaji
                                question: item.source[romajiLabel][index],
                                distractors: chosenDistractors
                            };
                            questions.push(question);
                        });
                    }
                    return true;
                }
                return false;
            });


            shuffle(questions);
            return questions;
        }
    }


    getNextQuestionData(next) {
        // clone the question
        let copy = Object.assign({}, next);
        // randomise answer options
        let list = copy.distractors.concat(copy.correct);
        list = shuffle(list);
        copy.answerOptions = list;
        //
        return copy;
    }

    nextQuestion(start = false) {
        const { questions, index } = this.state;
        console.log('Game#nextQuestion', start, index, questions.length);
        const next = start ? 0 : (index + 1);
        if (start) {
            this.answeredList = [];
        }
        if (next >= questions.length) {
            this.gameOver();
        } else {
            // 
            const copy = this.getNextQuestionData(questions[next]);
            this.setState({ index: next, current: copy, correct: null, btnId: null, showPopup:false });


        }
    }

    gameOver() {
        console.log('Game Over');
        this.setState({ gameOver: true });
    }

    showHint() {
        this.hideRandomDistractor();
    }
    hideRandomDistractor() { }

    validateAnswer(answer, btnId) {
        const { current } = this.state;
        let copy = Object.assign({}, current);


        if (copy.correct === answer) {
            // score
            console.log("CORRECT");
            copy.userAnswer = {
                isCorrect: true
            }
            this.answeredList.push(copy);
            this.setState({ score: this.state.score + 1, correct: true, btnId: btnId, showPopup: true });
        } else {
            console.warn("INCORRECT!");
            copy.userAnswer = {
                isCorrect: false,
                answer: answer
            }
            this.answeredList.push(copy);
            this.setState({ correct: false, btnId: btnId, showPopup: true });
        }
    }

    /**
     * Returns answer buttons fragment.
     * @param {string} correct Correct answer value
     * @param {string[]} distractors List of distractor values
     * @returns {JSX.Element | null}
     */
    generateAnswers() {
        const { answerOptions } = this.state.current;

        if (!answerOptions) return null;


        let i = 0;
        return answerOptions.map(item => {
            const id = 'answer-' + (i++);
            return (
                <button
                    key={item}
                    id={id}
                    onClick={(e) => {
                        e.preventDefault();
                        if (this.state.correct === null) {
                            this.validateAnswer(item, id);
                        }
                    }}>{item}</button>
            )
        })
    }

    render() {
        const { questions, current, index, score, correct, btnId, gameOver, showPopup } = this.state;
        const length = questions.length;
        return (
            <div className={'game' + (correct !== null ? (correct ? ' correct' : ' incorrect') : '') + (btnId !== null ? ' ' + btnId : '')}>
                <div className='wrapper'>
                    <div className='card'>
                        <div className='question'>{current.question}</div>
                        <div className='progress bl'>{(index + 1) + ' / ' + length}</div>
                        <div className='score tr'>{score}</div>
                    </div>
                    <div className='distractors'>
                        {
                            this.generateAnswers(current.correct, current.distractors)
                        }
                    </div>
                    <div className='hint'>
                        <button onClick={() => {
                            this.showHint();
                        }}>Podpowiedź</button>
                    </div>
                    {
                        showPopup ?
                            (
                                <div className={'popup-container' + (correct !== null ? (correct ? ' correct' : ' incorrect') : '')}>
                                    <div className='cloak'></div>
                                    <div className='popup'>
                                        <div className='popup-title'>Feedback</div>
                                        <div className='popup-content'>

                                        </div>
                                        <div className='popup-buttons'>
                                            {
                                                gameOver ? [
                                                    <button
                                                        key={'replay-button'}
                                                        className='replay-button'
                                                        onClick={() => {
                                                            console.log("Restart Quiz");
                                                        }}><IconReplay /></button>,
                                                    <button
                                                        key={'menu-button'}
                                                        className='menu-button'
                                                        onClick={() => {
                                                            console.log("Go to Menu");
                                                        }}><IconMenu /></button>
                                                ] : correct ? [
                                                    <button
                                                        key={'next-question-button'}
                                                        className='next-question-button'
                                                        onClick={() => {
                                                            this.nextQuestion();
                                                        }}><IconReplay /></button>
                                                ] : [

                                                            <button
                                                                key={'next-question-button'}
                                                                className='next-question-button'
                                                                onClick={() => {
                                                                    this.nextQuestion();
                                                                }}><IconReplay /></button>
                                                        ]
                                            }
                                        </div>
                                    </div>
                                </div>
                            ) :
                            (null)
                    }

                </div>
            </div >
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