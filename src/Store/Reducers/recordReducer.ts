import { RecordType } from "../../Components/Users/Table";
import {
  ADD_RECORD,
  DELETE_RECORD,
  FETCH_RECORDS,
} from "../Actions/ActionType";

const recordReducer = (state: RecordType[] = [], action: any) => {
  switch (action.type) {
    case ADD_RECORD:
      return [...state, action.record];
    case DELETE_RECORD:
      return state.filter((record: RecordType) => record.id !== action.id);
    case FETCH_RECORDS:
      return action.records;
    default:
      return state;
  }
};

export default recordReducer;
