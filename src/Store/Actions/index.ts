import { Dispatch } from "redux";
import { ADD_RECORD, DELETE_RECORD, FETCH_CATEGORIES, FETCH_RECORDS } from "./ActionType";
import { addRecordAPI, fetchCategoriesAPI, fetchRecordsAPI } from "../../Services/api.service";
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
  addRecordAPI(record)
    .then((record) => dispatch({ type: ADD_RECORD, record }))
    .catch((error) => console.log(error));
};

export const fetchCategories = () => (dispatch: Dispatch) => {
  fetchCategoriesAPI()
    .then((categories) => {
      dispatch({
        type: FETCH_CATEGORIES,
        categories,
      });
    })
    .catch((error) => console.log(error));
}
