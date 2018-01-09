import React from 'react';

const SelectionHint = ({ selection, data }) => {

    let _nKanaLength = 0,
        _nSeriesLength = 0,
        _nListLength = data ? data.length : 0
    for (let i = 0; i < _nListLength; i++) {
        if (selection.indexOf(data[i].id) !== -1) {
            _nSeriesLength++;
            _nKanaLength += data[i].source.romaji.length;
        }
    }
    return (<span className='selection-stats'>{"Wybrano " + _nKanaLength + " Kana z " + _nSeriesLength + " serii."}</span>);

};

export default SelectionHint;