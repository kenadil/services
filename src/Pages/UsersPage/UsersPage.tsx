import React, { useEffect, useState } from "react";
import UserTable from "../../Components/Users/Table";
import "./UsersPage.css";
import {useDispatch} from "react-redux";
import {store} from "../../Store/store";
import {isEqual} from "lodash";
import { addRecord, fetchRecords } from "../../Store/Actions";
import AddModal from "../../Components/Modals/AddModal";
import { Divider } from "antd";

const UsersPage = () => {
  const [update, setUpdate] = useState(true);
  const [lastId, setLastId] = useState(0);
  const dispatch = useDispatch();
  let state = store.getState();
  useEffect(() => {
    dispatch(fetchRecords());
    setLastId(state.recordState[state.recordState.length - 1]);
    store.subscribe(() => {
      let newState = store.getState();
      if (!isEqual(state.recordState, newState.recordState) && update) {
        dispatch(fetchRecords());
        setLastId(newState.recordState[newState.recordState.length - 1].id);
        state = newState;
      }
    });
  }, [dispatch]);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          minWidth: "20%",
        }}
      >
      </div>
      <div className="UserTable">
        <div style={{ display: "flex", flexDirection: "row", height: "5vh" }}>
          <h1 style={{ marginRight: "82%" }}>Users</h1>
            <AddModal 
              title={<h3>Add user</h3>}
              onSave={(record) => dispatch(addRecord(record))}
              icon={undefined}
              record={undefined}
              lastId={lastId}
            />
          </div>
        <Divider style={{ margin: "2.5vh 0" }} />
        <UserTable setUpdate={setUpdate} />
      </div>
    </div>
  );
};

export default UsersPage;
