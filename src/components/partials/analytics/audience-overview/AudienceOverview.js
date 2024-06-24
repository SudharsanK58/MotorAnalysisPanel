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
    Power: {point.data.yFormatted} watt
  </div>
);

const AudienceOverview = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get_power`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setIsLoading(false);
      }
    };

    // Fetch data initially when component mounts
    fetchData();

    // Fetch data every 5 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    // Clean up interval on component unmount or re-render
    return () => clearInterval(interval);
  }, []);
  return (
    <React.Fragment>
      <h6 className="title">POWER</h6>
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
            legend: "",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Power",
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

export default AudienceOverview;
