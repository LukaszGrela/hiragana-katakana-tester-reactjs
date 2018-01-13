import React from 'react';

import MoodIcon from '../icons/MoodIcon'

import './css/IncorrectFeedback.css'

const IncorrectFeedback = ({message})=>{

    return (
        <div className='feedback incorrect'>
            
            <div className='mood'>
                <MoodIcon className='sad size-medium' />
                <MoodIcon className='sad size-large' />
                <MoodIcon className='sad size-medium' />
            </div>
            <div className='message'>{message}</div>
        </div>
    )
}

export default IncorrectFeedback;