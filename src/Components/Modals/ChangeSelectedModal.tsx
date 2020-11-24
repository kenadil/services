import { DiffOutlined, SnippetsOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import { Formik } from "formik";
import {
  ResetButton,
  SubmitButton,
  Form,
  Input,
  AutoComplete,
} from "formik-antd";
import { OptionsType } from "rc-select/lib/interface";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecordSchema, { ChangeCategorySchema } from "../../Services/validation";
import { changeSelected } from "../../Store/Actions";
import { RecordType, stateType } from "../Users/Table";

export type ChangeSelectedModalPropTypes = {
  title: any;
  selectedKeys: any | [];
  icon: undefined | React.ReactNode;
  selected: number;
  setSelectedKey: (value: any) => void;
  setSelected: (value: number) => void;
};

const ChangeSelectedModal = ({
  title,
  selectedKeys,
  icon,
  selected,
  setSelectedKey,
  setSelected,
}: ChangeSelectedModalPropTypes) => {
  const [state, setState] = useState({
    ModalText: title,
    visible: false,
    confirmLoading: false,
    nullification: false,
  });
  const advisers = ["N/A"];
  const advisersList = useSelector((state: stateType) => state.categoriesState);
  advisersList?.map((e) => advisers.push(e.name));
  const options: OptionsType | { value: string }[] | undefined = [];
  advisers.map((e) => options.push({ value: e }));
  const [isPurple1, setIsPurple1] = useState(false);
  const [isPurple2, setIsPurple2] = useState(false);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    setDisabled(selected === 0);
  }, [selected]);

  const [autoCompleteVal, setAutoCompleteVal] = useState("N/A");

  const showModal = (action: boolean) => {
    setState((prevState) => ({
      ...prevState,
      visible: true,
      nullification: action,
    }));
  };

  const handleOk = (values: any) => {
    setState((prevState) => ({
      ...prevState,
      ModalText: "Loading. Please, wait",
      confirmLoading: true,
    }));
    changeSelectedKeys(values);
    setState((prevState) => ({
      ModalText: "",
      visible: false,
      confirmLoading: false,
      nullification: false,
    }));
  };

  const handleCancel = () => {
    setState((prevState) => ({
      ...prevState,
      visible: false,
    }));
  };
  const dispatch = useDispatch();
  const changeSelectedKeys = (values: any) => {
    const { selectedRowKeys } = selectedKeys;
    dispatch(changeSelected(values, selectedRowKeys));
    selectedRowKeys.splice(0, selectedRowKeys.length);
    setSelectedKey(selectedRowKeys);
    setSelected(selectedRowKeys.length);
  };

  return (
    <>
      <div className="category-buttons">
        <Button
          disabled={disabled}
          onMouseOver={() => setIsPurple1(true)}
          onMouseOut={() => setIsPurple1(false)}
          onClick={() => showModal(true)}
          className={
            disabled
              ? "change-category-button"
              : "change-category-button purple-button"
          }
        >
          <DiffOutlined
            style={isPurple1 ? { color: "#3b2c85" } : { color: "white" }}
          />
        </Button>
        <Button
          disabled={disabled}
          onMouseOver={() => setIsPurple2(true)}
          onMouseOut={() => setIsPurple2(false)}
          onClick={() => showModal(false)}
          className={
            disabled
              ? "change-category-button"
              : "change-category-button purple-button"
          }
        >
          <SnippetsOutlined
            style={isPurple2 ? { color: "#3b2c85" } : { color: "white" }}
          />
        </Button>
      </div>
      <Modal
        title={title}
        visible={state.visible}
        confirmLoading={state.confirmLoading}
        onCancel={() => handleCancel()}
        footer={[<Button></Button>]}
      >
        {
          <Formik
            initialValues={{
              category: null,
            }}
            validationSchema={ChangeCategorySchema}
            onSubmit={(values, { resetForm }) => {
              values.category =
                autoCompleteVal === "N/A"
                  ? null
                  : advisersList.find((e) => e.name === autoCompleteVal)?.id;
              setAutoCompleteVal("N/A");
              handleOk(values);
              resetForm({});
            }}
          >
            {state.nullification ? 
            <div>
              <Button type="primary" style={{ marginRight: "1%" }}>
                Save
              </Button>
              <Button>Reset</Button>
            </div>
            :
            ({ errors, touched }) => (
              <Form>
                <Form.Item name="category">
                  <span style={{ marginLeft: "0.25vh" }}>Adviser</span>
                  <AutoComplete
                    name="category"
                    placeholder="N/A"
                    options={options}
                    showArrow={true}
                    value={autoCompleteVal === "N/A" ? "" : autoCompleteVal}
                    onChange={(e) => {
                      setAutoCompleteVal(e);
                    }}
                    filterOption={(inputValue, option) =>
                      option?.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                    allowClear
                  />
                </Form.Item>
                <div style={{ transform: "translate(72.5%)" }}>
                  <SubmitButton style={{ marginRight: "1%" }}>
                    Save
                  </SubmitButton>
                  <ResetButton>Reset</ResetButton>
                </div>
              </Form>
            )}
          </Formik>
        }
      </Modal>
    </>
  );
};

export default ChangeSelectedModal;
