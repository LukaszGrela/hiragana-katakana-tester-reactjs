import React, { Component } from 'react';

import './css/Distractors.css';

const Distractors = ({ answerOptions, hideButtonId, handleClick }) => {
  const clickHandler = (item, id) => () => handleClick && handleClick(item, id);
  const generateAnswers = options =>
    options &&
    options.map((item, index) => (
      <button
        key={item}
        id={`answer-${index}`}
        onClick={clickHandler(item, `answer-${index}`)}>
        {item}
      </button>
    ));
  return (
    <div className={`distractors${hideButtonId ? ` hide-${hideButtonId}` : ''}`}>
      {generateAnswers(answerOptions)}
    </div>
  );
};

export default Distractors;
