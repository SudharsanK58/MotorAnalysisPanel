import React, { useState , useEffect } from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import InvestOverview from "../components/partials/invest/invest-overview/InvestOverview";
import InvestPlan from "../components/partials/invest/invest-plan/InvestPlan";
import RecentInvest from "../components/partials/invest/recent-investment/RecentInvest";
import RecentActivity from "../components/partials/default/recent-activity/Activity";
import Notifications from "../components/partials/default/notification/Notification";
import { DropdownToggle, Spinner,DropdownMenu, Card, UncontrolledDropdown, DropdownItem } from "reactstrap";
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
import { BalanceBarChart, DepositBarChart, WithdrawBarChart } from "../components/partials/charts/invest/InvestChart";

const InvestHomePage = () => {
  const [sm, updateSm] = useState(false);
  const [deviceCounts, setDeviceCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://3.144.9.52:8001/active_devices_counts');
        const data = await response.json();
        setDeviceCounts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <React.Fragment>
      <Head title="ZIG Dashboard" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Dashboard</BlockTitle>
              <BlockDes className="text-soft">
                <p>Welcome to ZIG Remote management system.</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col md="4">
            <PreviewAltCard className="card-full" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="dummy-space" style={{ height: loading ? '20px' : '0', width: '100%' }}></div>
      {loading && (
        <div className="spinner-container" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Spinner color="primary" />
        </div>
      )}
      {!loading && (
        <>
          <div className="card-title-group align-start mb-0">
            <div className="card-title">
              <h6 className="subtitle">Online devices</h6>
            </div>
            <div className="card-tools">
              {/* You can add TooltipComponent here if needed */}
            </div>
          </div>
          <div className="card-amount">
            <span className="amount">
              {deviceCounts.length > 0 && (
                <>
                  {deviceCounts[0].active_devices_10min} Devices
                  <span className="green-dot"></span>
                </>
              )}
            </span>
          </div>
          <div className="invest-data">
            <div className="invest-data-amount g-2">
              {deviceCounts.map((count, index) => (
                <div key={index} className="invest-data-history">
                  <div className="title">
                    {index === 0 ? 'Last 10 Minutes' : index === 1 ? 'Last 12 Hours' : 'Last 24 Hours'}
                  </div>
                  <span className="amount">
                    {index === 0 ? (
                      <>
                        {count.active_devices_10min} Devices
                        <span className="green-dot"></span>
                      </>
                    ) : index === 1 ? (
                      <>
                        {count.active_devices_12hrs} Devices
                        {/* You can add a green dot after count.active_devices_12hrs if needed */}
                      </>
                    ) : (
                      <>
                        {count.active_devices_24hrs} Devices
                        {/* You can add a green dot after count.active_devices_24hrs if needed */}
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </PreviewAltCard>
            </Col>

            <Col md="4">
              <PreviewAltCard className="card-full">
                <div className="card-title-group align-start mb-0">
                  <div className="card-title">
                    <h6 className="subtitle">Total Withdraw</h6>
                  </div>
                  <div className="card-tools">
                    <TooltipComponent
                      iconClass="card-hint"
                      icon="help-fill"
                      direction="left"
                      id="invest-withdraw"
                      text="Total Withdrawn"
                    ></TooltipComponent>
                  </div>
                </div>
                <div className="card-amount">
                  <span className="amount">
                    49,595.34 <span className="currency currency-usd">USD</span>
                  </span>
                  <span className="change down text-danger">
                    <Icon name="arrow-long-down"></Icon>1.93%
                  </span>
                </div>
                <div className="invest-data">
                  <div className="invest-data-amount g-2">
                    <div className="invest-data-history">
                      <div className="title">This Month</div>
                      <div className="amount">
                        2,940.59 <span className="currency currency-usd">USD</span>
                      </div>
                    </div>
                    <div className="invest-data-history">
                      <div className="title">This Week</div>
                      <div className="amount">
                        1,259.28 <span className="currency currency-usd">USD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </PreviewAltCard>
            </Col>

            <Col md="4">
              <PreviewAltCard className="card-full">
                <div className="card-title-group align-start mb-0">
                  <div className="card-title">
                    <h6 className="subtitle">Balance in Account</h6>
                  </div>
                  <div className="card-tools">
                    <TooltipComponent
                      iconClass="card-hint"
                      icon="help-fill"
                      direction="left"
                      id="invest-balance"
                      text="Total Balance"
                    ></TooltipComponent>
                  </div>
                </div>
                <div className="card-amount">
                  <span className="amount">
                    79,358.50 <span className="currency currency-usd">USD</span>
                  </span>
                </div>
                <div className="invest-data">
                  <div className="invest-data-amount g-2">
                    <div className="invest-data-history">
                      <div className="title">This Month</div>
                      <div className="amount">
                        2,940.59 <span className="currency currency-usd">USD</span>
                      </div>
                    </div>
                    <div className="invest-data-history">
                      <div className="title">This Week</div>
                      <div className="amount">
                        1,259.28 <span className="currency currency-usd">USD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </PreviewAltCard>
            </Col>

            <Col md="6" xxl="4">
              <PreviewAltCard className="card-full">
                <InvestOverview />
              </PreviewAltCard>
            </Col>

            <Col md="6" xxl="4">
              <InvestPlan />
            </Col>

            {/* <Col md="6" xxl="4">
              <Card className="card-bordered card-full">
                <RecentActivity />
              </Card>
            </Col>
            <Col md="6" xxl="4">
              <Card className="card-bordered h-100">
                <Notifications />
              </Card>
            </Col>
            <Col xl="12" xxl="8">
              <Card className="card-bordered card-full">
                <RecentInvest />
              </Card>
            </Col> */}
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default InvestHomePage;
