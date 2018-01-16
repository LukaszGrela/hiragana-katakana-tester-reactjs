import React from 'react';

import IconGrade from '../icons/IconGrade';
import './css/Stars.css'

const Stars = () => {
    return (
        <div className='stars'>
            <IconGrade className='gold size-medium' />
            <IconGrade className='gold size-large' />
            <IconGrade className='gold size-medium' />
        </div>
    );
}

export default Stars;