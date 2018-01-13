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