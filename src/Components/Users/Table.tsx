import { Button, Table } from "antd";
import Column from "antd/lib/table/Column";
import Loader from "react-loader-spinner";
import React, { useEffect, useState } from "react";
import { getCategories, getRecordTable } from "../../Utils/dispatchedData";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../Modals/DeleteModal";
import {
  sortDate,
  sortEnrollments,
  sortGPA,
  sortKey,
} from "../../Services/sorters";

let style = {
  paddingBottom: "3.5vh",
};

export type RecordType = {
  id: any;
  key: number;
  name: string;
  date: string;
  enrollments: number;
  gpa: number;
  category: any;
};

export type CategoryType = {
  id: any;
  name: string;
};

export type stateType = {
  recordState: RecordType[],
  categoriesState: CategoryType[],
  // FIXME: Unblock on implemented input filter
  // filterState: string,
};

export type UserTablePropsType = {
  setUpdate: (value: boolean) => void;
};

const UserTable = ({ setUpdate }: UserTablePropsType) => {
  const { recordState, categories } = useSelector((state: stateType) => ({
    recordState: state.recordState,
    categories: state.categoriesState,
  }));
  const dispatch = useDispatch();
  //!!!!
  const categoriesList = getCategories(categories, dispatch);
  const recordTable = getRecordTable(recordState, dispatch); // FIXME: Add Filtering in function "filter: string"
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
  };

  const rowSelection = {
    selectedKeys,
    onChange: onSelectedRowKeyChange,
  };

  const deleteSelected = () => {
    setUpdate(false);
    const { selectedRowKeys } = selectedKeys;
    console.log(selectedRowKeys);
    setLoading(true);
    Promise.all(
      recordTable
        .filter((record) => selectedRowKeys.includes(record.id))
        .map((record) => {
          selectedRowKeys.splice(selectedRowKeys.indexOf(record.id));
          console.log("deleted");
          record.onDelete();
        })
    )
      .then(() => setSelectedKeys(selectedRowKeys))
      .then(() => setSelected(selectedRowKeys.length))
      .then(() => setLoading(false))
      .then(() => setUpdate(true));
  };
  const advisers = [];
  for (var i = 0; i < categoriesList.length; i++) {
    advisers.push({
      text: categoriesList[i].name,
      value: i,
    });
  }
  const enrollmentsFilters = [];
  for (i = 1; i < 9; i++) {
    enrollmentsFilters.push({ text: i, value: i });
  }

  return (
    <>
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
            pagination={{
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
            <Column
              title={<b>ID</b>}
              dataIndex="key"
              key="key"
              fixed="left"
              width="20%"
              defaultSortOrder="descend"
              sorter={
                //(a:any, b:any) => a.key - b.key
                sortKey
              }
            />
            <Column
              title={<b>Date created</b>}
              dataIndex="date"
              width="20%"
              sorter={sortDate}
            />
            <Column
              title={<b>Enrollments</b>}
              dataIndex="enrollments"
              sorter={sortEnrollments}
              filters={enrollmentsFilters}
              onFilter={(value, record) => record.enrollments === value}
            />
            <Column title={<b>GPA</b>} dataIndex="gpa" sorter={sortGPA} />
            <Column title={<b>Adviser</b>} dataIndex="category"
              render={(record) => record.category !== null ? 
                <a>{categoriesList[record].name}</a> : <a>N/A</a>
              }
              filters={advisers}
              onFilter={(value:any, record:any) =>  
                categoriesList[record.category].name === categoriesList[value].name
              }
            />
            <Column
              title={
                <Button
                  disabled={selected === 0}
                  style={{ float: "right", marginRight: "1.25vw" }}
                  onClick={deleteSelected}
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
    </>
  );
};

export default UserTable;
