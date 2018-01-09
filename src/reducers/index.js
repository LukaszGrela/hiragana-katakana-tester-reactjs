import { combineReducers } from "redux";

import dataAddReducer from "./dataAddReducer";
import seriesSelectionReducer from "./seriesSelectionReducer";
import syllabaryReducer from "./syllabaryReducer";
import writingReducer from "./writingReducer";

const reducer = combineReducers({
    data: dataAddReducer,
    selection: seriesSelectionReducer,
    syllabary: syllabaryReducer,
    writing: writingReducer
});

export default reducer;