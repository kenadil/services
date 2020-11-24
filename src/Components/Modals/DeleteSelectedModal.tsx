import { Button, Modal } from "antd";
import React, { useState } from "react";

export type DeleteSelectedModalTypes = {
  text: string;
  title: string;
  buttonText: string;
  icon: undefined | React.ReactNode;
  selected: number;
  onOk: () => void;
};

const DeleteSelectedModal = ({
  title,
  text,
  buttonText,
  icon,
  selected,
  onOk,
}: DeleteSelectedModalTypes) => {
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
    onOk();
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
    }));
  };

  return (
    <>
      <Button disabled={selected === 0} onClick={showModal}>
        Delete ({selected})
      </Button>
      <Modal
        title={title}
        visible={state.visible}
        onOk={() => handleOk()}
        confirmLoading={state.confirmLoading}
        onCancel={() => handleCancel()}
      >
        <p>{`Delete ${selected} items?`}</p>
      </Modal>
    </>
  );
};

export default DeleteSelectedModal;
