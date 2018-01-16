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
import React from 'react';

import Stars from '../components/Stars'

import './css/GameOver.css'

const GameOver = ({ data }) => {

    const incorrect = data.filter(item => {
        return !item.userAnswer.isCorrect;
    })
    let incorrectList = null;
    if (incorrect && incorrect.length > 0) {
        // generate list
        incorrectList = incorrect.map((item, index) => {
            console.log(index, item)
            return (<li key={index}>
                <span className='go-question'>{item.question}</span>
                <span className='go-your-answer-label'>Twoja odpowiedź: <span className='go-your-answer-value'>{item.userAnswer.answer}</span>, </span>
                <span className='go-correct-answer-label'>poprawna: <span className='go-correct-answer-value'>{item.correct}</span></span>
            </li>);
        })
    }

    return (
        <div className='game-over'>
            {
                incorrectList ?
                    [
                        <div key={'go-list-title'} className='go-list-title'>{'Twoje błędne odpowiedzi:'}</div>,
                        <ul key={'go-incorrect-list'} className='go-incorrect-list'>
                            {
                                incorrectList
                            }
                        </ul>
                    ]
                    : 
                    [
                        <div className='congratulation'>
                            <Stars />
                            <p>Brawo, odpowiedziałeś poprawnie, na wszystkie pytania.</p>
                        </div>
                    ]
            }
        </div>
    )
}

export default GameOver;