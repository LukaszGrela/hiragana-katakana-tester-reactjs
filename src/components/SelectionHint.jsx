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
import kanaCounter from '../utils/kanaCounter';

const SelectionHint = ({ selection, data, pattern, className }) => {

    const { kana, series } = kanaCounter(data, selection);
    const stats = pattern.replace(/{(k|s)}/gi, (match, $1, index) => {
        switch ($1) {
            case 'k':
                return kana;
            case 's':
                return series;
            default:
                return match;
        }
    })
    return (<span className={'selection-hint' + (className ? ' '+className:'')}>{stats}</span>);

};

export default SelectionHint;