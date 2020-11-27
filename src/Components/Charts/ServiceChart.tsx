import { AutoComplete, Select } from "antd";
import React, { useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../Utils/dispatchedData";
import { stateType } from "../Users/Table";
import "./ServiceChart.css";

const { Option } = Select;

const ServiceChart = (props: any) => {
  const dispatch = useDispatch();
  const {categories} = useSelector((state: stateType) => ({
    categories: state.categoriesState,
  }));
  const advisersList = getCategories(categories, dispatch);
  console.log(advisersList);
  const advisers: string[] = [];
  advisersList.map(e => advisers.push(e.name));
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
    const element = charts.find(e => e.name === value)?.element;
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
        <AutoComplete
          className="advisers-select"
          placeholder="All"
          dataSource={advisers}
          style={
            props.contracted
              ? { width: "15vw", marginRight: "1.5%" }
              : { width: "15vw" }
          }
          onChange={(e) => props.setUrl(advisersList.find(el => el.name === e)?.id)}
        />
      </div>
      <div className="bar-content">
        {bar}
      </div>
    </>
  );
};

export default ServiceChart;
