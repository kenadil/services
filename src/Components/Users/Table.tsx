import { Button, Dropdown, Menu, Table } from "antd";
import Column from "antd/lib/table/Column";
import Loader from "react-loader-spinner";
import React, { useState } from "react";
import { getCategories, getRecordTable } from "../../Utils/dispatchedData";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../Modals/DeleteModal";
import {
  sortDate,
  sortEnrollments,
  sortGPA,
  sortKey,
} from "../../Services/sorters";
import AddModal from "../Modals/AddModal";
import { deleteSelected } from "../../Store/Actions";

let style = {
  paddingBottom: "3.5vh",
};

export type RecordType = {
  id: string;
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
  recordState: RecordType[];
  categoriesState: CategoryType[];
  // FIXME: Unblock on implemented input filter
  filterState: string;
};


const UserTable = () => {
  const { recordState, filterState, categories } = useSelector((state: stateType) => ({
    recordState: state.recordState,
    filterState: state.filterState,
    categories: state.categoriesState,
  }));
  const dispatch = useDispatch();
  //!!!!
  const categoriesList = getCategories(categories, dispatch);
  const teacherList = [{ text: "N/A", value: 0, }];
 categoriesList?.map((e) => teacherList.push( { text: e.name, value: e.id, } ));
  const recordTable = getRecordTable(recordState, filterState, categories, dispatch); // FIXME: Add Filtering in function "filter: string"
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

  const deleteSelectedRows = () => {
    const { selectedRowKeys } = selectedKeys;
    console.log(selectedRowKeys);
    dispatch(deleteSelected(selectedRowKeys));
    recordTable
        .filter((record) => selectedRowKeys.includes(record.id))
        .map((record) => {
          selectedRowKeys.splice(selectedRowKeys.indexOf(record.id));
        });
    setSelectedKeys({ selectedRowKeys });
    setSelected(selectedRowKeys.length);
    setLoading(false);
  };
  const enrollmentsFilters = [];
  for (var i = 1; i < 9; i++) {
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
          <span className="selected-span"style={{fontSize: "1rem"}}>
            Rows selected: {selected}
          </span>
          <Table
            rowSelection={recordTable.length > 0 ? rowSelection : undefined}
            pagination={{
              position: ["topRight", "topRight"],
              pageSize: 25,
            }}
            dataSource={recordTable}
            style={style}
            scroll={{ x: 1500, y: "60vh" }}
          >
            <Column
              title={<b>Full name</b>}
              dataIndex="name"
              fixed="left"
              render={(text: any) => <a href="/#">{text}</a>}
            />
            <Column
              title={<b>ID</b>}
              dataIndex="key"
              key="key"
              defaultSortOrder="descend"
              sorter={
                //(a:any, b:any) => a.key - b.key
                sortKey
              }
            />
            <Column
              title={<b>Date created</b>}
              dataIndex="date"
              sorter={sortDate}
            />
            <Column
              title={<b>Enrollments</b>}
              dataIndex="enrollments"
              sorter={sortEnrollments}
              filters={enrollmentsFilters}
              onFilter={(value, record) => record.enrollments === value}
            />
            <Column 
              title={<b>GPA</b>}
              dataIndex="gpa"
              sorter={sortGPA}
              render={(text, record) => text = Math.round((record.gpa + Number.EPSILON) * 100) / 100}
            />
            <Column
              title={<b>Adviser</b>}
              dataIndex="category"
              filters={teacherList}
              render={(text, record) =>
                text = record.category ? teacherList[record.category].text :
                  "N/A"
              }
              onFilter={(value: any, record: any) =>
                teacherList[record.category ? record.category : 0].text ===
                teacherList[value].text
              }
            />
            <Column
              width="8.5%"
              title={
                <Button
                  disabled={selected === 0}
                  onClick={deleteSelectedRows}
                >
                  Delete ({selected})
                </Button>
              }
              render={(record) => (
                <>
                  <Dropdown.Button
                    overlay={
                      <Menu>
                        <Menu.Item key="1">
                          <AddModal
                            title="Change record"
                            onSave={record.onChange}
                            icon={undefined}
                            record={record}
                          />
                        </Menu.Item>
                        <Menu.Item key="2">
                          <DeleteModal
                            title=""
                            text={`Delete record ${record.id}?`}
                            onDelete={record.onDelete}
                            buttonText="Delete"
                            icon={undefined}
                          />
                        </Menu.Item>
                      </Menu>
                    }
                  ></Dropdown.Button>
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
