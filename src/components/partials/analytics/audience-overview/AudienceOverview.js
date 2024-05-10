import React, { useState, useEffect } from "react";
import { AudienceLineChart } from "../../charts/analytics/AnalyticsCharts";
import { Icon } from "../../../Component";
import { ResponsiveLine } from '@nivo/line'
import BASE_URL from "../../../../config";
import axios from "axios";


const AudienceOverview = ({ startDate }) => {
  const [auOverview, setAuOverview] = useState("month-1");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedDate = startDate.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        });
        const response = await axios.get(`${BASE_URL}/app_benchmark_api_graph?date=${encodeURIComponent(formattedDate)}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [startDate]); // Trigger effect whenever startDate changes

  
  return (
    <React.Fragment>
      <h6 className="title">Audience Overview</h6>
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
        enablePoints={false}
        pointSize={9}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.xFormatted"
        pointLabelYOffset={-15}
        enableTouchCrosshair={true}
        crosshairType="cross"
        useMesh={true}
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

    </React.Fragment>
  );
};
export default AudienceOverview;
