import { Button, Divider, Table } from "antd";
import React from "react";

let style = {
  paddingBottom: "3.5vh",
};

const columns: any = [
  {
    title: <b>Full name</b>,
    dataIndex: "name",
    fixed: "left",
    width: "25%",
    render: (text: String) => <a href="#">{text}</a>
  },
  {
    title: <b>ID</b>,
    dataIndex: "id",
    fixed: "left",
    width: "20%",
  },
  {
    title: <b>Date created</b>,
    dataIndex: "date",
  },
  {
    title: <b>Enrollments</b>,
    dataIndex: 'enrollments',
  },
  {
    title: <b>GPA</b>,
    dataIndex: 'gpa',
  },
  {
    title: 
      <Button style={{ float: "right", marginRight: "1.25vw" }}>
        Delete
      </Button>,
    dataIndex: '',
    fixed: "right",
  }
];

export interface record {
  id: any,
  key: any,
  name: String,
  date: any,
  enrollments: any,
  gpa: any,
}

let data: record[] = [];
for (var i = 0; i < 46; i++) {
  data.push({
    key: i,
    id: (i < 10) ? "18011000"+i : "1801100" + i,
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

class UserTable extends React.Component {
  state = {
    selectedRowKeys: [] as unknown as any,
  };
  selectRow = (record: record) => {
    const selectedRowKeys = [this.state.selectedRowKeys];
    if (selectedRowKeys.indexOf(record.key) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.key));
    }
    else
      selectedRowKeys.push(record.key);
    this.setState({ selectedRowKeys });
  }
  onSelectedRowKeyChange = (selectedRowKeys: any[]) => {
    this.setState({ selectedRowKeys });
    console.log('selectedRowKeys changed: ', selectedRowKeys);
  }
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeyChange,
    }
    return (
      <div className="UserTable">
        <h1>Users</h1>
        <Divider style={{ margin: "2.5vh 0" }} />
        <Table
          rowSelection={rowSelection}
          size="small"
          pagination={
            {
              position: ["topRight", "topRight"],
              pageSize: 25,
            }
          }
          columns={columns}
          dataSource={data}
          onRow={(record: any) => ({
            onClick: () => {
              this.selectRow(record);
            },
          })}
          style={style}
        />
      </div>
    );
  }
}

export default UserTable;
