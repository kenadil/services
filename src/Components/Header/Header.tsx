import React from "react";
import "./Header.css";

const Header = (props: any) => {
  return <div className="Header" style={{width: props.width}}>{props.children}</div>;
};

export default Header;
