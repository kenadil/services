import { SET_FILTER } from "../Actions/ActionType";

const filterReducer = (state: string = "", action: any) => {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default filterReducer;