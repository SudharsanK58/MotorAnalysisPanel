import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { Icon } from "../../../Component";

const SessionDevice = () => {
  const [ticketCounts, setTicketCounts] = useState({
    ios: 0,
    android: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8001/latest_app_benchmark_ticket_ids?date=5%2F6%2F2024");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        // Assuming the API response is an array with a single object
        const { datasets } = responseData[0];
        const iosCount = datasets[0].data[0];
        const androidCount = datasets[0].data[1];
        setTicketCounts({ ios: iosCount, android: androidCount });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const doughnutData = {
    labels: ["IOS", "ANDROID"],
    dataUnit: "Tickets",
    legend: true, // Make sure legend is defined in the data object
    datasets: [
      {
        borderColor: "#fff",
        backgroundColor: ["#36a2eb", "#ff6384"], // Example colors
        data: [ticketCounts.ios, ticketCounts.android],
      },
    ],
  };

  return (
    <React.Fragment>
      <div className="card-title-group">
        <div className="card-title card-title-sm">
          <h6 className="title">Sessions by IOS vs Android Validation %</h6>
        </div>
      </div>
      <div className="device-status my-auto">
        <div className="device-status-ck">
          <Doughnut
            className="analytics-doughnut"
            data={doughnutData}
            options={{
              plugins: {
                tooltip: {
                  enabled: true,
                  displayColors: false,
                  backgroundColor: "#eff6ff",
                  titleFont: {
                    size: "13px",
                  },
                  titleColor: "#6783b8",
                  titleMarginBottom: 6,
                  bodyColor: "#9eaecf",
                  bodyFont: {
                    size: "12px",
                  },
                  bodySpacing: 4,
                  padding: 10,
                  footerMarginTop: 0,
                },
              },
              rotation: -1.5,
              cutoutPercentage: 70,
              maintainAspectRatio: false,
            }}
          />
        </div>
        <div className="device-status-group">
          <div className="device-status-data" style={{ marginLeft: "0px" }}>
            <div className="title">IOS</div>
            <div className="amount" style={{ fontSize: "14px" }}>
              {ticketCounts.ios} Tickets
            </div>
          </div>
          <div className="device-status-data" style={{ marginLeft: "0px" }}>
            <div className="title">Android</div>
            <div className="amount" style={{ fontSize: "14px" }}>
              {ticketCounts.android} Tickets
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SessionDevice;
