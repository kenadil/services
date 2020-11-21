import { Collapse, Divider } from "antd";
import React from "react";
import {
  SettingOutlined,
  EditOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Panel } = Collapse;
const iconStyle = {
  fontSize: "1.1rem",
  marginRight: "5px",
};

const SideComponent = () => {
  const labels = [
    {
      label: "SUPPORT YOUR STUDENTS",
      icon: <UsergroupDeleteOutlined style={iconStyle} />,
      divided: true,
      options: [
        {
          label: "Users",
          link: "users",
        },
        {
          label: "Groups",
          link: "teacher",
        },
        {
          label: "Progress",
          link: "",
        },
      ],
    },
    {
      label: "SETTINGS",
      icon: <SettingOutlined style={iconStyle} />,
      divided: false,
    },
  ];
  return (
    <div
      style={{
        minWidth: "15%",
      }}
      className="side-component"
    >
      {labels.map((e, index) => (
        <>
          <Collapse
            ghost
            style={{ marginTop: "1.5vh" }}
            defaultActiveKey={["0"]}
            expandIcon={({ isActive }) => e.icon}
          >
            <Panel header={e.label} key={index}>
              <ul className="option-content">
                {e.options?.map((e) => (
                  <li>
                    <Link to={`/${e.link}`}>
                      <a>{e.label}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>
          </Collapse>
          { e.divided ?
            <div style={{
              width: "90%",
              margin: "0 auto",
            }}>
              <Divider style={{ border: "1px solid white", }} /> 
            </div>
             : null
          }
        </>
      ))}
    </div>
  );
};

export default SideComponent;
