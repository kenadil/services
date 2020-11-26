import { Collapse, Divider } from "antd";
import React from "react";
import {
  ExportOutlined,
  FrownOutlined,
  HomeFilled,
  PieChartOutlined,
  SettingOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

const { Panel } = Collapse;
const iconStyle = {
  fontSize: "1.1rem",
  marginRight: "5px",
};

const supportStudents = (
  <p style={{ color: "white", marginLeft: "0.5vw", marginBottom: "0" }}>
    SUPPORT YOUR STUDENTS
  </p>
);

const pfp =
  "https://gamespot1.cbsistatic.com/uploads/scale_landscape/1352/13527689/2744541-gg_xrd_sign_ramlethal_v_ky_ps4_112514.jpg";
const SideComponent = () => {
  const labels = [
    {
      label: "HOMEPAGE",
      icon: <HomeFilled style={iconStyle} />,
      divided: false,
      link: "",
    },
    {
      label: "ADVANCED REPORTING",
      icon: <PieChartOutlined style={iconStyle} />,
      divided: false,
      link: "services"
    },
    {
      label: supportStudents,
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
      divided: true,
    },
    {
      label: "MY ACCOUNT",
      icon: <FrownOutlined style={iconStyle} />,
      divided: false,
    },
    {
      label: "LOG OUT",
      icon: <ExportOutlined style={iconStyle} />,
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
      <Link to="/">
        <Header width={"100%"}>
          <span>Analytics</span>
        </Header>
      </Link>
      {labels.map((e, index) => (
        <>
          {e.label !== supportStudents ? (
            <div className="side-panel">
              <div className="side-panel-item">
                {e.icon}
                <a
                  style={{
                    marginLeft: "0.5vw",
                    transform: "translateY(-5%)",
                    color: e.label === "LOG OUT" ? "red" : "white",
                  }}
                >
                <Link to={`/${e.link}`}>
                  <div>
                   {e.label}
                  </div>
                </Link>
                </a>
              </div>
            </div>
          ) : (
            <Collapse
              ghost
              style={{ marginTop: "1.5vh" }}
              defaultActiveKey={["2"]}
              expandIcon={({ isActive }) =>
                e.label === "SETTINGS" ? (
                  <SettingOutlined
                    style={iconStyle}
                    rotate={isActive ? 90 : 0}
                  />
                ) : (
                  e.icon
                )
              }
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
          )}
          {e.divided ? (
            <div
              style={{
                width: "90%",
                margin: "0 auto",
              }}
            >
              <Divider
                style={{
                  border: "0.1em solid rgba(245, 245, 245, 0.3)",
                  margin: "2.5vh 0 1.5vh 0",
                }}
              />
            </div>
          ) : null}
        </>
      ))}
    </div>
  );
};

export default SideComponent;
