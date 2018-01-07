import { createStore,applyMiddleware } from "redux";
import reducer from '../reducers'
import { logger } from "redux-logger";

const middleware = applyMiddleware(logger);

const hkTesterStore = createStore(reducer, middleware);

export default hkTesterStore;