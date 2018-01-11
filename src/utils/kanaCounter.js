/**
 * Returns count of kana and series
 * @param {object[]} data
 * @param {number[]} selection
 * @returns {object}
 */
export default function kanaCounter(data, selection) {
    let _nKanaLength = 0,
        _nSeriesLength = 0,
        _nListLength = data ? data.length : 0
    for (let i = 0; i < _nListLength; i++) {
        if (selection.indexOf(data[i].id) !== -1) {
            _nSeriesLength++;
            _nKanaLength += data[i].source.romaji.length;
        }
    }
    return { kana: _nKanaLength, series: _nSeriesLength };
}