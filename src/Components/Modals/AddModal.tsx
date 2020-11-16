import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import { Formik } from "formik";
import { ResetButton, SubmitButton, Form, Input } from "formik-antd";
import React, { useState } from "react";
import RecordSchema from "../../Services/validation";
import { RecordType } from "../Users/Table";

export type AddModalPropTypes = {
  title: any;
  onSave: (values: RecordType) => void;
  record: undefined | RecordType;
  icon: undefined | React.ReactNode;
  lastId: any;
};

const AddModal = ({
  title,
  onSave,
  icon,
  record,
  lastId,
}: AddModalPropTypes) => {
  const [state, setState] = useState({
    ModalText: "",
    visible: false,
    confirmLoading: false,
  });

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
                  id: parseInt(lastId) + 1,
                  key: parseInt(lastId) + 1,
                  name: undefined,
                  date: monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear(),
                  enrollments: undefined,
                  gpa: undefined,
                }
          }
          validationSchema={RecordSchema}
          onSubmit={(values, {resetForm}) => {
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
                  value={parseInt(lastId) + 1}
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
