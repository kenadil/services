import { AutoComplete, Select } from "antd";
import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import "./ServiceChart.css";

const { Option } = Select;

const ServiceChart = (props: any) => {
  const charts = [
    {
      name: "Bar",
      element: <Bar data={props.data} width={100} height={45} />,
    },
    {
      name: "Doughnut",
      element: <Doughnut data={props.data} width={100} height={45} />,
    },
  ];
  const [bar, setBar] = useState(true);
  const changeBar = (value: any) => {
    setBar(value === "Bar");
  };
  return (
    <>
      <div className="page-optioning">
        <Select
          style={{ width: "10vw" }}
          defaultValue={charts[0].name}
          onChange={changeBar}
          className="select-bar"
        >
          {charts.map((e) => (
            <Option value={e.name}>{e.name}</Option>
          ))}
        </Select>
        <AutoComplete
          className="advisers-select"
          placeholder="All"
          dataSource={props.advisers}
          style={
            props.contracted
              ? { width: "15vw", marginRight: "1.5%" }
              : { width: "15vw" }
          }
        />
      </div>
      <div className="bar-content">
        {bar ? (
          <Bar data={props.data[0]} width={100} height={45} />
        ) : (
          <Doughnut data={props.data[1]} width={100} height={45} />
        )}
      </div>
    </>
  );
};

export default ServiceChart;
