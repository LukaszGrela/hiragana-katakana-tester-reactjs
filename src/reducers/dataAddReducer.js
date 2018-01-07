import { DATA_ADDED } from "../actions/dataAdded";

export default function dataAddReducer(state=[], action) {
    switch (action.type) {
        case DATA_ADDED:
            const copy = state.concat(action.payload)
            return copy;
    
        default:
            break;
    }
    return state;
}