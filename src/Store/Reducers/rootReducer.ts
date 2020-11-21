import { combineReducers } from "redux";
import categoryReducer from "./categoriesReducer";
import filterReducer from "./filterReducer";
import recordReducer from "./recordReducer";

const rootReducer = combineReducers({
    recordState: recordReducer,
    categoriesState: categoryReducer,
    filterState: filterReducer,
});

export default rootReducer;