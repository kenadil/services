import { RecordType } from "../../Components/Users/Table";
import {
  ADD_RECORD,
  CHANGE_RECORD,
  CHANGE_SELECTED,
  DELETE_RECORD,
  DELETE_SELECTED,
  FETCH_RECORDS,
} from "../Actions/ActionType";

const recordReducer = (state: RecordType[] = [], action: any) => {
  switch (action.type) {
    case ADD_RECORD:
      return [...state, action.record];
    case CHANGE_RECORD:
      return state.map((record: RecordType) =>  action.record);
    case DELETE_RECORD:
      return state.filter((record: RecordType) => record.id !== action.id);
    case FETCH_RECORDS:
      return action.records;
    case DELETE_SELECTED:
      return state.filter((record: RecordType) => action.ids.indexOf(record.id) > -1);
    case CHANGE_SELECTED:
      return state.map((record: RecordType) => action.record);
    default:
      return state;
  }
};

export default recordReducer;
