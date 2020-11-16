import React, { useEffect, useState } from "react";
import UserTable from "../../Components/Users/Table";
import "./UsersPage.css";
import {useDispatch} from "react-redux";
import {store} from "../../Store/store";
import {isEqual} from "lodash";
import { fetchRecords } from "../../Store/Actions";

const UsersPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecords());
    let state = store.getState();
    store.subscribe(() => {
      let newState = store.getState();
      console.log(isEqual(state.recordState, newState.recordState));
      if (!isEqual(state.recordState, newState.recordState)) {
        dispatch(fetchRecords());
      }
      state = newState;
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
      <UserTable />
    </div>
  );
};

export default UsersPage;
