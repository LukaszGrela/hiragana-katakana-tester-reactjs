export const DATA_ADDED = 'DATA_ADDED';

export default function dataAdded(data = []) {
    return {
        type: DATA_ADDED,
        payload: data
    }
}