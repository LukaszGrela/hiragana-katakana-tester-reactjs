export const SELECTION_CHANGED = 'SELECTION_CHANGED';

export default function selectionChanged(selection) {
    return {
        type: SELECTION_CHANGED,
        payload: selection
    }
}