import { TEST_DATA_ADDED } from "../actions/testAdded";
import { TEST_CHANGED } from "../actions/testChanged";

const testReducer = (state = {}, action) => {

    switch (action.type) {
        case TEST_DATA_ADDED:
            return action.payload;
        case TEST_CHANGED:
            return Object.assign({}, state, { ...state, selection: action.payload });
        default:
            break;
    }

    return state;
}

export default testReducer;