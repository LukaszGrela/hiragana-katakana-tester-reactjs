import React from 'react';
import kanaCounter from '../utils/kanaCounter';

const SelectionHint = ({ selection, data }) => {

    const { kana, series } = kanaCounter(data, selection);

    return (<span className='selection-stats'>{"Wybrano " + kana + " Kana z " + series + " serii."}</span>);

};

export default SelectionHint;