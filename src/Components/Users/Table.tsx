import { Button, Divider, Table } from "antd";
import Column from "antd/lib/table/Column";
import Loader from "react-loader-spinner";
import React, { useEffect, useState } from "react";

let style = {
  paddingBottom: "3.5vh",
};

export interface record {
  id: any;
  key: any;
  name: String;
  date: any;
  enrollments: any;
  gpa: any;
}

const UserTable = () => {
  const [selectedKeys, setSelectedKeys] = useState<any | []>([]);
  const [selected, setSelected] = useState(0);
  const [tableData, setTableData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = [];
    for (var i = 0; i < 46; i++) {
      data.push({
        key: i,
        id: i < 10 ? "18011000" + i : "1801100" + i,
        name: "Naruto Uzumaki " + i,
        date: "Nov 15, 2020",
        enrollments: Math.round(Math.random() * (8 - 1) + 1),
        gpa: (Math.random() * (4 - 2) + 2).toFixed(2),
      });
    }
    for (i = 100; i < 500; i++) {
      data.push({
        key: i,
        id: "180110" + i,
        name: "Naruto Uzumaki " + i,
        date: "Nov 15, 2020",
        enrollments: Math.round(Math.random() * (8 - 1) + 1),
        gpa: (Math.random() * (4 - 2) + 2).toFixed(2),
      });
    }
    setTableData(data);
  }, []);

  const selectRow = (record: record) => {
    const selectedRowKeys = [selectedKeys];
    if (selectedRowKeys.indexOf(record.key) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.key));
    } else selectedRowKeys.push(record.key);
    setSelectedKeys({ selectedRowKeys });
  };
  const onSelectedRowKeyChange = (selectedRowKeys: any[]) => {
    setSelectedKeys({ selectedRowKeys });
    setSelected(selectedRowKeys.length);
    console.log("selectedRowKeys changed: ", selectedRowKeys);
  };

  const { selectedRowKeys } = selectedKeys;
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeyChange,
  };

  const deleteRows = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      const selectedRowKeys = [selectedKeys];
      tableData.filter((el: record) => !selectedRowKeys.includes(el.key));
      selectedRowKeys.filter((el) => selectedRowKeys.includes(el));
      setSelectedKeys(selectedRowKeys);
      setSelected(0);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <div className="UserTable">
      <h1>Users</h1>
      <Divider style={{ margin: "2.5vh 0" }} />
      {loading ? (
        <Loader
          type="Bars"
          color="#00BFFF"
          height={50}
          width={50}
          timeout={3000}
        />
      ) : (
        <>
          <span
            style={{
              position: "absolute",
              transform: "translate(75%, 95%)",
            }}
          >
            Selected rows: {selected}
          </span>
          <Table
            rowSelection={rowSelection}
            pagination={{
              position: ["topRight", "topRight"],
              pageSize: 25,
            }}
            dataSource={tableData}
            style={style}
          >
            <Column
              title={<b>Full name</b>}
              dataIndex="name"
              fixed="left"
              width="25%"
              render={(text: any) => <a href="/#">{text}</a>}
            />
            <Column title={<b>ID</b>} dataIndex="id" fixed="left" width="20%" />
            <Column title={<b>Date created</b>} dataIndex="date" />
            <Column title={<b>Enrollments</b>} dataIndex="enrollments" />
            <Column title={<b>GPA</b>} dataIndex="gpa" />
            <Column
              title={
                <Button
                  disabled={selected === 0}
                  style={{ float: "right", marginRight: "1.25vw" }}
                  onClick={deleteRows}
                >
                  Delete ({selected})
                </Button>
              }
              dataIndex=""
              fixed="right"
            />
          </Table>
        </>
      )}
    </div>
  );
};

export default UserTable;
