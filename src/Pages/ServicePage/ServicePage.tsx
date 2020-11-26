import { SearchOutlined } from "@ant-design/icons";
import { Divider, Input } from "antd";
import React from "react";
import ServiceLayout from "../../Components/ServiceLayout/ServiceLayout";
import SideComponent from "../../Components/SideComponent/SideComponent";

const ServicePage = () => {
  return (
    <>
      <SideComponent />
      <div className="pageContent" style={{ paddingTop: "1%" }}>
        <div style={{ display: "flex", flexDirection: "row", height: "5vh" }}>
          <h1 style={{ marginRight: "5%", width: "100%", }}>Advance Reporting</h1>
        </div>
        <Divider style={{ margin: "2.5vh 0" }} />
        <Input
            className="search-field"
            prefix={<SearchOutlined className="site-form-item-icon" />}
            placeholder="Search by name or ID"
            style={{
              marginBottom: "2vh",
            }}
            allowClear
        />
        <ServiceLayout />
      </div>
    </>
  );
};

export default ServicePage;