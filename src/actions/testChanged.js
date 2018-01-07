export const TEST_CHANGED = 'TEST_CHANGED';

export default function testChanged(selection = 0) {
    return {
        type: TEST_CHANGED,
        payload: selection
    }
}