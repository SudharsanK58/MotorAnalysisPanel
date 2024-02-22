import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import {
  BlockBetween,
  BlockDes,
  Block,
  BlockContent,
  BlockHead,
  BlockTitle,
  Col,
  Row,  // Make sure to import the Table component
} from "../../../components/Component";
import { Table , Spinner ,Alert} from "reactstrap";
// ... (previous imports)

const PricingTable = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previousUserId, setPreviousUserId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://3.144.9.52:8001/get_data_by_device_id/04:e9:e5:16:f9:f3");
        const data = await response.json();
        const currentUserId = data?.TicketData[0]?.username;
        if (previousUserId && currentUserId !== previousUserId) {
          // Trigger bell sound here
          console.log("New user ID detected. Triggering bell sound...");
          // Play the audio
          const audio = new Audio("/bellSound.mp3");
          audio.play().catch(error => console.error("Error playing audio:", error));
        }
        // Update the previous user ID
        setPreviousUserId(currentUserId);
        setApiData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from API:", error);
        setLoading(false);
      }
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 3 seconds
    }, 3000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [previousUserId]); // Include previousUserId in the dependency array
  
  return (
    <React.Fragment>
      <Head title="APC"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween className="g-3">
            <BlockContent>
              <BlockTitle>Automatic people counter</BlockTitle>
              <BlockDes className="text-soft">
                <p>Below data represents the number of people entered along with validated count</p>
              </BlockDes>
            </BlockContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs"  >
              <div className="pricing-head" style={{ borderBottom: 'none' }}>
                <div className="pricing-title">
                  <h4 className="card-title title">LIVE Count</h4>
                  <p className="sub-text">Status:</p>
                </div>
                <div className="card-text">
                  <Row>
                    <Col size={6}>
                    <span className="h4 fw-500" style={{ fontSize: '70px' }}>{apiData?.TofData?.people_count || "N/A"}</span>
                      <span className="sub-text" style={{ fontSize: '15px' }}>People</span>
                    </Col>
                    <Col size={6}>
                    <span className="h4 fw-500" style={{ fontSize: '70px' }}>{apiData?.TofData?.total_tickets_count || "N/A"}</span>
                      <span className="sub-text" style={{ fontSize: '15px' }}>Tickets</span>
                    </Col>
                  </Row>
                </div>
              </div>
          </Row>
          {loading ? (
              <div className="text-center mt-5">
                <Spinner color="primary" />
              </div>
            ) : (
              <>
                {apiData?.TicketData.length === 0 ? (
                  <div className="text-center mt-5">
                  <Alert className="alert-icon" color="light" style={{ display: 'inline-block', textAlign: 'center' }}>
                    Tickets entries are not available for this device as of now.
                  </Alert>
                  </div>
                ) : (
                  <Table className="text-center mx-auto" style={{ width: '80%', borderRadius: '15px', overflow: 'hidden', tableLayout: 'fixed' }}>
                    <colgroup>
                      <col style={{ width: '25%' }} />
                      <col style={{ width: '25%' }} />
                      <col style={{ width: '25%' }} />
                      <col style={{ width: '25%' }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>User name</th>
                        <th>Ticket ID</th>
                        <th>Count</th>
                        <th>Validated time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiData?.TicketData.map((ticket) => (
                        <tr key={ticket.ticket_id}>
                          <td>{ticket.username}</td>
                          <td>{ticket.ticket_id}</td>
                          <td>{ticket.ticket_count}</td>
                          <td>{ticket.time_after_start}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </>
            )}
        </Block>
      </Content>
      <audio id="audio" loop autoPlay>
        <source src="%PUBLIC_URL%/bellSound.mp3" type="audio/mpeg" />
      </audio>
    </React.Fragment>
  );
};



export default PricingTable;
