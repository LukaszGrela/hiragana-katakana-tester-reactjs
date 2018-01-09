import { SYLLABARY_DATA_ADDED } from "../actions/syllabaryAdded";
import { SYLLABARY_CHANGED } from "../actions/syllabaryChanged";

const syllabaryReducer = (state = {}, action) => {

    switch (action.type) {
        case SYLLABARY_DATA_ADDED:
            return action.payload;
        case SYLLABARY_CHANGED:
            return Object.assign({}, state, { ...state, selection: action.payload });
        default:
            break;
    }

    return state;
}

export default syllabaryReducer;