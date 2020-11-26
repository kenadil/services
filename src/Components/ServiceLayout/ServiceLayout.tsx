import { Dropdown, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ServiceChart from "../Charts/ServiceChart";
import { stateType } from "../Users/Table";

const { Content } = Layout;

const ServiceLayout = () => {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState({});
  const chart = () => {
    setChartData({
      labels: ["Deleted", "Updated", "Added"],
      datasets: [
        {
          label: "Number of records",
          data: [100, 13, 500],
          backgroundColor: ['rgba(255, 0, 0, 0.5)', 'rgba(128, 0, 128, 0.5)', 'rgba(0, 128, 0, 0.5)'],
          borderWidth: 4,
        },
      ],
    });
  };
  useEffect(() => {
    chart();
  }, []);
  //const advisersList = useSelector((state: stateType) => state.categoriesState);
  return (
    <>
      <Layout>
        <Content
          className="site-layout-background"
          style={{ marginBottom: "1.5vh" }}
        >
          Sorters
        </Content>
        <Content className="site-layout-background">
          <ServiceChart data={chartData} />
        </Content>
      </Layout>
    </>
  );
};

export default ServiceLayout;
