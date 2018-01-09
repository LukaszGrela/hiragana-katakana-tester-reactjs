export const SYLLABARY_CHANGED = 'SYLLABARY_CHANGED';

export default function syllabaryChanged(selection = 0) {
    return {
        type: SYLLABARY_CHANGED,
        payload: selection
    }
}