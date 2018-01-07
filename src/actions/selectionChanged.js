export const SELECTION_CHANGED = 'SELECTION_CHANGED';

/**
 * Action Creator - Creates SELECTION_CHANGED action passing the list of selected indices
 * @param {number[]} selection 
 */
export default function selectionChanged(selection) {
    return {
        type: SELECTION_CHANGED,
        payload: selection
    }
}