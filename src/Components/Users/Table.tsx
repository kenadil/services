import { Divider, Table } from "antd";
import React from "react";

const columns: any = [
  {
    title: <b>ID</b>,
    dataIndex: "id",
    fixed: "left",
    render: (text: String) => <b>{text}</b>,
    width: "20%",
  },
  {
    title: <b>Full name</b>,
    dataIndex: "name",
    fixed: "left",
  },
  {
    title: <b>Date created</b>,
    dataIndex: "date",
  },
];

interface record {
  id: any,
  key: any,
  name: String,
  date: any,
}

let data: record[] = [];
for (var i = 0; i < 46; i++) {
  data.push({
    key: i,
    id: (i < 10) ? "18011000"+i : "1801100" + i,
    name: "John Brawo " + i,
    date: "15.11.2020",
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
        <h2>Users</h2>
        <Divider style={{ margin: "2.5vh 0" }} />
        <Table
          rowSelection={rowSelection}
          size="small"
          pagination={
            {
              position: ["topRight", "topRight"],
            }
          }
          columns={columns}
          dataSource={data}
          onRow={(record: any) => ({
            onClick: () => {
              this.selectRow(record);
            },
          })}
        />
      </div>
    );
  }
}

export default UserTable;
