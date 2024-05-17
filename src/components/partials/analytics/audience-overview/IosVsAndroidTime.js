import React, { useState, useEffect } from "react";
import { AudienceLineChart } from "../../charts/analytics/AnalyticsCharts";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Spinner } from "reactstrap";
import { Icon } from "../../../Component";
import { ResponsiveLine } from '@nivo/line'
import BASE_URL from "../../../../config";
import axios from "axios";
import { ResponsiveSwarmPlot } from '@nivo/swarmplot'


const CustomTooltip = ({ point }) => {
  // Extracting TicketID and legend name from the point's data
  const { data: {x} } = point;

  return (
    <div style={{ background: 'white', padding: '10px', border: '1px solid #ccc' }}>
      <p>TicketID: {x}</p>
    </div>
  );
};

const IosVsAndroidTime = ({ startDate }) => {
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
        const response = await axios.get(`${BASE_URL}/phone_system_true_tickets?date=${encodeURIComponent(formattedDate)}`);
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
      <h6 className="title">Time taken in ms (IOS vs ANDROID)</h6>
      {isLoading ? (
        <div className="spinner-container" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Spinner color="primary" />
        </div>
      ) : error ? (
        <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
      ) : (
        <ResponsiveSwarmPlot
        data={data}
        groups={[ '', '']}
        identity="id"
        value="price"
        valueFormat="$.2f"
        valueScale={{ type: 'linear', min: 0, max: 3000, reverse: false }}
        size={{
            key: 'volume',
            values: [
                4,
                20
            ],
            sizes: [
                6,
                20
            ]
        }}
        layout="horizontal"
        forceStrength={4}
        simulationIterations={100}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.6
                ],
                [
                    'opacity',
                    0.5
                ]
            ]
        }}
        margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
        axisTop={{
            orient: 'top',
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Time Taken in milli second',
            legendPosition: 'middle',
            legendOffset: -46,
            truncateTickAt: 0
        }}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
          orient: 'left',
          tickSize: 10,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: -76,
          truncateTickAt: 0
      }}
      isInteractive={false}
    />
      )}
    </React.Fragment>
  );
};

export default IosVsAndroidTime;