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
const TicketBenchMark = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previousTicketID, setPreviousTicketID] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://3.144.9.52:8001/benchmark_ticket/");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setApiData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        toast.error("Failed to fetch data");
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (apiData.length > 0 && apiData[0].ticketID !== previousTicketID) {
      setPreviousTicketID(apiData[0].ticketID);
      playBellSound();
    }
  }, [apiData]);

  const playBellSound = () => {
    const audio = new Audio("/bellSound.mp3");
    toast.success(`${apiData[0]?.userName} took ${apiData[0]?.timeTaken} to validate!`, {
      position: "top-right",
      autoClose: true,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: false,
    });
    audio.play().catch(error => console.error("Error playing audio:", error));
  };
  const formatTimestamp = (timestamp) => {
    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Convert timestamp to Date object
    const dateObj = new Date(timestamp);

    // Add 5 hours and 30 minutes to the timestamp
    dateObj.setHours(dateObj.getHours() + 5, dateObj.getMinutes() + 30);

    // Format the adjusted timestamp
    const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const formattedTimestamp = dateObj.toLocaleString('en-US', options);

    return formattedTimestamp;
  };

  return (
    <React.Fragment>
      <Head title="BENCHMARK"></Head>
      <Content>
      <BlockHead size="sm">
        <BlockBetween className="g-3">
          <BlockContent>
            <BlockTitle>Ticketing Benchmark</BlockTitle>
            <BlockDes className="text-soft">
              <p>
              <ol style={{ color: 'blue', paddingLeft: '20px', margin: '0' }}>
                  <li style={{ color: 'black' }}>1.Below table is in <strong>Indian standard format</strong>.</li>
                  <li style={{ color: 'black' }}>2.The time taken is when a person enters TOF range to data received in MQTT, <strong>excluding validator beep sound</strong>.</li>
                  <li style={{ color: 'black' }}>3.If ticket is not updated here but validated on device, it means the ticket is validated out of TOF range.</li>
                  <li style={{ color: 'black' }}>4.Do not manually reload this page. If a ticket is validated, the data will be <strong>updated every 5 seconds</strong>.</li>
                </ol>
              </p>
            </BlockDes>
          </BlockContent>
        </BlockBetween>
      </BlockHead>

      <Table className="text-center mx-auto" style={{ width: '80%', borderRadius: '15px', overflow: 'hidden', tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Device ID</th>
            <th>User Name</th>
            <th>Ticket ID</th>
            <th>Time Taken</th>
            <th>Validation Time</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center">
                <Spinner color="primary" />
              </td>
            </tr>
          ) : (
            apiData.map((item, index) => (
              <tr key={index}>
                <td>{item.deviceID}</td>
                <td>{item.userName}</td>
                <td>{item.ticketID}</td>
                <td>
                  <span style={{ fontWeight: 'bold', color: 'blue' }}>{item.timeTaken}</span>
                </td>
                <td>{formatTimestamp(item.validationTime)}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      </Content>
      <ToastContainer />
    </React.Fragment>
  );
};

export default TicketBenchMark;
