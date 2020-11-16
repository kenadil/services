import { Button, Divider, Table } from "antd";
import Column from "antd/lib/table/Column";
import Loader from "react-loader-spinner";
import React, { useState } from "react";
import { getRecordTable } from "../../Utils/dispatchedData";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../DeleteModal/DeleteModal";

let style = {
  paddingBottom: "3.5vh",
};

export type RecordType = {
  id: number,
  key: number,
  name: string,
  date: string,
  enrollments: number,
  gpa: number,
}

export type stateType = {
  recordState: RecordType[],
  // FIXME: Unblock on implemented input filter
  // filterState: string, 
};

const UserTable = () => {
  const { recordState } = useSelector((state: stateType) => ({
    recordState: state.recordState,
  }));
  const dispatch = useDispatch();
  //!!!!
  const recordTable = getRecordTable(recordState, dispatch);  // FIXME: Add Filtering in function "filter: string"
  const [selectedKeys, setSelectedKeys] = useState<any | []>([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);

  const selectRow = (record: RecordType) => {
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
            rowSelection={recordTable.length > 0 ? rowSelection : undefined}
            pagination={
            {
              position: ["topRight", "topRight"],
              pageSize: 25,
            }}
            dataSource={recordTable}
            style={style}
          >
            <Column
              title={<b>Full name</b>}
              dataIndex="name"
              fixed="left"
              width="25%"
              render={(text: any) => <a href="/#">{text}</a>}
            />
            <Column title={<b>ID</b>} dataIndex="id" key="id" fixed="left" width="20%" />
            <Column title={<b>Date created</b>} dataIndex="date" />
            <Column title={<b>Enrollments</b>} dataIndex="enrollments" />
            <Column title={<b>GPA</b>} dataIndex="gpa" />
            <Column
              title={
                <Button
                  disabled={selected === 0}
                  style={{ float: "right", marginRight: "1.25vw" }}
                >
                  Delete ({selected})
                </Button>
              }
              render={(record) => (
                <>
                  <DeleteModal
                    title=""
                    text={`Delete record ${record.id}?`}
                    onDelete={record.onDelete}
                    buttonText="Delete"
                    icon={undefined}
                  />
                </>
              )}
              fixed="right"
            />
          </Table>
        </>
      )}
    </div>
  );
};

export default UserTable;
