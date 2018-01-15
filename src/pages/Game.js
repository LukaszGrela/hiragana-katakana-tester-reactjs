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
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/lib/connect/connect';
import { shuffle } from "../utils/math";

import IconMenu from "../icons/IconMenu";
import IconReplay from "../icons/IconReplay";
import ButtonIconNext from "../icons/ButtonIconNext";


import './css/Game.css'
import '../components/css/Popup.css'
import '../components/css/Feedback.css'

import CorrectFeedback from '../components/CorrectFeedback';
import IncorrectFeedback from '../components/IncorrectFeedback';
import GameOver from '../components/GameOver';


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
        this.restart();
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
            data.forEach((item, i) => {
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
                }
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
            this.setState({
                index: next,
                current: copy,
                correct: null,
                btnId: null,
                showPopup: false
            });


        }
    }

    gameOver() {
        console.log('Game Over');
        this.setState({ gameOver: true });
    }


    goMenu() {
        const { history } = this.props;
        history.goBack();
    }

    restart() {

        const questions = this.generateQuestionPool();
        this.setState({
            questions: questions,
            current: this.getNextQuestionData(questions[0]),
            index: 0,
            score: 0,
            correct: null,
            btnId: null,
            gameOver: false
        }, () => {
            //
            this.nextQuestion(true);
        });

    }

    showHint() {
        this.hideRandomDistractor();
    }




    hideRandomDistractor() {

    }

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
                        <div className='progress-bar bl-edge'>
                            <div className='bar' style={{ width: Math.round(((index + 1) / length) * 100) + '%' }}></div>
                        </div>
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
                                        <div className='popup-title'>
                                        {
                                            gameOver ? 'Game Over!':null
                                        }
                                        </div>
                                        <div className='popup-content'>
                                            {
                                                gameOver ? <GameOver data={this.answeredList} />
                                                :
                                                correct ?
                                                    <CorrectFeedback message={'Świetnie!'} /> :
                                                    <IncorrectFeedback
                                                        message={'Niepoprawnie!'}
                                                        correct={["Prawidłowa odpowiedź to: ",<span key='span-answer' className='answer'>{current.correct}</span>]}/>
                                            }
                                        </div>
                                        <div className='popup-buttons'>
                                            {
                                                gameOver ? [
                                                    <button
                                                        key={'replay-button'}
                                                        className='replay-button'
                                                        onClick={() => {
                                                            console.log("Restart Quiz");
                                                            this.restart();
                                                        }}><IconReplay /></button>,
                                                    <button
                                                        key={'menu-button'}
                                                        className='menu-button'
                                                        onClick={() => {
                                                            console.log("Go to Menu");
                                                            this.goMenu();
                                                        }}><IconMenu /></button>
                                                ] :
                                                    <button
                                                        key={'next-question-button'}
                                                        className='next-question-button'
                                                        onClick={() => {
                                                            this.nextQuestion();
                                                        }}><span className='label'>Dalej</span><ButtonIconNext /></button>

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