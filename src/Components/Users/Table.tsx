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
import DeleteSelectedModal from "../Modals/DeleteSelectedModal";
import ChangeSelectedModal from "../Modals/ChangeSelectedModal";

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
    const {selectedRowKeys} = selectedKeys;
    dispatch(deleteSelected(selectedRowKeys));
    selectedRowKeys
        .splice(0, selectedRowKeys.length);
    setSelectedKeys({ selectedRowKeys });
    setSelected(selectedRowKeys.length);
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
        <div className="multibox">
        {
          recordTable.length > 0 ? 
          <span className="selected-span"style={{fontSize: "1rem"}}>
            Rows selected: {selected}
          </span>
          :
          null
        }
          <ChangeSelectedModal 
            title="Change adviser"
            selectedKeys={selectedKeys}
            icon={undefined}
            selected={selected}
            setSelectedKey={setSelectedKeys}
            setSelected={setSelected}
          />
        </div>
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
              width={"12.5%"}
              render={(text: any) => <a href="/#">{text}</a>}
            />
            <Column
              title={<b>ID</b>}
              width={"10%"}
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
              width={"15%"}
              sorter={sortDate}
            />
            <Column
              title={<b>Enrollments</b>}
              width={"10%"}
              dataIndex="enrollments"
              sorter={sortEnrollments}
              filters={enrollmentsFilters}
              onFilter={(value, record) => record.enrollments === value}
            />
            <Column 
              title={<b>GPA</b>}
              width={"10%"}
              dataIndex="gpa"
              sorter={sortGPA}
              render={(text, record) => text = Math.round((record.gpa + Number.EPSILON) * 100) / 100}
            />
            <Column
              title={<b>Adviser</b>}
              dataIndex="category"
              width={"7.5%"}
              filters={teacherList}
              render={(text, record) => {
                text = record.category ? teacherList[record.category].text :
                  "N/A";
                return <a>{text}</a>
              }}
              onFilter={(value: any, record: any) =>
                teacherList[record.category ? record.category : 0].text ===
                teacherList[value].text
              }
            />
            <Column
              width="8.5%"
              title={
                <DeleteSelectedModal
                  title=""
                  text={""}
                  selected={selected}
                  onOk={deleteSelectedRows}
                  icon={undefined}
                  buttonText="delete"
                />
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
