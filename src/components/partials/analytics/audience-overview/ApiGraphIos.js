import React, { useState, useEffect } from "react";
import { AudienceLineChart } from "../../charts/analytics/AnalyticsCharts";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Spinner } from "reactstrap";
import { Icon } from "../../../Component";
import { ResponsiveLine } from '@nivo/line'
import BASE_URL from "../../../../config";
import axios from "axios";


const CustomTooltip = ({ point }) => {
  // Extracting TicketID and legend name from the point's data
  const { data: {x} } = point;

  return (
    <div style={{ background: 'white', padding: '10px', border: '1px solid #ccc' }}>
      <p>TicketID: {x}</p>
    </div>
  );
};

const ApiGraphIos = ({ startDate }) => {
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
        const response = await axios.get(`${BASE_URL}/app_benchmark_api_graph_ios?date=${encodeURIComponent(formattedDate)}`);
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
      <h6 className="title">Validation api performance (IOS)</h6>
      {isLoading ? (
        <div className="spinner-container" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Spinner color="primary" />
        </div>
      ) : error ? (
        <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
      ) : (
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false
          }}
          curve="cardinal"
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={{
            tickSize: 0,
            tickPadding: 6,
            tickRotation: -1,
            legend: 'Time in millis',
            legendOffset: -50,
            legendPosition: 'middle',
            truncateTickAt: 0
          }}
          enableGridX={false}
          enableGridY={false}
          enablePoints={false}  // Enable points for tooltips
          pointColor={{ from: 'color', modifiers: [] }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="data.xFormatted"
          pointLabelYOffset={-15}
          enableCrosshair={true} // Enable crosshair for better tooltip positioning
          useMesh={true}
          tooltip={CustomTooltip} // Custom tooltip component
          legends={[
            {
                anchor: 'top',
                direction: 'row',
                justify: false,
                translateX: 100,
                translateY:  -50,
                itemsSpacing: 10,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        />
      )}
    </React.Fragment>
  );
};

export default ApiGraphIos;