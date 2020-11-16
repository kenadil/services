import { Dispatch } from "redux";
import { ADD_RECORD, DELETE_RECORD, FETCH_RECORDS } from "./ActionType";
import { fetchRecordsAPI } from "../../Services/api.service";
import { RecordType } from "../../Components/Users/Table";

export const deleteRecord = (id: number) => ({
  type: DELETE_RECORD,
  id,
});

export const fetchRecords = () => (dispatch: Dispatch) => {
  fetchRecordsAPI()
    .then((records) => dispatch({ type: FETCH_RECORDS, records }))
    .catch((error) => console.log(error));
};

export const addRecord = (record: RecordType) => (dispatch: Dispatch) => {
    dispatch({ type: ADD_RECORD, record });
}