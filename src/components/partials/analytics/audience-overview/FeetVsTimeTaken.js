import React, { useState, useEffect } from "react";
import { AudienceLineChart } from "../../charts/analytics/AnalyticsCharts";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Spinner } from "reactstrap";
import { Icon } from "../../../Component";
import { ResponsiveLine } from '@nivo/line'
import BASE_URL from "../../../../config";
import axios from "axios";
import { ResponsiveScatterPlot } from '@nivo/scatterplot'


const FeetVsTimeTaken = ({ startDate }) => {
  const [auOverview, setAuOverview] = useState("month-1");
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
        const response = await axios.get(`${BASE_URL}/latest_android_benchmark_app_data?date=${encodeURIComponent(formattedDate)}`);
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
  }, [startDate]); // Trigger effect whenever startDate changes
  

  return (
    <React.Fragment>
      <h6 className="title">Distance vs Time Validation ~(Android Only)</h6>
      {isLoading ? (
        // Render spinner when loading
        <div className="spinner-container" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Spinner color="primary" />
        </div>
      ) : error ? (
        // Render error message if an error occurred
        <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
      ) : (
        // Render line chart when data is loaded
        <ResponsiveScatterPlot
        data={data}
        margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
        xScale={{ type: 'linear', min: 0, max: 'auto' }}
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        blendMode="multiply"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Distance in Feet',
            legendPosition: 'middle',
            legendOffset: 46,
            truncateTickAt: 0
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Time in millis',
            legendPosition: 'middle',
            legendOffset: -60,
            truncateTickAt: 0
        }}
        isInteractive={false}
                  legends={[
            {
                anchor: 'top',
                direction: 'row',
                justify: false,
                translateX: 50,
                translateY:  -50,
                itemsSpacing: 200,
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
        tooltip={({ node }) => (
    <div>
      <strong>X Value:</strong> {node.data.x} {/* Accessing the x-value of the data point */}
    </div>
  )}
    />
      )}
    </React.Fragment>
  );
};

export default FeetVsTimeTaken;