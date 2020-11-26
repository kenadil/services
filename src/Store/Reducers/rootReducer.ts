import { combineReducers } from "redux";
import categoryReducer from "./categoriesReducer";
import filterReducer from "./filterReducer";
import logsReducer from "./logsReducer";
import recordReducer from "./recordReducer";

const rootReducer = combineReducers({
    recordState: recordReducer,
    categoriesState: categoryReducer,
    filterState: filterReducer,
    logsState: logsReducer,
});

export default rootReducer;