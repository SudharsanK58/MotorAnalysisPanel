import React, { useState, useEffect } from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { TCDoughnut } from "../../charts/analytics/AnalyticsCharts";
import { ResponsiveRadialBar } from '@nivo/radial-bar'
import BASE_URL from "../../../../config";
import axios from "axios";

const TrafficDougnut = () => {
  const [traffic, setTraffic] = useState("30");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/latest_app_benchmark_app_data?date=5%2F8%2F2024`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const data43 = [
    {
      "id": "iOS",
      "data": [
        {
          "x": "Michigan Mobility Wallet Foreground",
          "y": 23
        },
        {
          "x": "Michigan Mobility Wallet Pocket",
          "y": 9
        }
      ]
    },
    {
      "id": "Android",
      "data": [
        {
          "x": "Michigan Mobility Wallet Foreground",
          "y": 23
        },
        {
          "x": "Michigan Mobility Wallet Pocket",
          "y": 37
        }
      ]
    }
  ];
  return (
    <React.Fragment>
          <h6 className="title">Traffic Channel</h6>
        <ResponsiveRadialBar
        data={data}
        width={350} // Adjust the width as needed
        height={350} // Adjust the height as needed
        valueFormat=" >-.2f"
        padding={0.4}
        cornerRadius={2}
        margin={{ top: 10, right: 80, bottom: 60, left: 80 }}
        colors={{ scheme: 'category10' }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '1.1'
                ]
            ]
        }}
        enableTracks={false}
        enableRadialGrid={false}
        radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
    />

    </React.Fragment>
  );
};
export default TrafficDougnut;
