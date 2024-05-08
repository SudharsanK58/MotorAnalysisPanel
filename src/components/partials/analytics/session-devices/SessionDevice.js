import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { Icon } from "../../../Component";
import { ResponsivePie } from '@nivo/pie'
import axios from "axios";
import BASE_URL from "../../../../config";

const SessionDevice = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/latest_app_benchmark_phone_model?date=5%2F8%2F2024`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <h6 className="title">Ticket validated by phone models</h6>
      <ResponsivePie
        data={data}
        width={350} // Adjust the width as needed
        height={350} // Adjust the height as needed
        margin={{ top: 10, right: 80, bottom: 60, left: 80 }}
        innerRadius={0.5}
        padAngle={0}
        cornerRadius={6}
        activeOuterRadiusOffset={16}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.1]],
        }}
        arcLinkLabelsSkipAngle={15}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={3}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: false,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
      />
    </React.Fragment>
  );
};

export default SessionDevice;