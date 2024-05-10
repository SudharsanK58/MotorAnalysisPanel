import React, { useState, useEffect } from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem , Spinner } from "reactstrap";
import { TCDoughnut } from "../../charts/analytics/AnalyticsCharts";
import { ResponsiveCirclePacking } from '@nivo/circle-packing'
import BASE_URL from "../../../../config";
import axios from "axios";


const TicketsCirclePacking = ({ startDate }) => {
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
          const response = await axios.get(`${BASE_URL}/latest_ticket_data_numbers?date=${encodeURIComponent(formattedDate)}`);
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
        <h6 className="title">Valid, illegal, Reactivate tickets</h6>
        {isLoading ? (
          // Render spinner when loading
            <div className="spinner-container" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Spinner color="primary" />
            </div>
        ) : error ? (
          // Render error message if an error occurred
          <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
        ) : (
          // Render circle packing chart when data is loaded
          <ResponsiveCirclePacking
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            id="name"
            value="loc"
            valueFormat=" >-"
            colors={{ scheme: 'nivo' }}
            childColor={{
              from: 'color',
              modifiers: [['brighter', 0.4]]
            }}
            padding={4}
            enableLabels={true}
            labelsFilter={n => 2 === n.node.depth}
            labelsSkipRadius={1}
            labelTextColor={{
              from: 'color',
              modifiers: [['darker', 2]]
            }}
            borderWidth={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.5]]
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
                match: { depth: 1 },
                id: 'lines'
              }
            ]}
          />
        )}
      </React.Fragment>
    );
  };
  
  export default TicketsCirclePacking;