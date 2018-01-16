import React, { Component } from 'react';

import './css/Distractors.css';

class Distractors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            correct: props.correct || '',
            answerOptions: props.answerOptions || [],
            hideButtonId: null
        };
    }

    hideRandomDistractor() {
        const { answerOptions, correct } = this.state;

        let i = -1;
        do {
            i = Math.floor(Math.random() * answerOptions.length);
        } while (answerOptions[i] === correct);

        this.setState({ hideButtonId: 'answer-' + i });
    }

    componentWillReceiveProps(nextProp) {
        let newState = {};
        if (nextProp.correct !== this.state.correct) {
            newState.correct = nextProp.correct;
        }
        if (nextProp.answerOptions.join('') !== this.state.answerOptions.join('')) {
            newState.answerOptions = nextProp.answerOptions.concat();
        }


        if (newState.hasOwnProperty('correct') || newState.hasOwnProperty('answerOptions')) {
            newState.hideButtonId = null;
            this.setState(newState);
        }
    }

    /**
     * Returns answer buttons fragment.
     * @param {string} correct Correct answer value
     * @param {string[]} distractors List of distractor values
     * @returns {JSX.Element | null}
     */
    generateAnswers() {
        const { answerOptions } = this.state;

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
                        this.props.handleClick && this.props.handleClick(item, id);
                    }}>{item}</button>
            )
        })
    }
    render() {
        
        const { hideButtonId } = this.state;
        return (
            <div className={'distractors' + (hideButtonId !== null ? ' hide-' + hideButtonId : '')}>
                {
                    this.generateAnswers()
                }
            </div>
        );
    }
}

export default Distractors;