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
import { shuffle } from '../utils/math';

import IconMenu from '../icons/IconMenu';
import IconReplay from '../icons/IconReplay';
import ButtonIconNext from '../icons/ButtonIconNext';

import './css/Game.css';
import '../components/css/Popup.css';
import '../components/css/Feedback.css';

import CorrectFeedback from '../components/CorrectFeedback';
import IncorrectFeedback from '../components/IncorrectFeedback';
import GameOver from '../components/GameOver';
import Distractors from '../components/Distractors';
import { connect } from 'react-redux';

class Game extends Component {
  answeredList = [];

  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      current: {},
      index: 0,
      score: 0,
      correct: null,
      selectedBtnId: null,
      gameOver: false,
      hintUsed: false,
      hideButtonId: null,
    };
    this.showHint = this.showHint.bind(this);
    this.validateAnswer = this.validateAnswer.bind(this);
  }

  componentDidMount() {
    this.restart();
  }

  generateQuestionPool() {
    const { selection, data, syllabary, writing } = this.props;

    if (data && syllabary && writing) {
      const whatToTest = writing.selection; //romaji-0
      const romajiLabel = writing.options[0].toLowerCase();
      const syllabaryChosen =
        syllabary.options[syllabary.selection].toLowerCase();

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

      let questions = [];
      data.forEach((item, i) => {
        // test from which source:
        // pytamy o kana czy romaji
        // jak kana to z ktorego syllabariusza - romaji bedzie w opcjach odpowiedzi
        // jak romaji to z ktorego syllabariusza wziasc odpowiedzi

        if (selection.indexOf(item.id) !== -1) {
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
                distractors: chosenDistractors,
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
                distractors: chosenDistractors,
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

    const next = start ? 0 : index + 1;
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
        selectedBtnId: null,
        showPopup: false,
        hintUsed: false,
        hideButtonId: null,
      });
    }
  }

  gameOver() {
    this.setState({ gameOver: true });
  }

  goMenu() {
    const { history } = this.props;
    history.goBack();
  }

  restart() {
    const questions = this.generateQuestionPool();
    this.setState(
      {
        questions: questions,
        current: this.getNextQuestionData(questions[0]),
        index: 0,
        score: 0,
        correct: null,
        selectedBtnId: null,
        gameOver: false,
        hintUsed: false,
        hideButtonId: null,
      },
      () => {
        //
        this.nextQuestion(true);
      }
    );
  }

  showHint() {
    this.hideRandomDistractor();
  }

  hideRandomDistractor() {
    const {
      current: { correct, answerOptions },
    } = this.state;
    let i = -1;
    do {
      i = Math.floor(Math.random() * answerOptions.length);
    } while (answerOptions[i] === correct);

    this.setState(() => ({ hintUsed: true, hideButtonId: 'answer-' + i }));
  }

  validateAnswer(answer, btnId) {
    const { current } = this.state;
    let copy = Object.assign({}, current);

    if (copy.correct === answer) {
      // score

      copy.userAnswer = {
        isCorrect: true,
      };
      this.answeredList.push(copy);
      this.setState({
        score: this.state.score + 1,
        correct: true,
        selectedBtnId: btnId,
        showPopup: true,
      });
    } else {
      copy.userAnswer = {
        isCorrect: false,
        answer: answer,
      };
      this.answeredList.push(copy);
      this.setState({ correct: false, selectedBtnId: btnId, showPopup: true });
    }
  }

  render() {
    const {
      questions,
      current,
      index,
      score,
      correct,
      selectedBtnId,
      gameOver,
      showPopup,
      hideButtonId,
      hintUsed,
    } = this.state;
    const length = questions.length;
    return (
      <div
        className={
          'game' +
          (correct !== null ? (correct ? ' correct' : ' incorrect') : '') +
          (selectedBtnId !== null ? ' ' + selectedBtnId : '')
        }
      >
        <div className='wrapper'>
          <div className='card'>
            <div className='question'>{current.question}</div>
            <div className='progress bl'>{index + 1 + ' / ' + length}</div>
            {false && (
              <div className='progress-bar bl-edge'>
                <div
                  className='bar'
                  style={{
                    width: Math.round(((index + 1) / length) * 100) + '%',
                  }}
                />
              </div>
            )}
            <div className='score tr'>{score}</div>
          </div>
          <Distractors
            correct={current.correct}
            answerOptions={current.answerOptions}
            hideButtonId={hideButtonId}
            handleClick={(item, id) => {
              if (this.state.correct === null) {
                this.validateAnswer(item, id);
              }
            }}
          />
          <div className='hint'>
            <button
              disabled={hintUsed}
              onClick={() => {
                this.showHint();
              }}
            >
              Hint
            </button>
          </div>
          {showPopup ? (
            <div
              className={
                'popup-container' +
                (correct !== null ? (correct ? ' correct' : ' incorrect') : '')
              }
            >
              <div className='cloak' />
              <div className='popup'>
                <div className='popup-title'>
                  {gameOver ? 'Game Over!' : null}
                </div>
                <div className='popup-content'>
                  {gameOver ? (
                    <GameOver data={this.answeredList} />
                  ) : correct ? (
                    <CorrectFeedback message={'Excellent!'} />
                  ) : (
                    <IncorrectFeedback
                      message={'Incorrect!'}
                      correct={[
                        'Correct answer is: ',
                        <span key='span-answer' className='answer'>
                          {current.correct}
                        </span>,
                      ]}
                    />
                  )}
                </div>
                <div className='popup-buttons'>
                  {gameOver ? (
                    [
                      <button
                        key={'replay-button'}
                        className='replay-button'
                        onClick={(e) => {
                          e.preventDefault();
                          this.restart();
                        }}
                      >
                        <span className='label'>Again</span>
                        <IconReplay className='icon' />
                      </button>,
                      <button
                        key={'menu-button'}
                        className='menu-button'
                        onClick={(e) => {
                          e.preventDefault();
                          this.goMenu();
                        }}
                      >
                        <span className='label'>Menu</span>
                        <IconMenu className='icon' />
                      </button>,
                    ]
                  ) : (
                    <button
                      key={'next-question-button'}
                      className='next-question-button'
                      onClick={(e) => {
                        e.preventDefault();
                        this.nextQuestion();
                      }}
                    >
                      <span className='label'>Next</span>
                      <ButtonIconNext className='icon' />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { syllabary, writing, selection, data } = state;

  let _selection = selection;

  if (selection && selection.length === 1 && isNaN(selection[0])) {
    //'all' - convert to list of ID's
    _selection = data.map((item) => item.id);
  }

  return {
    selection: _selection,
    data,
    syllabary,
    writing,
  };
};
export default withRouter(connect(mapStateToProps)(Game));
