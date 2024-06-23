import React, { useState, useEffect } from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import AudienceOverview from "../components/partials/analytics/audience-overview/AudienceOverview";
import ActiveUser from "../components/partials/analytics/active-user/ActiveUser";
import WebsitePerformance from "../components/partials/analytics/website-perfomance/WebsitePerfomance";
import TrafficChannel from "../components/partials/analytics/traffic-channel/Traffic";
import TrafficDougnut from "../components/partials/analytics/traffic-dougnut/TrafficDoughnut";
import UserMap from "../components/partials/analytics/user-map/UserMap";
import BrowserUser from "../components/partials/analytics/browser-users/BrowserUser";
import PageViewer from "../components/partials/analytics/page-view/PageView";
import SessionDevice from "../components/partials/analytics/session-devices/SessionDevice";
import FeetVsTimeTaken from "../components/partials/analytics/audience-overview/FeetVsTimeTaken";
import TicketsCirclePacking from "../components/partials/analytics/traffic-dougnut/TicketsCirclePacking";
import {
  DropdownToggle,
  DropdownMenu,
  Card,
  UncontrolledDropdown,
  DropdownItem,
} from "reactstrap";
import {
  Block,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  PreviewAltCard,
} from "../components/Component";
import DatePicker from "react-datepicker";
import ApiGraphIos from "../components/partials/analytics/audience-overview/ApiGraphIos";
import IosVsAndroidTime from "../components/partials/analytics/audience-overview/IosVsAndroidTime";
import { postUserData } from "../functionReducer";

const AnalyticsHomePage = () => {
  useEffect(() => {
    // Call the postUserData function only once when the component mounts
    postUserData()
      .then(() => {
        console.log("User data posted successfully");
      })
      .catch((error) => {
        console.error("Failed to post user data:", error);
      });
  }, []); // Empty dependency array ensures this runs only once
  const [sm, updateSm] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  return (
    <React.Fragment>
      <Head title="Analytics Dashboard" />
      <Content>
        <BlockHead size="sm">
          <div className="nk-block-between">
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Drone Analytics
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Welcome to Analytics Dashboard.</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent></BlockHeadContent>
          </div>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col sm="6" lg="6">
              <div style={{ height: 500 }}>
                <PreviewAltCard
                  className="h-100"
                  bodyClass="h-100 stretch flex-column"
                >
                  <AudienceOverview />
                </PreviewAltCard>
              </div>
            </Col>
            <Col sm="6" lg="6">
              <div style={{ height: 500 }}>
                <PreviewAltCard
                  className="h-100"
                  bodyClass="h-100 stretch flex-column"
                >
                  <ApiGraphIos />
                </PreviewAltCard>
              </div>
            </Col>
            <Col lg="20">
              <div style={{ height: 500 }}>
                <PreviewAltCard
                  className="h-100"
                  bodyClass="h-100 stretch flex-column"
                >
                  <IosVsAndroidTime />
                </PreviewAltCard>
              </div>
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default AnalyticsHomePage;
