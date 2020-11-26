import { LogsType } from "../../Components/Users/Table";
import { FETCH_LOGS } from "../Actions/ActionType";

const logsReducer = (state: LogsType[] = [], action: any) => {
  switch (action.type) {
    case FETCH_LOGS:
      return action.logs;
    default:
      return state;
  }
};

export default logsReducer;
