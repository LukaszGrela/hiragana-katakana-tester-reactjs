import { SELECTION_CHANGED } from "../actions/selectionChanged";



export default function seriesSelectionReducer(state = [], action) {
    switch (action.type) {
        case SELECTION_CHANGED:
            return action.payload.concat();
    
        default:
            break;
    }
    return state;
}