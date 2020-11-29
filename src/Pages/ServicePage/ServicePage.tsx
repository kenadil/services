import { Button, Col, Divider, Row } from "antd";
import React, { useEffect, useState } from "react";
import ServiceLayout from "../../Components/ServiceLayout/ServiceLayout";
import SideComponent from "../../Components/SideComponent/SideComponent";
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
