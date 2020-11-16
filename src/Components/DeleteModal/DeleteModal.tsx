import { Button, Modal } from "antd";
import React, { useState } from "react";

export type DeleteModalTypes = {
  text: string;
  title: string;
  buttonText: string;
  icon: undefined | React.ReactNode;
  onDelete: () => void;
};

const DeleteModal = ({
  title,
  text,
  onDelete,
  buttonText,
  icon,
}: DeleteModalTypes) => {
  const [state, setState] = useState({
    ModalText: text,
    visible: false,
    confirmLoading: false,
  });

  const showModal = () => {
    setState((prevState) => ({ ...prevState, visible: true }));
  };

  const handleOk = () => {
    setState((prevState) => ({
      ...prevState,
      ModalText: "Loading. Please, wait",
      confirmLoading: true,
    }));
    onDelete();
    setState((prevState) => ({
      ModalText: text,
      visible: false,
      confirmLoading: false,
    }));
  };

  const handleCancel = () => {
      setState((prevState) => ({
          ...prevState,
          visible: false,
      }))
  }

  return (
    <>
      <Button
        className="purple-button"
        style={{ float: "right", marginRight: "1.25vw" }}
        onClick={showModal}
        icon={icon}
      >
        {buttonText}
      </Button>
      <Modal
        title={title}
        visible={state.visible}
        onOk={() => handleOk()}
        confirmLoading={state.confirmLoading}
        onCancel={() => handleCancel()}
      >
          <p>{state.ModalText}</p>
      </Modal>
    </>
  );
};

export default DeleteModal;
