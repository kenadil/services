import { Table } from "antd";
import React from "react";
import UserTable from "../../Components/Users/Table";
import "./UsersPage.css";

const UsersPage = () => {
  return (
    <div style={{display: "flex", flexDirection: "row",}}>
      <div style={
        {
          minWidth: "20%",
        }
      }>
        I AM THE STORM THAT IS APPROACHING
      </div>
      <UserTable />
    </div>
  );
};

export default UsersPage;
