import React, { useState , useEffect } from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import InvestOverview from "../components/partials/invest/invest-overview/InvestOverview";
import InvestPlan from "../components/partials/invest/invest-plan/InvestPlan";
import RecentInvest from "../components/partials/invest/recent-investment/RecentInvest";
import RecentActivity from "../components/partials/default/recent-activity/Activity";
import Notifications from "../components/partials/default/notification/Notification";
import { DropdownToggle, Spinner,DropdownMenu, Card, UncontrolledDropdown, DropdownItem, Modal,ModalBody} from "reactstrap";
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
import { BalanceBarChart, DepositBarChart, WithdrawBarChart } from "../components/partials/charts/invest/InvestChart";

const InvestHomePage = () => {
  const [sm, updateSm] = useState(false);
  const [deviceCounts, setDeviceCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ticketsloading, seticketsloading] = useState(true);
  const [ticketCounts, setTicketCounts] = useState({});
  const [temperatureStats, setTemperatureStats] = useState({});
  const [temperatureLoading, setTemperatureLoading] = useState(true);
  const [viewModal, setViewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTemperatureData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/temperature_stats`);
        const data = await response.json();
        setTemperatureStats(data);
        setTemperatureLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching temperature data:', error);
        setTemperatureLoading(false); // Set loading to false in case of an error
      }
    };

    fetchTemperatureData();
  }, []); // Empty dependency array ensures the effect runs once after the initial render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/active_devices_counts`);
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

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/ticket_counts`);
        const data = await response.json();
        setTicketCounts(data);
        seticketsloading(false); // Set loading to false once data is fetched
        // setViewModal(true);
        if (sessionStorage.getItem("ShowUpdate") === '1') {
          // Eastern Standard Time (EST)
          setViewModal(true);
          sessionStorage.setItem("ShowUpdate", 0);
        } else {
          // Indian Standard Time (IST)
          setViewModal(false);
        }
      
      } catch (error) {
        console.error('Error fetching ticket data:', error);
        seticketsloading(false); // Set loading to false in case of an error
      }
    };

    fetchTicketData();
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
                <p>Welcome to ZIG Remote hardware monitoring system.</p>
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
              {loading && (
                <>
                <div className="card-title-group align-start mb-0">
                  <div className="card-title">
                    <h6 className="subtitle">Moving </h6>
                  </div>
                  <div className="card-tools">
                    {/* You can add TooltipComponent here if needed */}
                  </div>
                </div>
                <div className="card-amount">
                  <span className="amount">
                      <>
                        0 Devices
                        <div className="spinner-container" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                          <Spinner color="primary" />
                        </div>
                      </>
                  </span>
                </div>
                <div className="invest-data">
                  <div className="invest-data-amount g-2">
                    <div className="invest-data-history">
                      <div className="title">
                        Last 10 Minutes
                      </div>
                      <span className="amount">
                        0 Devices
                      </span>
                    </div>
                    <div className="invest-data-history">
                      <div className="title">
                        Last 12 Hours
                      </div>
                      <span className="amount">
                        0 Devices
                        {/* You can add a green dot after count.active_devices_12hrs if needed */}
                      </span>
                    </div>
                    <div className="invest-data-history">
                      <div className="title">
                        Last 24 Hours
                      </div>
                      <span className="amount">
                        0 Devices
                        {/* You can add a green dot after count.active_devices_24hrs if needed */}
                      </span>
                    </div>
                  </div>
                </div>
              </>
              
              )}
              {!loading && (
                <>
                  <div className="card-title-group align-start mb-0">
                    <div className="card-title">
                      <h6 className="subtitle">Moving </h6>
                    </div>
                    <div className="card-tools">
                      {/* You can add TooltipComponent here if needed */}
                    </div>
                  </div>
                  <div className="card-amount">
                    <span className="amount">
                      {deviceCounts.length > 0 && (
                        <>
                          <CountUp start={0} end={deviceCounts[0].active_devices_10min} duration={3} delay={0} /> Devices
                          <Icon style={{ color: "#7df887", marginLeft: "9px" ,fontSize: "14px"}} name="circle-fill"></Icon>
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
                                <CountUp start={0} end={count.active_devices_10min} duration={3} delay={0} /> Devices
                              </>
                            ) : index === 1 ? (
                              <>
                                <CountUp start={0} end={count.active_devices_12hrs} duration={3} delay={0} /> Devices
                                {/* You can add a green dot after count.active_devices_12hrs if needed */}
                              </>
                            ) : (
                              <>
                                <CountUp start={0} end={count.active_devices_24hrs} duration={3} delay={0} /> Devices
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
            <PreviewAltCard className="card-full" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* <div className="dummy-space" style={{ height: ticketsloading ? '20px' : '0', width: '100%' }}></div> */}
      {ticketsloading && (
        <>
          <div className="card-title-group align-start mb-0">
            <div className="card-title">
            <h6 className="subtitle">Validated tickets</h6>
            </div>
            <div className="card-tools">
              {/* You can add TooltipComponent here if needed */}
            </div>
          </div>
          <div className="card-amount">
            <span className="amount">
              0 Tickets
              <div className="spinner-container" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Spinner color="primary" />
              </div>
            </span>
          </div>
          <div className="invest-data">
            <div className="invest-data-amount g-2">
              <div className="invest-data-history">
                <div className="title">Last 24 Hrs</div>
                <span className="amount">
                0 Tickets
                </span>
              </div>
              <div className="invest-data-history">
                <div className="title">This Week</div>
                <span className="amount">
                  0 Tickets
                </span>
              </div>
            </div>
          </div>
        </>
      )}
      {!ticketsloading && (
        <>
          <div className="card-title-group align-start mb-0">
            <div className="card-title">
            <h6 className="subtitle">Validated tickets</h6>
            </div>
            <div className="card-tools">
              {/* You can add TooltipComponent here if needed */}
            </div>
          </div>
          <div className="card-amount">
            <span className="amount">
              <CountUp start={0} end={ticketCounts.total_unique_ticket_count} duration={7} delay={0} /> Tickets
              <Icon style={{ color: "#0400ff", marginLeft: "9px" ,fontSize: "22px" }} name="ticket-alt"></Icon>
            </span>
          </div>
          <div className="invest-data">
            <div className="invest-data-amount g-2">
              <div className="invest-data-history">
                <div className="title">Last 24 Hrs</div>
                <span className="amount">
                <CountUp start={0} end={ticketCounts.last_24hrs_unique_ticket_count} duration={3} delay={0} /> Tickets
                </span>
              </div>
              <div className="invest-data-history">
                <div className="title">This Week</div>
                <span className="amount">
                <CountUp start={0} end={ticketCounts.last_week_unique_ticket_count  } duration={3} delay={0} /> Tickets
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </PreviewAltCard>
            </Col>

            <Col md="4">
            <PreviewAltCard className="card-full" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {temperatureLoading && (
         <>
         <div className="card-title-group align-start mb-0">
           <div className="card-title">
             <h6 className="subtitle">Temperature Stats</h6>
           </div>
           <div className="card-tools">
             {/* You can add TooltipComponent here if needed */}
           </div>
         </div>
         <div className="card-amount">
           <span className="amount">
             Average: 0 °C
             <div className="spinner-container" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Spinner color="primary" />
              </div>
           </span>
         </div>
         <div className="invest-data">
           <div className="invest-data-amount g-2">
             <div className="invest-data-history">
               <div className="title">Lowest</div>
               <span className="amount">
                 0 °C
               </span>
             </div>
             <div className="invest-data-history">
               <div className="title">Highest</div>
               <span className="amount">
                 0 °C
               </span>
             </div>
           </div>
         </div>
       </>
      )}
      {!temperatureLoading && (
        <>
          <div className="card-title-group align-start mb-0">
            <div className="card-title">
              <h6 className="subtitle">Temperature Stats</h6>
            </div>
            <div className="card-tools">
              {/* You can add TooltipComponent here if needed */}
            </div>
          </div>
          <div className="card-amount">
            <span className="amount">
              Average: <CountUp start={0} end={temperatureStats.average_temp.toFixed(2)} decimals={2} duration={7} delay={0} /> °C
              <Icon style={{ color: "#ff0000", marginLeft: "9px" ,fontSize: "22px"  }} name="cpu"></Icon>
            </span>
          </div>
          <div className="invest-data">
            <div className="invest-data-amount g-2">
              <div className="invest-data-history">
                <div className="title">Lowest</div>
                <span className="amount">
                  <CountUp start={0} end={temperatureStats.lowest_temp.toFixed(2)} decimals={2} duration={3} delay={0} /> °C
                </span>
              </div>
              <div className="invest-data-history">
                <div className="title">Highest</div>
                <span className="amount">
                  <CountUp start={0} end={temperatureStats.highest_temp.toFixed(2)} decimals={2} duration={3} delay={0} /> °C
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </PreviewAltCard>
            </Col>

            <Col md="6" xxl="4">
            <PreviewAltCard className="h-100" bodyClass="h-100 stretch flex-column">
                {/* <SessionDevice /> */}
                <RecentActivity/>
              </PreviewAltCard>
            </Col>

            <Col md="6" xxl="4">
              <InvestPlan />
            </Col>
          </Row>
        </Block>
      </Content>
      <Modal isOpen={viewModal} toggle={() => setViewModal(false)} className="modal-dialog-centered" size="lg">
      <ModalBody>
        <a href="#cancel" onClick={(ev) => { ev.preventDefault(); setViewModal(false); }} className="close">
          <Icon name="cross-sm" />
        </a>
        <div className="nk-modal-head">
          <h4 className="nk-modal-title title">What's New <small className="text-primary">Version 2.05</small></h4>
        </div>
        <div style={{ marginBottom: '10px' }}></div>
        <p>
          * Now we can search app benchmark data device by username.<br/>
          * Added app benchmark data analytics ~ Beta Version.<br/>
        </p>
      </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default InvestHomePage;
