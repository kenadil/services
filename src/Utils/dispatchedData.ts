import { Dispatch } from "redux";
import { RecordType } from "../Components/Users/Table";
import { deleteRecordAPI } from "../Services/api.service";
import { deleteRecord, } from "../Store/Actions";

export const getRecordTable = (records: RecordType[], dispatch: Dispatch) => {
    return records
        .map((record: any) => ({
            ...record,
        onDelete: () => {
            deleteRecordAPI(record.id)
                .then(() => dispatch(deleteRecord(record.id)))
                .catch((error) => console.log(error));
        },
        // FIXME: add onChange: () => dispatch(changeRecord(newRecord));
    }));
}