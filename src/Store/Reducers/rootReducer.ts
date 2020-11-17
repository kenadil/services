import { combineReducers } from "redux";
import categoryReducer from "./categoriesReducer";
import recordReducer from "./recordReducer";

const rootReducer = combineReducers({
    recordState: recordReducer,
    categoriesState: categoryReducer,
});

export default rootReducer;