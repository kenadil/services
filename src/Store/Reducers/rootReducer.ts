import { combineReducers } from "redux";
import recordReducer from "./recordReducer";

const rootReducer = combineReducers({
    recordState: recordReducer,
});

export default rootReducer;