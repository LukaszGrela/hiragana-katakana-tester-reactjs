import { WRITING_DATA_ADDED } from "../actions/writingAdded";
import { WRITING_CHANGED } from "../actions/writingChanged";

const writingReducer = (state = {}, action) => {

    switch (action.type) {
        case WRITING_DATA_ADDED:
            return action.payload;
        case WRITING_CHANGED:
            return Object.assign({}, state, { ...state, selection: action.payload });
        default:
            break;
    }

    return state;
}

export default writingReducer;