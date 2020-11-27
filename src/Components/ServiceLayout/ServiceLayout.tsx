import { DeleteOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Layout } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../Services/api.service";
import { chartDatas } from "../../Services/chartDatas";
import { fetchCategories } from "../../Store/Actions";
import { getCategories } from "../../Utils/dispatchedData";
import ServiceChart from "../Charts/ServiceChart";
import { stateType } from "../Users/Table";

const { Content } = Layout;

export type ServiceLayoutProps = {
  contracted: boolean;
  onDelete: (e: any) => void;
};

const ServiceLayout = ({ contracted, onDelete }: ServiceLayoutProps) => {
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const { categories } = useSelector((state: stateType) => ({
    categories: state.categoriesState,
  }));
  const advisersList = getCategories(categories, dispatch);
  const advisers: string[] = [];
  advisersList.map((e) => advisers.push(e.name));
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const [loading, setLoading] = useState(false);
  async function getAll() {
    setLoading(true);
    axios
      .get(
        url === ""
          ? `${API_URL}/logs/barchart/all`
          : `${API_URL}/logs/barchart/${url}`
      )
      .then((rec) => {
        const json = rec.data;
        //const barchartData = await response.json();
        setLoading(false);
        //return barchartData;
        json.sort((a: any, b: any) => {
          return new Date(a.date) > new Date(b.date) ? 1 : -1;
        });
        const dates: string | any[] = [];
        for (var i = 0; i < json.length; i++) {
          if (!dates.includes(json[i].date)) {
            dates.push(json[i].date);
          }
        }
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
        const deleteRecords: number[] = [];
        deleteData.map((e) => deleteRecords.push(e.records));
        const updateRecords: number[] = [];
        updateData.map((e) => updateRecords.push(e.records));
        const addRecords: number[] = [];
        addData.map((e) => addRecords.push(e.records));
        console.log(deleteData);
        setChartData(
          /*{
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
          },*/
          {
            labels: ["June", "August", "September", "October"],
            datasets: [
              {
                label: "Deleted",
                borderColor: ["red"],
                backgroundColor: ["rgba(255, 0, 0, 0)"],
                data: deleteRecords,
              },
              {
                label: "Updated",
                borderdColor: ["purple"],
                backgroundColor: ["rgba(128, 0, 128, 0)"],
                data: updateRecords,
              },
              {
                label: "Added",
                borderdColor: ["green"],
                backgroundColor: ["rgba(0, 128, 0, 0)"],
                data: addRecords,
              },
            ],
          }
          /*{
            labels: ["Deleted", "Updated", "Added"],
            datasets: [
              {
                label: "Deleted",
                data: [
                  deleteData.reduce((prev, cur) => prev + cur.records, 0),
                  updateData.reduce((prev, cur) => prev + cur.records, 0),
                  addData.reduce((prev, cur) => prev + cur.records, 0),
                ],
                backgroundColor: [
                  "rgba(255, 0, 0, 0.5)",
                  "rgba(128, 0, 128, 0.5)",
                  "rgba(0, 128, 0, 0.5)",
                ],
                borderWidth: 4,
              },
            ],
          },*/
        );
      });
  }
  const [chartData, setChartData] = useState<any>([]);
  const [urlValue, setUrlValue] = useState("");
  useEffect(() => {
    getAll();
  }, []);
  useEffect(() => {
    getAll();
  }, [url]);
  useEffect(() => {
    setUrl(advisersList.find((e) => e.name === urlValue)?.id);
  }, [urlValue]);
  return (
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
        <div className="page-optioning">
          <AutoComplete
            className="advisers-select"
            placeholder="All"
            value={urlValue}
            dataSource={advisers}
            style={
              contracted
                ? { width: "15vw", marginRight: "1.5%" }
                : { width: "15vw" }
            }
            onChange={(e) => setUrlValue(e)}
          />
        </div>
        <div className="bar-content">
          {loading ? (
            <Loader type="Bars" color="#00BFF" height={80} width={80} />
          ) : (
            <Line data={chartData} width={100} height={45} />
          )}
          {/*<ServiceChart data={chartData}/>*/}
        </div>
      </Content>
    </Layout>
  );
};

export default ServiceLayout;
