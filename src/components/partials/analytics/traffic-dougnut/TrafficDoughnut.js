import React, { useState, useEffect } from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Spinner } from "reactstrap";
import { TCDoughnut } from "../../charts/analytics/AnalyticsCharts";
import { ResponsiveRadialBar } from '@nivo/radial-bar'
import BASE_URL from "../../../../config";
import axios from "axios";


const TrafficDougnut = ({ startDate }) => {
  const [traffic, setTraffic] = useState("30");
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
        const response = await axios.get(`${BASE_URL}/latest_app_benchmark_app_data?date=${encodeURIComponent(formattedDate)}`);
        setData(response.data);
        setIsLoading(false);
        setError(null);
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
  }, [startDate]); 

  return (
    <React.Fragment>
      <h6 className="title">Foreground Vs Pocket mode Validation</h6>
      {isLoading ? (
        // Render spinner when loading
        <div className="spinner-container" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Spinner color="primary" />
        </div>
      ) : error ? (
        // Render error message if an error occurred
        <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
      ) : (
        // Render radial bar chart when data is loaded
        <ResponsiveRadialBar
          data={data}
          padding={0.4}
          cornerRadius={2}
          margin={{ top: 10, right: 80, bottom: 60, left: 80 }}
          colors={{ scheme: 'category10' }}
          borderColor={{
            from: 'color',
            modifiers: [['darker', '1.1']]
          }}
          enableTracks={false}
          enableRadialGrid={false}
          radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
          circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
        />
      )}
    </React.Fragment>
  );
};

export default TrafficDougnut;