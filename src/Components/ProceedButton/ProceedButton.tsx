import { Button } from "antd";
import React from "react";
import "./ProceedButton.css";

const style = {
    margin: '2.5vh 0',
    background: '#3b2c85',
    border: "none",
}

const ProceedButton = () => {
    return (
        <Button 
            style={style}
            type="primary"
            className="purple-button"
        >
            Click me
        </Button>
    )
}

export default ProceedButton;