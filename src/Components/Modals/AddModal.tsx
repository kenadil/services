import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import { Formik } from "formik";
import { ResetButton, SubmitButton, Form, Input, AutoComplete } from "formik-antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RecordSchema from "../../Services/validation";
import { CategoryType, RecordType, stateType } from "../Users/Table";

export type AddModalPropTypes = {
  title: any;
  onSave: (values: RecordType) => void;
  record: undefined | RecordType;
  icon: undefined | React.ReactNode;
};

const AddModal = ({
  title,
  onSave,
  icon,
  record,
}: AddModalPropTypes) => {
  const [state, setState] = useState({
    ModalText: "",
    visible: false,
    confirmLoading: false,
  });

  const advisers= useSelector((state: stateType) => state.categoriesState).map(
    (category: CategoryType) => category.name
  );
  const records = useSelector((state: stateType) => state.recordState);
  const [lastId, setLastId] = useState(0);
  useEffect(() => {
    setLastId(records[records.length - 1] === undefined ? 0 : records[records.length - 1].id);
  }, [records]);

  const showModal = () => {
    setState((prevState) => ({ ...prevState, visible: true }));
  };

  const handleOk = (values: any) => {
    setState((prevState) => ({
      ...prevState,
      ModalText: "Loading. Please, wait",
      confirmLoading: true,
    }));
    onSave(values);
    setState((prevState) => ({
      ModalText: "",
      visible: false,
      confirmLoading: false,
    }));
  };

  const handleCancel = () => {
    setState((prevState) => ({
      ...prevState,
      visible: false,
    }));
  };

  const d = new Date();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <>
      <Button
        style={{ float: "right", transform: "translate(0%, 25%)" }}
        onClick={() => showModal()}
        className="purple-button"
      >
        Add User
      </Button>
      <Modal
        title={title}
        visible={state.visible}
        confirmLoading={state.confirmLoading}
        onCancel={() => handleCancel()}
        footer={[<Button></Button>]}
      >
        <Formik
          initialValues={
            record
              ? record
              : {
                  id: undefined,
                  key: undefined,
                  name: undefined,
                  date:
                    monthNames[d.getMonth()] +
                    " " +
                    d.getDate() +
                    ", " +
                    d.getFullYear(),
                  enrollments: undefined,
                  gpa: undefined,
                  category: "N/A",
                }
          }
          validationSchema={RecordSchema}
          onSubmit={(values, { resetForm }) => {
            values.key = lastId + 1;
            values.id = lastId + 1;
            values.category = advisers.indexOf(values.category);
            console.log(JSON.stringify(values));
            handleOk(values);
            resetForm({});
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Form.Item name="name">
                <span style={{ marginLeft: "0.25vh" }}>Full name</span>
                <Input
                  style={{ marginTop: "1vh" }}
                  name="name"
                  placeholder="Full name"
                />
              </Form.Item>
              <Form.Item name="key">
                <span style={{ marginLeft: "0.25vh" }}>ID</span>
                <Input
                  disabled
                  style={{ marginTop: "1vh" }}
                  name="key"
                  placeholder="ID"
                  value={lastId === undefined ? 0 : lastId + 1}
                />
              </Form.Item>
              <Form.Item name="enrollments">
                <span style={{ marginLeft: "0.25vh" }}>Enrollments</span>
                <Input
                  style={{ marginTop: "1vh" }}
                  name="enrollments"
                  placeholder="Enrollments"
                />
              </Form.Item>
              <Form.Item name="gpa">
                <span style={{ marginLeft: "0.25vh" }}>GPA</span>
                <Input
                  style={{ marginTop: "1vh" }}
                  name="gpa"
                  placeholder="GPA"
                />
              </Form.Item>
              <Form.Item name="category">
                <span style={{ marginLeft: "0.25vh" }}>Adviser</span>
                <AutoComplete
                  name="category"
                  placeholder="Adviser"
                  dataSource={advisers}
                  showArrow={true}
                  defaultValue={"N/A"}
                />
              </Form.Item>
              <div style={{ transform: "translate(72.5%)" }}>
                <SubmitButton style={{ marginRight: "1%" }}>Save</SubmitButton>
                <ResetButton>Reset</ResetButton>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default AddModal;
