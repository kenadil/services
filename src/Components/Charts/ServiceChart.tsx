import { Select } from "antd";
import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";

const {Option} = Select;

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
    setBar(value === "Bar")
  };
  return (
    <>
      <Select 
        style={{width: "10vw"}}
        defaultValue={charts[0].name}
        onChange={changeBar}
      >
        {charts.map((e) => 
          <Option value={e.name}>{e.name}</Option>
        )}
      </Select>
      {bar ? 
      <Bar data={props.data} width={100} height={40} />
      :
      <Doughnut data={props.data} width={100} height={40} />
      }
    </>
  );
};

export default ServiceChart;
