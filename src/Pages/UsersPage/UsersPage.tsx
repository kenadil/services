import React, { useEffect } from "react";
import UserTable from "../../Components/Users/Table";
import "./UsersPage.css";
import { useDispatch, } from "react-redux";
import { store } from "../../Store/store";
import { isEqual } from "lodash";
import {
  addRecord,
  fetchCategories,
  fetchRecords,
  setFilter,
} from "../../Store/Actions";
import AddModal from "../../Components/Modals/AddModal";
import { Divider, Input } from "antd";
import SideComponent from "../../Components/SideComponent/SideComponent";
import { SearchOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";

const UsersPage = () => {
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
      if (!isEqual(state.recordState, newState.recordState)) {
        dispatch(fetchRecords());
      }
      state = newState;
    });
  }, [dispatch]);
  return (
    <>
      <SideComponent />
      <div className="pageContent" style={{ paddingTop: "1%" }}>
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
        <Input
            className="search-field"
            prefix={<SearchOutlined className="site-form-item-icon" />}
            placeholder="Search by name or ID"
            onChange={(e) => dispatch(setFilter(e.target.value))}
            style={{
              marginBottom: "2vh",
            }}
            allowClear
          />
        <UserTable />
        <ToastContainer />
      </div>
    </>
  );
};

export default UsersPage;
