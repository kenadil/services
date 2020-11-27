import { Select } from "antd";
import React, { useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

const { Option } = Select;

const ServiceChart = (props: any) => {
  const charts = [
    {
      name: "Bar",
      key: 0,
      element: <Bar data={props.data[0]} width={100} height={45} />,
    },
    {
      name: "Line",
      key: 1,
      element: <Line data={props.data[1]} width={100} height={45} />,
    },
    {
      name: "Doughnut",
      key: 2,
      element: <Doughnut data={props.data[2]} width={100} height={45} />,
    },
  ];
  const [bar, setBar] = useState<any>(
    <Bar data={props.data[0]} width={100} height={45} />
  );
  const changeBar = (value: any) => {
    const element = charts.find((e) => e.name === value)?.element;
    setBar(element);
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
      </div>
      <div className="bar-content">{bar}</div>
    </>
  );
};

export default ServiceChart;
