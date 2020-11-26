import { DeleteOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chartDatas } from "../../Services/chartDatas";
import { getCategories, getLogs } from "../../Utils/dispatchedData";
import ServiceChart from "../Charts/ServiceChart";
import { stateType } from "../Users/Table";

const { Content } = Layout;

export type ServiceLayoutProps = {
  contracted: boolean,
  onDelete: (e: any) => void;
};

const ServiceLayout = ({contracted, onDelete}:ServiceLayoutProps) => {
  const dispatch = useDispatch();
  const { logState, categories } = useSelector((state: stateType) => ({
    logState: state.logState,
    categories: state.categoriesState,
  }));
  const advisers = getCategories(categories, dispatch);
  const [chartData, setChartData] = useState<any>([]);
  const chart = () => {
    setChartData(chartDatas);
  };
  useEffect(() => {
    chart();
  }, []);
  //const advisersList = useSelector((state: stateType) => state.categoriesState);
  return (
    <>
      <Layout>
        <Content className="site-layout-background">
          {contracted ? (
            <Button
              style={{ float: "right", marginRight: "5%", marginTop: "4.4%" }}
              onClick={onDelete}
            >
              <DeleteOutlined />
            </Button>
          ) : null}
          <ServiceChart
            contracted={contracted}
            data={chartData}
            onDelete={onDelete}
            advisers={advisers}
          />
        </Content>
      </Layout>
    </>
  );
};

export default ServiceLayout;
