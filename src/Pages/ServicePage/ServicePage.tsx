import { AutoComplete, Button, Col, Divider, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import ServiceChart from "../../Components/Charts/ServiceChart";
import ServiceLayout from "../../Components/ServiceLayout/ServiceLayout";
import SideComponent from "../../Components/SideComponent/SideComponent";
import { stateType } from "../../Components/Users/Table";
import { API_URL } from "../../Services/api.service";
import { fetchCategories } from "../../Store/Actions";
import { getCategories } from "../../Utils/dispatchedData";
import { makeid } from "../../Utils/randomString";

const ServicePage = () => {
  const [chartLength, setChartLength] = useState(1);
  const [chartGrids, setChartGrids] = useState<any[]>([]);
  const addChart = () => {
    let temp = chartGrids;
    temp.push({
      key: makeid(9),
    });
    setChartLength(temp.length);
    setChartGrids(temp);
  };
  const deleteChart = (e: any) => {
    let temp = chartGrids;
    temp = temp.filter((el) => el.key !== e.key);
    setChartLength(temp.length);
    setChartGrids(temp);
  };
  useEffect(() => {
    let charts = [
      {
        key: makeid(9),
      },
    ];
    setChartGrids(charts);
  }, []);
  const [url, setUrl] = useState("");
  return (
    <>
      <SideComponent />
      <div className="pageContent" style={{ paddingTop: "1%" }}>
        <div style={{ display: "flex", flexDirection: "row", height: "5vh" }}>
          <h1 style={{ marginRight: "5%", width: "100%" }}>
            Advance Reporting
          </h1>
          <Button
            style={{ float: "right", transform: "translate(0%, 25%)" }}
            className="purple-button"
            onClick={addChart}
          >
            Add Chart
          </Button>
        </div>
        <Divider style={{ margin: "2.5vh 0" }} />
        <Row gutter={[24, 8]}>
          {chartGrids.map((e, index) => (
            <Col key={e.key} span={chartLength > 1 ? 12 : 24}>
              <ServiceLayout
                contracted={chartLength > 1}
                onDelete={() => deleteChart(e)}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default ServicePage;
