import React, { useState, useEffect } from "react";
import { AudienceLineChart } from "../../charts/analytics/AnalyticsCharts";
import {
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownItem,
  Spinner,
} from "reactstrap";
import { Icon } from "../../../Component";
import { ResponsiveLine } from "@nivo/line";
import BASE_URL from "../../../../config";
import axios from "axios";

const CustomTooltip = ({ point }) => (
  <div
    style={{
      background: "white",
      padding: "9px 12px",
      border: "1px solid #ccc",
    }}
  >
    <strong>{point.serieId}</strong>
    <br />
    RPM: {point.data.xFormatted}
    <br />
    Thrust: {point.data.yFormatted}
  </div>
);

const ApiGraphIos = ({}) => {
  const data = [
    {
      id: "Thrust",
      color: "hsl(240, 70%, 50%)",
      data: [
        { x: 1000, y: 10 },
        { x: 2000, y: 25 },
        { x: 3000, y: 20 },
        { x: 4000, y: 35 },
        { x: 5000, y: 30 },
        { x: 6000, y: 40 },
        { x: 7000, y: 37 },
        { x: 8000, y: 45 },
        { x: 9000, y: 42 },
        { x: 10000, y: 50 },
      ],
    },
    {
      id: "RPM",
      color: "hsl(120, 70%, 50%)",
      data: [
        { x: 1000, y: 1000 },
        { x: 2000, y: 2000 },
        { x: 3000, y: 3000 },
        { x: 4000, y: 4000 },
        { x: 5000, y: 5000 },
        { x: 6000, y: 6000 },
        { x: 7000, y: 7000 },
        { x: 8000, y: 8000 },
        { x: 9000, y: 9000 },
        { x: 10000, y: 10000 },
      ],
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const formattedDate = startDate.toLocaleDateString("en-US", {
  //         month: "numeric",
  //         day: "numeric",
  //         year: "numeric",
  //       });
  //       const response = await axios.get(`${BASE_URL}/app_benchmark_api_graph_ios?date=${encodeURIComponent(formattedDate)}`);
  //       setData(response.data);
  //       setIsLoading(false);
  //       setError(null);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       if (error.response && error.response.status === 404) {
  //         setError('No data found on selected date');
  //       } else {
  //         setError('An error occurred while fetching data');
  //       }
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [startDate]);

  return (
    <React.Fragment>
      <h6 className="title">THRUST VS RPM</h6>
      {isLoading ? (
        <div
          className="spinner-container"
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spinner color="primary" />
        </div>
      ) : error ? (
        <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
      ) : (
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "linear" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          curve="cardinal"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "RPM",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Thrust",
            legendOffset: -50,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={false}
          enablePoints={true}
          pointColor={{ from: "color", modifiers: [] }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="y"
          pointLabelYOffset={-12}
          enableCrosshair={true}
          useMesh={true}
          tooltip={CustomTooltip}
          legends={[
            {
              anchor: "top",
              direction: "row",
              justify: false,
              translateX: 100,
              translateY: -50,
              itemsSpacing: 10,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      )}
    </React.Fragment>
  );
};

export default ApiGraphIos;
