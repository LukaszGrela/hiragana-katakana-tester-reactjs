export const WRITING_CHANGED = 'WRITING_CHANGED';

export default function writingChanged(selection = 0) {
    return {
        type: WRITING_CHANGED,
        payload: selection
    }
}