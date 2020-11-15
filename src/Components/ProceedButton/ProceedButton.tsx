import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const style = {
  margin: "2.5vh 0",
  fontSize: "1.5rem",
  width: "10vw",
  height: "3%",
};

const ProceedButton = () => {
  return (
    <Link to="/users">
      <Button style={style} type="primary" className="purple-button">
        Click me
      </Button>
    </Link>
  );
};

export default ProceedButton;
