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
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get_motor_data`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTemperatureData(data);
        setHasAnimated(true);
        setLoading(false); // Set loading to false once data is fetched
        set;
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
  const lowestAmbientC = temperatureData.lowest
    ? temperatureData.lowest.ambient_C
    : null;
  const highestAmbientC = temperatureData.highest
    ? temperatureData.highest.ambient_C
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
              Live: 0 {temperatureSymbol}
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
              Live:{" "}
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
        <div className="invest-data">
          <div className="invest-data-amount g-2">
            <div className="invest-data-history">
              <div className="title">Lowest</div>
              <span className="amount">
                {temperatureLoading ? (
                  "0 °C"
                ) : hasAnimated ? (
                  <span>{temperatureStats[lowestTempKey].toFixed(2)}</span>
                ) : (
                  <CountUp
                    start={0}
                    end={temperatureStats[lowestTempKey].toFixed(2)}
                    decimals={2}
                    duration={3}
                    delay={0}
                    onComplete={() => setHasAnimated(true)}
                  />
                )}{" "}
                {temperatureSymbol}
              </span>
            </div>
            <div className="invest-data-history">
              <div className="title">Highest</div>
              <span className="amount">
                {temperatureLoading ? (
                  "0 °C"
                ) : hasAnimated ? (
                  <span>{temperatureStats[highestTempKey].toFixed(2)}</span>
                ) : (
                  <CountUp
                    start={0}
                    end={temperatureStats[highestTempKey].toFixed(2)}
                    decimals={2}
                    duration={3}
                    delay={0}
                    onComplete={() => setHasAnimated(true)}
                  />
                )}{" "}
                {temperatureSymbol}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <React.Fragment>
      <Head title="ZIG Dashboard" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Dashboard</BlockTitle>
              <BlockDes className="text-soft">
                <p>Welcome to DroneThrust Analyzer .</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent></BlockHeadContent>
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
                    lowest_temp: lowestAmbientC, // Using lowest ambient_C as lowest_temp
                    highest_temp: highestAmbientC, // Using highest ambient_C as highest_temp
                  }}
                  title="Ambient Temperature Stats (°C)"
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
                      ? temperatureData.latest.ambient_F
                      : null, // Using latest ambient_F as average_temp
                    lowest_temp: temperatureData.lowest
                      ? temperatureData.lowest.ambient_F
                      : null, // Using lowest ambient_F as lowest_temp
                    highest_temp: temperatureData.highest
                      ? temperatureData.highest.ambient_F
                      : null, // Using highest ambient_F as highest_temp
                  }}
                  title="Ambient Temperature Stats (°F)"
                  temperatureSymbol="°F"
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
                      ? temperatureData.latest.object_F
                      : null, // Using latest object_F as average_temp
                    lowest_temp: temperatureData.lowest
                      ? temperatureData.lowest.object_F
                      : null, // Using lowest object_F as lowest_temp
                    highest_temp: temperatureData.highest
                      ? temperatureData.highest.object_F
                      : null, // Using highest object_F as highest_temp
                  }}
                  title="Object Temperature Stats (°F)"
                  temperatureSymbol="°F"
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
                      ? temperatureData.latest.object_C
                      : null, // Using latest object_F as average_temp
                    lowest_temp: temperatureData.lowest
                      ? temperatureData.lowest.object_C
                      : null, // Using lowest object_F as lowest_temp
                    highest_temp: temperatureData.highest
                      ? temperatureData.highest.object_C
                      : null, // Using highest object_F as highest_temp
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
                    lowest_temp: temperatureData.lowest
                      ? temperatureData.lowest.busvoltage
                      : null, // Using lowest busvoltage as lowest_temp
                    highest_temp: temperatureData.highest
                      ? temperatureData.highest.busvoltage
                      : null, // Using highest busvoltage as highest_temp
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
                      ? temperatureData.latest.shuntvoltage
                      : null, // Using latest shuntvoltage as average_temp
                    lowest_temp: temperatureData.lowest
                      ? temperatureData.lowest.shuntvoltage
                      : null, // Using lowest shuntvoltage as lowest_temp
                    highest_temp: temperatureData.highest
                      ? temperatureData.highest.shuntvoltage
                      : null, // Using highest shuntvoltage as highest_temp
                  }}
                  title="Shunt Voltage Stats"
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
                    lowest_temp: temperatureData.lowest
                      ? temperatureData.lowest.current_mA
                      : null, // Using lowest current_mA as lowest_temp
                    highest_temp: temperatureData.highest
                      ? temperatureData.highest.current_mA
                      : null, // Using highest current_mA as highest_temp
                  }}
                  title="Current Stats"
                  temperatureSymbol="mA"
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
