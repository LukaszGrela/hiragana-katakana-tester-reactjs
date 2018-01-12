import React from 'react';

import './css/CorrectFeedback.css'
import IconGrade from '../icons/IconGrade';

const CorrectFeedback = ({ message }) => {

    return (
        <div className='feedback correct'>
            <div className='stars'>
                <IconGrade className='gold size-medium' />
                <IconGrade className='gold size-large' />
                <IconGrade className='gold size-medium' />
            </div>
            <div className='message'>{message}</div>
        </div>
    )
}

export default CorrectFeedback;