import { combineReducers } from "redux";

import dataAddReducer from "./dataAddReducer";

const reducer = combineReducers({
    data: dataAddReducer
});

export default reducer;