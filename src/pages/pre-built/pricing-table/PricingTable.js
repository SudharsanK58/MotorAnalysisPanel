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
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { Table , Spinner ,Alert} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import './binktext.css';
// ... (previous imports)

const PricingTable = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previousUserId, setPreviousUserId] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);
  useEffect(() => {
    // Check if Illgel_count is greater than zero
    if (apiData?.TofData?.Illgel_count > 0) {
      // Start blinking effect
      const intervalId = setInterval(() => {
        setIsBlinking(prevState => !prevState);
      }, 700); // Adjust the interval as needed

      // Cleanup the interval when the component unmounts or when Illgel_count becomes zero
      return () => clearInterval(intervalId);
    } else {
      // Reset blinking when Illgel_count is zero
      setIsBlinking(false);
    }
  }, [apiData?.TofData?.Illgel_count]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://3.144.9.52:8001/get_data_by_device_id/04:e9:e5:16:f6:3d");
        const data = await response.json();
        const currentUserId = data?.TicketData[0]?.ticket_id;
        if (previousUserId && currentUserId !== previousUserId) {
          // Trigger bell sound here
          console.log("New user ID detected. Triggering bell sound...");
          // Play the audio
          const audio = new Audio("/bellSound.mp3");
          toast.success(`${data?.TicketData[0]?.username} has entered!`, {
            position: "top-right",
            autoClose: true,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: false,
          });
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
  const convertToIST = (utcTime) => {
    const utcDate = new Date(utcTime);
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    const istDate = new Date(utcDate.getTime() + istOffset);
    return istDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  const calculateLastSeen = (formattedTimestamp) => {
    const givenTime = new Date(Date.UTC(
      formattedTimestamp.substring(0, 4), // Year
      formattedTimestamp.substring(5, 7) - 1, // Month (zero-based)
      formattedTimestamp.substring(8, 10), // Day
      formattedTimestamp.substring(11, 13), // Hour
      formattedTimestamp.substring(14, 16), // Minute
      formattedTimestamp.substring(17, 19), // Second
      formattedTimestamp.substring(20, 23) // Millisecond
    ));
    const currentTime = new Date(Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
      new Date().getUTCHours(),
      new Date().getUTCMinutes(),
      new Date().getUTCSeconds()
    ));
    const timeDifference = currentTime - givenTime;
    const secondsDifference = Math.floor(timeDifference / 1000);
  
    if (secondsDifference < 60) {
      return (
        <span style={{ fontWeight: 'bold', color: 'green' }}>
          {`${Math.max(1, secondsDifference)} seconds ago`}
        </span>
      );
    } else if (secondsDifference < 600) {
      const minutes = Math.floor(secondsDifference / 60);
      return (
        <span style={{ fontWeight: 'bold', color: 'green' }}>
          {`${minutes} minute${minutes > 1 ? 's' : ''} ago`}
        </span>
      );
    } else if (secondsDifference < 3600) {
      const minutes = Math.floor(secondsDifference / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (secondsDifference < 86400) {
      const hours = Math.floor(secondsDifference / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (secondsDifference < 172800) {
      return "1 day ago";
    } else {
      // If more than one day, return the formatted timestamp without additional formatting
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(formattedTimestamp).toLocaleDateString('en-US', options);
    }
  };
  const formatTimestamp = (timestamp) => {
    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Convert timestamp to Date object
    const dateObj = new Date(timestamp);

    // Add 5 hours and 30 minutes to the timestamp
     // Adjust the timestamp based on the time zone
    if (sessionStorage.getItem("TimeZone") === '1') {
      // Eastern Standard Time (EST)
      dateObj.setHours(dateObj.getHours() - 4, dateObj.getMinutes());
    } else {
      // Indian Standard Time (IST)
      dateObj.setHours(dateObj.getHours() + 5, dateObj.getMinutes() + 30);
    }
    // Format the adjusted timestamp
    const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const formattedTimestamp = dateObj.toLocaleString('en-US', options);

    return formattedTimestamp;
  };
  const textStyle = {
    fontSize: '70px',
    color: apiData?.TofData?.Illgel_count > 0  ? 'red' : 'inherit',
  };
  
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
                  <p className="sub-text">DeviceId: 04:e9:e5:16:f9:f3</p>
                </div>
                <div className="card-text">
                  <Row>
                    <Col size={7}>
                    <span className="h4 fw-500" style={{ fontSize: '70px' }}>{apiData?.TofData?.people_count || "N/A"}</span>
                      <span className="sub-text" style={{ fontSize: '15px' }}>Total entries</span>
                    </Col>
                    {/* <Col size={4}>
                      <span className={`h4 fw-500 ${isBlinking ? 'blink-text' : ''}`} style={textStyle}>
                        {apiData?.TofData?.Illgel_count || "N/A"}
                      </span>
                      <span className="sub-text" style={{ fontSize: '15px' }}>Illgel entries</span>
                    </Col> */}
                    <Col size={3}>
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
                      <col style={{ width: '25%' }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>User name</th>
                        <th>Ticket ID</th>
                        <th>Count</th>
                        <th>Validated time</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiData?.TicketData.map((ticket) => (
                        <tr key={ticket.ticket_id}>
                          <td>{ticket.username}</td>
                          <td>{ticket.ticket_id}</td>
                          <td>{ticket.ticket_count}</td>
                          <td>{formatTimestamp(ticket.time_after_start)}</td>
                          <td>{calculateLastSeen(formatTimestamp(ticket.time_after_start))}</td>
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
      <ToastContainer />
    </React.Fragment>
  );
};



export default PricingTable;
