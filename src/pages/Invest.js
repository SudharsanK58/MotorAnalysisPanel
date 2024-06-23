import React, { useState, useEffect } from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import InvestOverview from "../components/partials/invest/invest-overview/InvestOverview";
import InvestPlan from "../components/partials/invest/invest-plan/InvestPlan";
import RecentInvest from "../components/partials/invest/recent-investment/RecentInvest";
import RecentActivity from "../components/partials/default/recent-activity/Activity";
import Notifications from "../components/partials/default/notification/Notification";

import {
  DropdownToggle,
  Spinner,
  button,
  DropdownMenu,
  Card,
  UncontrolledDropdown,
  DropdownItem,
  Modal,
  ModalBody,
} from "reactstrap";
import SessionDevice from "../components/partials/analytics/session-devices/SessionDevice";
import CountUp from "react-countup";
import BASE_URL from "../config";
import {
  Block,
  BlockDes,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  PreviewAltCard,
  TooltipComponent,
} from "../components/Component";
import {
  BalanceBarChart,
  DepositBarChart,
  WithdrawBarChart,
} from "../components/partials/charts/invest/InvestChart";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import jspdf-autotable plugin

const InvestHomePage = () => {
  const [sm, updateSm] = useState(false);
  const [deviceCounts, setDeviceCounts] = useState([]);
  const [ticketsloading, seticketsloading] = useState(true);
  const [ticketCounts, setTicketCounts] = useState({});
  const [temperatureStats, setTemperatureStats] = useState({});
  const [temperatureLoading, setTemperatureLoading] = useState(true);
  const [viewModal, setViewModal] = useState(false);
  const [temperatureData, setTemperatureData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfloading, setpdfLoading] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [latestTimestamp, setLatestTimestamp] = useState("");
  const handlePdfDownload = async () => {
    setpdfLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/list_motor_data`);
      const { data } = await response.json();

      // Generate PDF with custom page size and fit table
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "pt", // Use points as the unit of measurement
        format: "a4", // Use A4 format for the page
      });

      const tableColumnWidths = [120, 60, 60, 60, 60, 70, 60, 70, 80, 70, 60]; // Adjust column widths as needed
      const headers = Object.keys(data[0]);
      const tableRows = data.map((obj) => {
        const formattedRow = [
          formatTimestamp(obj.timestamp),
          obj.ambient_C,
          obj.object_C,
          obj.ambient_F,
          obj.object_F,
          obj.shuntvoltage,
          obj.busvoltage,
          obj.current_mA,
          obj.weight_in_kilograms,
          obj.weight_in_grams,
          obj.motor_rpm,
        ];
        return formattedRow;
      });
      // AutoTable configuration
      doc.autoTable({
        head: [
          ["Timestamp", ...headers.filter((header) => header !== "timestamp")],
        ], // Include 'Timestamp' as the first column header
        body: tableRows,
        startY: 20,
        styles: {
          fontSize: 10,
          cellPadding: 4,
          lineColor: [0, 0, 0],
          lineWidth: 0.2,
        },
        columnStyles: {
          0: { cellWidth: tableColumnWidths[0] },
          1: { cellWidth: tableColumnWidths[1] },
          2: { cellWidth: tableColumnWidths[2] },
          3: { cellWidth: tableColumnWidths[3] },
          4: { cellWidth: tableColumnWidths[4] },
          5: { cellWidth: tableColumnWidths[5] },
          6: { cellWidth: tableColumnWidths[6] },
          7: { cellWidth: tableColumnWidths[7] },
          8: { cellWidth: tableColumnWidths[8] },
          9: { cellWidth: tableColumnWidths[9] },
          10: { cellWidth: tableColumnWidths[10] },
        },
      });

      doc.save("downloadpdf.pdf"); // Save PDF with a specific name
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setpdfLoading(false);
  };
  const formatTimestamp = (timestamp) => {
    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Convert timestamp to Date object
    const dateObj = new Date(timestamp);

    dateObj.setHours(dateObj.getHours() + 5, dateObj.getMinutes() + 30);

    // Format the adjusted timestamp
    const options = {
      day: "2-digit",
      month: "short", // Use 'short' for abbreviated month name
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    const formattedTimestamp = dateObj.toLocaleString("en-US", options);

    return formattedTimestamp;
  };
  const calculateLastSeen = (formattedTimestamp) => {
    const givenTime = new Date(
      Date.UTC(
        formattedTimestamp.substring(0, 4), // Year
        formattedTimestamp.substring(5, 7) - 1, // Month (zero-based)
        formattedTimestamp.substring(8, 10), // Day
        formattedTimestamp.substring(11, 13), // Hour
        formattedTimestamp.substring(14, 16), // Minute
        formattedTimestamp.substring(17, 19), // Second
        formattedTimestamp.substring(20, 23) // Millisecond
      )
    );
    const currentTime = new Date(
      Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate(),
        new Date().getUTCHours(),
        new Date().getUTCMinutes(),
        new Date().getUTCSeconds()
      )
    );
    const timeDifference = currentTime - givenTime;
    const secondsDifference = Math.floor(timeDifference / 1000);

    if (secondsDifference < 60) {
      return (
        <span style={{ fontWeight: "bold", color: "green" }}>
          {`${Math.max(1, secondsDifference)} seconds ago`}
        </span>
      );
    } else if (secondsDifference < 600) {
      const minutes = Math.floor(secondsDifference / 60);
      return (
        <span style={{ fontWeight: "bold", color: "green" }}>
          {`${minutes} minute${minutes > 1 ? "s" : ""} ago`}
        </span>
      );
    } else if (secondsDifference < 3600) {
      const minutes = Math.floor(secondsDifference / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (secondsDifference < 86400) {
      const hours = Math.floor(secondsDifference / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (secondsDifference < 172800) {
      return "1 day ago";
    } else {
      // If more than one day, return the formatted timestamp without additional formatting
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(formattedTimestamp).toLocaleDateString("en-US", options);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get_motor_data`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTemperatureData(data);
        setLatestTimestamp(data.latest.timestamp);
        setHasAnimated(true);
        setLoading(false); // Set loading to false once data is fetched

      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData(); // Call once initially

    const intervalId = setInterval(fetchData, 4000); // Set interval to call fetchData every 4 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Print API response
  console.log("API response:", temperatureData);

  if (!temperatureData) {
    return <div>Error: Failed to fetch data</div>;
  }

  // Extracting ambient_C values only when temperatureData is not null
  const latestAmbientC = temperatureData.latest
    ? temperatureData.latest.ambient_C
    : null;
  const TemperatureCard = ({
    temperatureLoading,
    temperatureStats,
    title,
    temperatureSymbol,
    averageTempKey,
    lowestTempKey,
    highestTempKey,
  }) => {
    return (
      <>
        <div className="card-title-group align-start mb-0">
          <div className="card-title">
            {title && <h6 className="subtitle">{title}</h6>}
          </div>
          <div className="card-tools">
            {/* You can add TooltipComponent here if needed */}
          </div>
        </div>
        <div className="card-amount">
          {temperatureLoading ? (
            <span className="amount">
              0 {temperatureSymbol}
              <div
                className="spinner-container"
                style={{
                  position: "absolute",
                  top: "30%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Spinner color="primary" />
              </div>
            </span>
          ) : (
            <span className="amount">
              {" "}
              {hasAnimated ? (
                <span>{temperatureStats[averageTempKey].toFixed(2)}</span>
              ) : (
                <CountUp
                  start={0}
                  end={temperatureStats[averageTempKey].toFixed(2)}
                  decimals={2}
                  duration={7}
                  delay={0}
                />
              )}{" "}
              {temperatureSymbol}
              <Icon
                style={{
                  color: "#ff0000",
                  marginLeft: "9px",
                  fontSize: "22px",
                }}
                name="cpu"
              ></Icon>
            </span>
          )}
        </div>
      </>
    );
  };

  return (
    <React.Fragment>
      <Head title="Dashboard" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Dashboard</BlockTitle>
              <BlockDes className="text-soft">
                <p>Welcome to DroneThrust Analyzer .</p>
                {!loading && latestTimestamp && (
                  <p>Last updated: {calculateLastSeen(latestTimestamp)}</p>
                )}
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              {" "}
              <Button color="primary" size="l" onClick={handlePdfDownload}>
                {pdfloading ? (
                  <div className="loader">Downloading.....</div> // Replace with your loader component or spinner
                ) : (
                  <>
                    <Icon name="download" className="icon-large" />
                    Download as PDF
                  </>
                )}
              </Button>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col md="4">
              <PreviewAltCard
                className="card-full"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TemperatureCard
                  temperatureLoading={false} // Assuming temperature data is loaded
                  temperatureStats={{
                    average_temp: latestAmbientC, // Using latest ambient_C as average_temp
                  }}
                  title="Ambient Temperature Stats (°C)"
                  temperatureSymbol="°C"
                  averageTempKey="average_temp"
                  lowestTempKey="lowest_temp"
                  highestTempKey="highest_temp"
                />
              </PreviewAltCard>
            </Col>
            {/* <Col md="4">
              <PreviewAltCard
                className="card-full"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TemperatureCard
                  temperatureLoading={false} // Assuming temperature data is loaded
                  temperatureStats={{
                    average_temp: temperatureData.latest
                      ? temperatureData.latest.ambient_F
                      : null, // Using latest ambient_F as average_temp
                  }}
                  title="Ambient Temperature Stats (°F)"
                  temperatureSymbol="°F"
                  averageTempKey="average_temp"
                  lowestTempKey="lowest_temp"
                  highestTempKey="highest_temp"
                />
              </PreviewAltCard>
            </Col> */}
            {/* <Col md="4">
              <PreviewAltCard
                className="card-full"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TemperatureCard
                  temperatureLoading={false} // Assuming temperature data is loaded
                  temperatureStats={{
                    average_temp: temperatureData.latest
                      ? temperatureData.latest.object_F
                      : null, // Using latest object_F as average_temp
                  }}
                  title="Object Temperature Stats (°F)"
                  temperatureSymbol="°F"
                  averageTempKey="average_temp"
                  lowestTempKey="lowest_temp"
                  highestTempKey="highest_temp"
                />
              </PreviewAltCard>
            </Col> */}
            <Col md="4">
              <PreviewAltCard
                className="card-full"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TemperatureCard
                  temperatureLoading={false} // Assuming temperature data is loaded
                  temperatureStats={{
                    average_temp: temperatureData.latest
                      ? temperatureData.latest.object_C
                      : null, // Using latest object_F as average_temp
                  }}
                  title="Object Temperature Stats (°C)"
                  temperatureSymbol="°C"
                  averageTempKey="average_temp"
                  lowestTempKey="lowest_temp"
                  highestTempKey="highest_temp"
                />
              </PreviewAltCard>
            </Col>
            <Col md="4">
              <PreviewAltCard
                className="card-full"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TemperatureCard
                  temperatureLoading={false} // Assuming temperature data is loaded
                  temperatureStats={{
                    average_temp: temperatureData.latest
                      ? temperatureData.latest.busvoltage
                      : null, // Using latest busvoltage as average_temp
                  }}
                  title="Bus Voltage Stats"
                  temperatureSymbol="V"
                  averageTempKey="average_temp"
                  lowestTempKey="lowest_temp"
                  highestTempKey="highest_temp"
                />
              </PreviewAltCard>
            </Col>
            
            <Col md="4">
              <PreviewAltCard
                className="card-full"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TemperatureCard
                  temperatureLoading={false} // Assuming temperature data is loaded
                  temperatureStats={{
                    average_temp: temperatureData.latest
                      ? temperatureData.latest.current_mA
                      : null, // Using latest current_mA as average_temp
                  }}
                  title="Current Stats"
                  temperatureSymbol="A"
                  averageTempKey="average_temp"
                  lowestTempKey="lowest_temp"
                  highestTempKey="highest_temp"
                />
              </PreviewAltCard>
            </Col>
            <Col md="4">
              <PreviewAltCard
                className="card-full"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TemperatureCard
                  temperatureLoading={false} // Assuming temperature data is loaded
                  temperatureStats={{
                    average_temp: temperatureData.latest
                      ? temperatureData.latest.weight_in_grams
                      : null, // Using latest current_mA as average_temp
                  }}
                  title="Drone weight(g)"
                  temperatureSymbol="g"
                  averageTempKey="average_temp"
                  lowestTempKey="lowest_temp"
                  highestTempKey="highest_temp"
                />
              </PreviewAltCard>
            </Col>
            <Col md="4">
              <PreviewAltCard
                className="card-full"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TemperatureCard
                  temperatureLoading={false} // Assuming temperature data is loaded
                  temperatureStats={{
                    average_temp: temperatureData.latest
                      ? temperatureData.latest.power
                      : null, // Using latest current_mA as average_temp
                  }}
                  title="Power"
                  temperatureSymbol="watt"
                  averageTempKey="average_temp"
                  lowestTempKey="lowest_temp"
                  highestTempKey="highest_temp"
                />
              </PreviewAltCard>
            </Col>
            <Col md="4">
              <PreviewAltCard
                className="card-full"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TemperatureCard
                  temperatureLoading={false} // Assuming temperature data is loaded
                  temperatureStats={{
                    average_temp: temperatureData.latest
                      ? temperatureData.latest.real_rpm
                      : null, // Using latest current_mA as average_temp
                  }}
                  title="Drone (RPM)"
                  temperatureSymbol="rpm"
                  averageTempKey="average_temp"
                  lowestTempKey="lowest_temp"
                  highestTempKey="highest_temp"
                />
              </PreviewAltCard>
            </Col>
            <Col md="4">
              <PreviewAltCard
                className="card-full"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TemperatureCard
                  temperatureLoading={false} // Assuming temperature data is loaded
                  temperatureStats={{
                    average_temp: temperatureData.latest
                      ? temperatureData.latest.thrust
                      : null, // Using latest current_mA as average_temp
                  }}
                  title="Thrust (Newton)"
                  temperatureSymbol="N"
                  averageTempKey="average_temp"
                  lowestTempKey="lowest_temp"
                  highestTempKey="highest_temp"
                />
              </PreviewAltCard>
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default InvestHomePage;
