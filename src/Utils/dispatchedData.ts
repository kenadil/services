import { debug } from "console";
import { Dispatch } from "redux";
import { CategoryType, RecordType } from "../Components/Users/Table";
import { changeRecordAPI, deleteRecordAPI } from "../Services/api.service";
import { changeRecord, deleteRecord } from "../Store/Actions";

export const getRecordTable = (
    records: RecordType[],
    filter: string,
    categories: CategoryType[],
    dispatch: Dispatch,
  ) => {
  const names = categories.map((e) => e.name);
  filter = filter.toLowerCase();
  return records
    .filter(
      (record: RecordType) => filter === "" 
        ||  record.name.toLowerCase().includes(filter)
        ||  record.key.toString().toLowerCase().includes(filter)
        ||  record.category === names.indexOf(filter)
    )
    .map((record: any) => ({
    ...record,
    onDelete: () => {
      deleteRecordAPI(record.id)
        .then(() => dispatch(deleteRecord(record.id)))
        .catch((error) => console.log(error));
    },
    onChange: (newRecord: RecordType) => {
      changeRecordAPI(newRecord)
        .then((result: RecordType) => {
          dispatch(changeRecord(result));
        })
        .catch((error) => console.log(error));
    },
    // FIXME: add onChange: () => dispatch(changeRecord(newRecord));
  }));
};

export const getCategories = (
  categories: CategoryType[],
  dispatch: Dispatch
) => {
  return categories.map((category: CategoryType) => ({
    ...category,
  }));
};
