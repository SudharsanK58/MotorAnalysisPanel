import React, { useState } from "react";
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
import { DropdownToggle, DropdownMenu, Card, UncontrolledDropdown, DropdownItem } from "reactstrap";
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



const AnalyticsHomePage = () => {
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
                Valdiation Analytics ~ (beta version)
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Welcome to Valdiation Analytics Dashboard.</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                <ul className="nk-block-tools g-3">
                  {/* Set the fontSize to match DatePicker */}
                  <Icon className="d-none d-sm-inline" name="calender-date" style={{ fontSize: "2.50em" }}></Icon>
                  <DatePicker
                    selected={startDate}
                    className="form-control date-picker"
                    onChange={(date) => setStartDate(date)} // Handle date change
                  />
                </ul>
                </div>
              </div>
            </BlockHeadContent>
          </div>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            
          <Col sm="6" lg="4">
              <PreviewAltCard className="h-100" bodyClass="h-100 stretch flex-column">
                <div style={{ height: 400 }}>
                <SessionDevice startDate={startDate} />
                </div>
              </PreviewAltCard>
            </Col>
            <Col sm="6" lg="4">
            <PreviewAltCard className="h-100" bodyClass="h-100 stretch flex-column">
                <TrafficDougnut startDate={startDate} />
              </PreviewAltCard>
            </Col>
            <Col sm="6" lg="4">
            <PreviewAltCard className="h-100" bodyClass="h-100 stretch flex-column">
                <TicketsCirclePacking startDate={startDate} />
              </PreviewAltCard>
            </Col>
            <Col sm="6" lg="6">
            <div style={{ height: 500 }}>
            <PreviewAltCard className="h-100" bodyClass="h-100 stretch flex-column">
              <AudienceOverview startDate={startDate} />
            </PreviewAltCard>
            </div>
            </Col>
            <Col sm="6" lg="6">
            <div style={{ height: 500 }}>
            <PreviewAltCard className="h-100" bodyClass="h-100 stretch flex-column">
              <ApiGraphIos startDate={startDate} />
            </PreviewAltCard>
            </div>
            </Col>
            <Col lg="20">
            <div style={{ height: 500 }}>
            <PreviewAltCard className="h-100" bodyClass="h-100 stretch flex-column">
            <FeetVsTimeTaken startDate={startDate} />
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
