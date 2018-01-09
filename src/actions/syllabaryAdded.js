export const SYLLABARY_DATA_ADDED = "SYLLABARY_DATA_ADDED";

export default function syllabaryAdded(data = { selection: 0, options: [] }) {
    return {
        type: SYLLABARY_DATA_ADDED,
        payload: data
    };
}