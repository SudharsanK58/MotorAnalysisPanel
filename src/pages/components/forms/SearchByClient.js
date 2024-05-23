import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import Content from "../../../layout/content/Content";
import {
  Row,
  Col,
  Label,
  Form,
  Spinner,
  Card,
  CardBody,
  Table,
} from "reactstrap";
import Head from "../../../layout/head/Head";
import { Button } from "../../../components/Component";
import { Alert, UncontrolledAlert } from "reactstrap";
import axios from "axios";
import FormValidationComponent from "../../../components/partials/form/FormValidation";
import {
  Block,
  BlockDes,
  PreviewCard,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BackTo,
} from "../../../components/Component";
import BASE_URL from "../../../config";
import { postUserData } from "../../../functionReducer";
const SearchByClient = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date()); // Set today's date as initial state
  const [apiResponse, setApiResponse] = useState(null);
  const [clients, setClients] = useState([]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);
  const [warning, setWarning] = useState(false);
  const [timeZone, setTimeZone] = useState(
    sessionStorage.getItem("TimeZone") || 0
  );
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

  useEffect(() => {
    // Fetch list of clients when component mounts
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/clients`);
        const filteredClients = response.data.filter(
          (client) => client !== "All Client Devices"
        );
        setClients(filteredClients);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clients:", error);
        setLoading(false);
        setNoData(true); // Set noData to true if fetching fails
      }
    };

    fetchClients();
  }, []);

  const formatTimestamp = (timestamp) => {
    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dateObj = new Date(timestamp);
    // Adjust the timestamp based on the time zone
    if (sessionStorage.getItem("TimeZone") === "1") {
      // Eastern Standard Time (EST)
      dateObj.setHours(dateObj.getHours() - 4, dateObj.getMinutes());
    } else {
      // Indian Standard Time (IST)
      dateObj.setHours(dateObj.getHours() + 5, dateObj.getMinutes() + 30);
    }
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    const formattedTimestamp = dateObj.toLocaleString("en-US", options);
    return formattedTimestamp;
  };

  const onButtonClick = async () => {
    setLoading(true);
    setNoData(false);
    setApiResponse(null);
    if (!selectedClient) {
      setWarning(true);
      setLoading(false);
      return;
    }

    try {
      const formattedDate = selectedDate
        ? selectedDate.toLocaleDateString("en-US")
        : "";
      let response;
      if (sessionStorage.getItem("TimeZone") === "1") {
        // Eastern Standard Time (EST)
        response = await axios.get(
          `${BASE_URL}/ticketsbyclientallmac?client_name=${encodeURIComponent(
            selectedClient
          )}&date=${encodeURIComponent(formattedDate)}&timeselect=2`
        );
      } else {
        // Indian Standard Time (IST)
        response = await axios.get(
          `${BASE_URL}/ticketsbyclientallmac?client_name=${encodeURIComponent(
            selectedClient
          )}&date=${encodeURIComponent(formattedDate)}&timeselect=1`
        );
      }
      if (response.data.length === 0) {
        setNoData(true);
      } else {
        setApiResponse(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setLoading(false);
      setNoData(true); // Set noData to true if fetching fails
    }
  };

  return (
    <React.Fragment>
      <Head title="Search-Ticket"></Head>
      <Content page="component">
        <BlockHead size="lg" wide="sm">
          <BlockHeadContent>
            <BlockTitle tag="h2" className="fw-normal">
              MDOT-Validated-Tickets-Search
            </BlockTitle>
            <BlockDes>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "20px",
                  marginTop: "10px",
                }}
              >
                <li>
                  Time represented in this table is in{" "}
                  <strong style={{ color: "blue" }}>
                    {timeZone === "1" ? "Eastern" : "India"} Standard Time (
                    {timeZone === "1" ? "EST" : "IST"})
                  </strong>
                  .
                </li>
                <li>
                  This table shows only{" "}
                  <strong style={{ color: "blue" }}>
                    hardware validated tickets
                  </strong>
                </li>
              </ul>
            </BlockDes>
          </BlockHeadContent>
        </BlockHead>

        <Block size="lg">
          {/* <PreviewCard> */}
          <Row className="g-gs justify-content-center">
            <Col sm="3">
              <div className="form-group">
                <Label>Select validated date</Label>
                <div className="form-control-wrap">
                  <DatePicker
                    selected={selectedDate}
                    className="form-control date-picker"
                    onChange={(date) => setSelectedDate(date)}
                  />
                </div>
                {errors.datePicker && (
                  <span className="error-message">
                    {errors.datePicker.message}
                  </span>
                )}
              </div>
            </Col>
            <Col sm="3">
              <div className="form-group">
                <Label>Client</Label>
                <div className="form-control-wrap">
                  <select
                    {...register("clientId")}
                    className="form-control"
                    onChange={(e) => setSelectedClient(e.target.value)}
                  >
                    <option value="">Select Client</option>
                    {clients.map((client, index) => (
                      <option key={index} value={client}>
                        {client}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.clientId && (
                  <span className="error-message">
                    {errors.clientId.message}
                  </span>
                )}
                {warning && !selectedClient && (
                  <span
                    className="error-message"
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    Please select a client
                  </span>
                )}
              </div>
            </Col>

            <Col md="6">
              <Label className="form-label"></Label>
              <div className="form-group">
                <Button color="primary" size="lg" onClick={onButtonClick}>
                  {loading ? (
                    <>
                      &nbsp; Loading...
                      <Spinner size="sm" color="light" />{" "}
                    </>
                  ) : (
                    "Search Ticket"
                  )}
                </Button>
              </div>
            </Col>
          </Row>
          {/* </PreviewCard> */}
        </Block>
      </Content>
      {noData ? (
        <div className="d-flex flex-column align-items-center mt-3">
          <Alert color="danger">
            <strong>No ticket data</strong>! found for your search .
          </Alert>
        </div>
      ) : apiResponse && apiResponse.length > 0 ? (
        <Card
          className="card-bordered card-preview mx-auto border-0"
          style={{ width: "80%", borderRadius: "10px" }}
        >
          <CardBody>
            <div className="d-flex flex-column align-items-center mt-3">
              <Table className="text-center">
                <thead>
                  <tr>
                    {Object.keys(apiResponse[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {apiResponse.map((item, index) => (
                    <tr key={index}>
                      {Object.entries(item).map(([key, value], index) => (
                        <td key={index}>
                          {key.endsWith("date")
                            ? formatTimestamp(value)
                            : value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      ) : null}
    </React.Fragment>
  );
};
export default SearchByClient;
