import { combineReducers } from "redux";

import dataAddReducer from "./dataAddReducer";
import seriesSelectionReducer from "./seriesSelectionReducer";
import testReducer from "./testReducer";
import writingReducer from "./writingReducer";

const reducer = combineReducers({
    data: dataAddReducer,
    selection: seriesSelectionReducer,
    test: testReducer,
    writing: writingReducer
});

export default reducer;