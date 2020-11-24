import { Dispatch } from "redux";
import {
  ADD_RECORD,
  CHANGE_RECORD,
  DELETE_RECORD,
  DELETE_SELECTED,
  FETCH_CATEGORIES,
  FETCH_RECORDS,
  SET_FILTER,
} from "./ActionType";
import {
  addRecordAPI,
  deleteSelectedAPI,
  fetchCategoriesAPI,
  fetchRecordsAPI,
} from "../../Services/api.service";
import { RecordType } from "../../Components/Users/Table";
import { toast } from "react-toastify";

export const deleteRecord = (id: number) => ({
  type: DELETE_RECORD,
  id,
});

export const deleteSelected = (ids: any[]) => (dispatch: Dispatch) => {
  console.log(ids);
  deleteSelectedAPI(ids)
    .then((record) => dispatch({type: DELETE_SELECTED, ids }))
    .then(() => toast.success("Changes successful!"))
    .catch((error) => toast.error(error));
};

export const fetchRecords = () => (dispatch: Dispatch) => {
  fetchRecordsAPI()
    .then((records) => dispatch({ type: FETCH_RECORDS, records }))
    .catch((error) => console.log(error));
};

export const addRecord = (record: RecordType) => (dispatch: Dispatch) => {
  addRecordAPI(record)
    .then((record) => dispatch({ type: ADD_RECORD, record }))
    .then(() => toast.success("User added!"))
    .catch((error) => toast.error(error));
};

export const changeRecord = (record: RecordType) => ({
  type: CHANGE_RECORD,
  record,
});

export const fetchCategories = () => (dispatch: Dispatch) => {
  fetchCategoriesAPI()
    .then((categories) => {
      dispatch({
        type: FETCH_CATEGORIES,
        categories,
      });
    })
    .catch((error) => console.log(error));
};

export const setFilter = (filter: string) => ({
  type: SET_FILTER,
  filter,
});
