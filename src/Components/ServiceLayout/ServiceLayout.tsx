import { DeleteOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../Services/api.service";
import { getCategories } from "../../Utils/dispatchedData";
import ServiceChart from "../Charts/ServiceChart";
import { stateType } from "../Users/Table";

const { Content } = Layout;

export type ServiceLayoutProps = {
  contracted: boolean;
  onDelete: (e: any) => void;
};

const ServiceLayout = ({ contracted, onDelete }: ServiceLayoutProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { categories } = useSelector((state: stateType) => ({
    categories: state.categoriesState,
  }));
  const advisers = getCategories(categories, dispatch);
  const [chartData, setChartData] = useState<any>([]);
  async function getAll() {
    setLoading(true);
    const response = await fetch(`${API_URL}/logs/barchart/all`);
    const barchartData = await response.json();
    setLoading(false);
    return barchartData;
  }
  

  const showAll = (json: any) => {
    const deleteData: { date: any; records: number }[] = [];
    json
      .filter((e: any) => e.name === 3)
      .map((data: any) =>
        deleteData.push({
          date: data.date,
          records: data.records,
        })
      );
    const updateData: { date: any; records: any }[] = [];
    json
      .filter((e: { name: number }) => e.name === 2)
      .map((data: any) =>
        updateData.push({
          date: data.date,
          records: data.records,
        })
      );
    const addData: { date: any; records: any }[] = [];
    json
      .filter((e: { name: number }) => e.name === 1)
      .map((data: any) =>
        addData.push({
          date: data.date,
          records: data.records,
        })
      );
    console.log(json);
    const chartDatas = [
      {
        labels: ["Activity"],
        datasets: [
          {
            label: "Deleted",
            data: [deleteData.reduce((prev, cur) => prev + cur.records, 0)],
            backgroundColor: ["rgba(255, 0, 0, 0.5)"],
            borderWidth: 4,
          },
          {
            label: "Updated",
            data: [updateData.reduce((prev, cur) => prev + cur.records, 0)],
            backgroundColor: ["rgba(128, 0, 128, 0.5)"],
            borderWidth: 4,
          },
          {
            label: "Added",
            data: [addData.reduce((prev, cur) => prev + cur.records, 0)],
            backgroundColor: ["rgba(0, 128, 0, 0.5)"],
            borderWidth: 4,
          },
        ],
      },
      {
        labels: ["Deleted", "Updated", "Added"],
        datasets: [
          {
            label: "Deleted",
            data: [100, 13, 500],
            backgroundColor: [
              "rgba(255, 0, 0, 0.5)",
              "rgba(128, 0, 128, 0.5)",
              "rgba(0, 128, 0, 0.5)",
            ],
            borderWidth: 4,
          },
        ],
      },
    ];
    setChartData(
      <ServiceChart
        contracted={contracted}
        data={chartDatas}
        onDelete={onDelete}
        advisers={advisers}
      />
    );
  };
  useEffect(() => {
    getAll()
      .then((json) => showAll(json));
  }, []);
  //const advisersList = useSelector((state: stateType) => state.categoriesState);
  return loading ? <Loader type="Bars" color="#00BFF" height={80} width={80} /> : (
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
          {loading ?
            <Loader type="Bars" color="#00BFF" height={80} width={80} />
          : chartData }
        </Content>
      </Layout>
    </>
  );
};

export default ServiceLayout;
