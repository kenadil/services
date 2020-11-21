import React, { useEffect, useState } from "react";
import UserTable from "../../Components/Users/Table";
import "./UsersPage.css";
import {useDispatch} from "react-redux";
import {store} from "../../Store/store";
import {isEqual} from "lodash";
import { addRecord, fetchCategories, fetchRecords } from "../../Store/Actions";
import AddModal from "../../Components/Modals/AddModal";
import { Divider } from "antd";
import SideComponent from "../../Components/SideComponent/SideComponent";

const UsersPage = () => {
  const [update, setUpdate] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchRecords());
    let state = store.getState();
    store.subscribe(() => {
      let newState = store.getState();
      if (!isEqual(state.categoriesState, newState.categoriesState)) {
        dispatch(fetchCategories());
      }
      if (!isEqual(state.recordState, newState.recordState) && update) {
        dispatch(fetchRecords());
      }
      state = newState;
    });
  }, [dispatch]);
  return (
    <>
      <SideComponent />
      <div className="UserTable" style={{ transform: "translateY(3%)", }}>
        <div style={{ display: "flex", flexDirection: "row", height: "5vh" }}>
          <h1 style={{ marginRight: "84.5%" }}>Users</h1>
            <AddModal 
              title={<h3>Add user</h3>}
              onSave={(record) => dispatch(addRecord(record))}
              icon={undefined}
              record={undefined}
            />
          </div>
        <Divider style={{ margin: "2.5vh 0" }} />
        <UserTable setUpdate={setUpdate} />
      </div>
    </>
  );
};

export default UsersPage;
