import { CategoryType } from "../../Components/Users/Table";
import { FETCH_CATEGORIES } from "../Actions/ActionType";

const categoryReducer = (state: CategoryType[] = [], action: any) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
};

export default categoryReducer;
