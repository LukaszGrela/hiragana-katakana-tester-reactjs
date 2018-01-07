export const WRITING_DATA_ADDED = 'WRITING_DATA_ADDED';

export default function writingAdded(data = { selection: 0, options: [] }) {
    return {
        type: WRITING_DATA_ADDED,
        payload: data
    }
}