import React, { useState, useEffect } from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { TCDoughnut } from "../../charts/analytics/AnalyticsCharts";
import { ResponsiveCirclePacking } from '@nivo/circle-packing'
import BASE_URL from "../../../../config";
import axios from "axios";


const TicketsCirclePacking = ({ startDate }) => {
  const [traffic, setTraffic] = useState("30");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedDate = startDate.toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
        });
        const response = await axios.get(`${BASE_URL}/latest_ticket_data_numbers?date=${encodeURIComponent(formattedDate)}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [startDate]);

  return (
    <React.Fragment>
          <h6 className="title">Valid,illegal,Reactive circle</h6>
          <ResponsiveCirclePacking
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        id="name"
        value="loc"
        valueFormat=" >-"
        colors={{ scheme: 'nivo' }}
        childColor={{
            from: 'color',
            modifiers: [
                [
                    'brighter',
                    0.4
                ]
            ]
        }}
        padding={4}
        enableLabels={true}
        labelsFilter={n=>2===n.node.depth}
        labelsSkipRadius={1}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.5
                ]
            ]
        }}
        defs={[
            {
                id: 'lines',
                type: 'patternLines',
                background: 'none',
                color: 'inherit',
                rotation: -45,
                lineWidth: 5,
                spacing: 8
            }
        ]}
        fill={[
            {
                match: {
                    depth: 1
                },
                id: 'lines'
            }
        ]}
    />

    </React.Fragment>
  );
};
export default TicketsCirclePacking;
