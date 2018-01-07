export const TEST_DATA_ADDED = "TEST_DATA_ADDED";

export default function testAdded(data = { selection: 0, options: [] }) {
    return {
        type: TEST_DATA_ADDED,
        payload: data
    };
}