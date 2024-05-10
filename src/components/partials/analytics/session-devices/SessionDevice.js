import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Spinner } from "reactstrap";
import { Icon } from "../../../Component";
import { ResponsivePie } from '@nivo/pie'
import axios from "axios";
import BASE_URL from "../../../../config";

const SessionDevice = ({ startDate }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedDate = startDate.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        });
        const response = await axios.get(`${BASE_URL}/latest_app_benchmark_phone_model?date=${encodeURIComponent(formattedDate)}`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response && error.response.status === 404) {
          setError('No data found on selected date');
        } else {
          setError('An error occurred while fetching data');
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDate]); // Trigger effect whenever startDate changes


  return (
    <React.Fragment>
      <h6 className="title">Ticket validated by phone models</h6>
      {isLoading ? (
        <div className="spinner-container" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Spinner color="primary" />
        </div>
      ) : error ? (
        // Render error message if an error occurred
        <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
      ) : (
        // Render pie chart when data is loaded
        <ResponsivePie
          data={data}
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
      )}
    </React.Fragment>
  );
};

export default SessionDevice;