import React, { useState, useEffect } from "react";
import {Icon} from "../../../components/Component";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import Content from "../../../layout/content/Content";
import { Row, Col, Label, Form,Spinner, Card, CardBody, Table,  Modal,ModalBody } from "reactstrap";
import Head from "../../../layout/head/Head";
import { Button,TooltipComponent } from "../../../components/Component";
import { Alert,Badge,UncontrolledAlert } from "reactstrap";
import axios from "axios";
import BASE_URL from "../../../config";
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

const AppBenchMarkTicketSearch = () => {
  const { register, handleSubmit, setValue, watch, setError, clearErrors, formState: { errors } } = useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isTicketIdSelected, setTicketIdSelected] = useState(false);
  const [isdeviceIdSelected, setdeviceIdSelected] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [noData, setnoData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail, setDetail] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Set the default value for the "searchByTicketID" checkbox
  useEffect(() => {
    setValue("searchByTicketID", true);
    setTicketIdSelected(true);
    setValue("labelText", "Search by Ticket ID");
  }, [setValue]);
  const onButtonClick = async () => {
    setApiResponse(null)
    const ticketIdInput = watch("textInput"); // Get the Ticket ID from the input field
    const datePickerDate = watch("datePicker");
    if(isTicketIdSelected && !ticketIdInput){
      setError("textInput", {
        type: "manual",
        message: "*Required.",
      });
      return;
    } else  if (isdeviceIdSelected) {
      if(!ticketIdInput){
        setError("textInput", {
          type: "manual",
          message: "*Required.",
        });
        return;
      }else if(!selectedDate){
        setError("datePicker", {
          type: "manual",
          message: "*Required.",
        });
        return;
      }
    }else if(isDateSelected && !selectedDate){
      setError("datePicker", {
        type: "manual",
        message: "*Required.",
      });
      return;
    }
    else{
      clearErrors("textInput");
    }
    if(isTicketIdSelected){
      try {
        setLoading(true);
        setnoData(false);
        // Make an API request using axios (replace with fetch if you prefer)
        const response = await axios.get(`${BASE_URL}/app_benchmark_search_ticket/${ticketIdInput}`);

        // Handle the API response as needed
        console.log("API Response:", response.data);
        setApiResponse(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setnoData(true);
        // Handle errors
        console.error("API Error:", error);
      }
    }else if(isdeviceIdSelected){
      try {
        setLoading(true);
        setnoData(false);
        const formattedDate = selectedDate ? new Date(selectedDate).toLocaleDateString('en-US') : '';
        const response = await axios.get(`${BASE_URL}/app_benchmark_device_date`, {
          params: {
            device_id: ticketIdInput,
            date: formattedDate,
          },
        });
        // Set the API response in the state
        setApiResponse(response.data);
        console.log("API Response:", response.data);
        setApiResponse(response.data);
        setLoading(false);
      } catch (error) {
        // Handle errors
        console.error("API Error:", error);
        setLoading(false);
        setnoData(true);
      }
    }
    else if(isDateSelected){
      try {
        setLoading(true);
        setnoData(false);
        const formattedDate = selectedDate ? new Date(selectedDate).toLocaleDateString('en-US') : '';
        const response = await axios.get(`${BASE_URL}/latest_app_benchmark`, {
          params: {
            date: formattedDate,
          },
        });
        // Set the API response in the state
        setApiResponse(response.data);
        console.log("API Response:", response.data);
        setApiResponse(response.data);
        setLoading(false);
      } catch (error) {
        // Handle errors
        console.error("API Error:", error);
        setLoading(false);
        setnoData(true);
      }
    }
  };
  const renderTable = () => {
    if (apiResponse && apiResponse.length > 0) {
      return (
        <Card className="card-bordered card-preview mx-auto border-0" style={{ width: '80%', borderRadius: '10px' }}>
          <CardBody>
            <div className="d-flex flex-column align-items-center mt-3">
              <Table className="text-center">
                <thead>
                  <tr>
                    <th>Hardware</th>
                    <th>User name</th>
                    <th>App Name</th>
                    <th>Ticket ID</th>
                    <th>Time taken</th>
                    <th>ValidationMode</th>
                    <th>Validated date</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                {apiResponse.map((item, index) => (
                  <tr key={index}>
                    <td>{item.hardware ? <Icon name="apple" style={{ fontSize: '24px' }} /> : <Icon name="android" style={{ fontSize: '24px' }} />}</td>
                    <td>{item.userName}</td>
                    <td>{item.appName}</td>
                    <td>{item.ticketId}</td>
                    <td>
                      <span style={{ fontWeight: 'bold', color: 'blue' }}>
                        {item.timeTaken < 1000 ? `${item.timeTaken} ms` : `${(item.timeTaken / 1000).toFixed(1)} secs`}
                      </span>
                    </td>
                    <td>{item.validationMode ? <Badge color="primary">Pocket mode</Badge> : <Badge color="secondary">Foreground</Badge>}</td>
                    <td>{formatTimestamp(item.ValidatedDate)}</td>
                    <td>
                    <Button onClick={() => handleViewAction(item.ticketId)}>
                      <Icon name="eye-fill" style={{ fontSize: '24px' }} />
                    </Button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      );
    } else {
      return null;
    }
  };
  const formatTimestamp = (timestamp) => {
    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Convert timestamp to Date object
    const dateObj = new Date(timestamp);
  
     // Adjust the timestamp based on the time zone
    if (sessionStorage.getItem("TimeZone") === '1') {
      // Eastern Standard Time (EST)
      dateObj.setHours(dateObj.getHours() - 4, dateObj.getMinutes());
    } else {
      // Indian Standard Time (IST)
      dateObj.setHours(dateObj.getHours() + 5, dateObj.getMinutes() + 30);
    }
  
    // Format the adjusted timestamp
    const options = { 
      day: '2-digit', 
      month: 'short', // Use 'short' for abbreviated month name
      year: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric', 
      hour12: true 
    };
    const formattedTimestamp = dateObj.toLocaleString('en-US', options);
  
    return formattedTimestamp;
  };

  const handleCheckboxChange = (checkboxName) => {
    // Unselect other checkboxes when one is selected
    ["searchByTicketID", "searchByDeviceID", "searchBydate"].forEach((name) => {
      if (name !== checkboxName) {
        setValue(name, false);
      }
    });

   

    // Update the label text and date selection based on the selected checkbox
    switch (checkboxName) {
      case "searchByTicketID":
        setValue("labelText", "Search by Ticket ID");
        setIsDateSelected(false);
        setTicketIdSelected(true);
        setdeviceIdSelected(false);
        clearErrors("textInput");
        break;
      case "searchByDeviceID":
        setValue("labelText", "Search by Device ID");
        setIsDateSelected(false);
        setTicketIdSelected(false);
        setdeviceIdSelected(true);
        clearErrors("textInput");
        break;
      case "searchBydate":
        setValue("labelText", "*");
        setIsDateSelected(true);
        setTicketIdSelected(false);
        setdeviceIdSelected(false);
        clearErrors("textInput");
        break;
      default:
        setValue("labelText", "");
        setIsDateSelected(false);
        setTicketIdSelected(false);
        setdeviceIdSelected(false);
        break;
    }
  };
// Function to handle API call
const handleViewAction = async (ticketId) => {
  try {
    setIsLoading(true); // Set loading state to true when API starts loading
    setViewModal(true);
    const response = await axios.get(`${BASE_URL}/app_benchmark_ticket_details/${ticketId}`);
    console.log("Ticket Details:", response.data);
    setDetail(response.data); // Set the fetched data to the detail state
    setIsLoading(false); // Set loading state to false when API finishes loading
 // Open the modal after loading the data
  } catch (error) {
    console.error("Error fetching ticket details:", error);
    setIsLoading(false); // Set loading state to false if there's an error
  }
};

const getLabel = watch("labelText") || "Ticket ID";

// ... rest of your component remains unchanged
  return (
    <React.Fragment>
      <Head title="Benchmark-Search-Ticket"></Head>
      <Content page="component">
        <BlockHead size="lg" wide="sm">
          <BlockHeadContent>
            {/* <BackTo link="/overview" icon="arrow-left">
              Dashboard
            </BackTo> */}
            <BlockTitle tag="h2" className="fw-normal">
              Zig Travel Places
            </BlockTitle>
            <BlockDes>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
              <li>Time represented in this table is in <strong style={{ color: 'blue' }}>India Standard Time (IST)</strong>.</li>
              <li>This table shows only <strong style={{ color: 'blue' }}>hardware validated tickets</strong></li>
            </ul>
            
            </BlockDes>
          </BlockHeadContent>
        </BlockHead>

        <Block size="lg">
          {/* <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Validation - Regular Style</BlockTitle>
              <BlockDes>
                <p>Below example helps you to build your own form nice way.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead> */}
          <PreviewCard>
            
          <Row className="g-gs">
          <Col md="6">
            <div className="form-group">
              <Label className="form-label"></Label>
              <ul className="custom-control-group g-3 align-center">
                <li>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="form-control custom-control-input"
                      id={"fv-search-ticket-id"}
                      {...register("searchByTicketID")}
                      value="ticketId"
                      onChange={() => handleCheckboxChange("searchByTicketID")}
                    />
                    <Label className="custom-control-label" htmlFor={"fv-search-ticket-id"}>
                      Ticket ID
                    </Label>
                  </div>
                </li>
                {/* <li>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="form-control custom-control-input"
                      id={"fv-search-device-id"}
                      {...register("searchByDeviceID")}
                      value="deviceId"
                      onChange={() => handleCheckboxChange("searchByDeviceID")}
                    />
                    <Label className="custom-control-label" htmlFor={"fv-search-device-id"}>
                      Device ID
                    </Label>
                  </div>
                </li> */}
                <li>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="form-control custom-control-input"
                      id={"fv-search-date"}
                      {...register("searchBydate")}
                      value="date"
                      onChange={() => handleCheckboxChange("searchBydate")}
                    />
                    <Label className="custom-control-label" htmlFor={"fv-search-date"}>
                      Date
                    </Label>
                  </div>
                </li>
              </ul>
            </div>
          </Col>

          {/* Datepicker */}
          <Col sm="6">
            <div className="form-group">
              <Label>Select validated date</Label>
              <div className="form-control-wrap">
                <DatePicker
                  selected={selectedDate}
                  className="form-control date-picker"
                  onChange={(date) => setSelectedDate(date)}
                  disabled={isTicketIdSelected}
                />
              </div>
              {errors.datePicker && <span className="error-message">{errors.datePicker.message}</span>}
            </div>
          </Col>
          <Col sm="6">
            <div className="form-group">
              <Label>{getLabel}</Label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  {...register("textInput")}
                  className="form-control"
                  disabled={isDateSelected}
                />
              </div>
              {errors.textInput && <span className="error-message" >{errors.textInput.message}</span>}
            </div>
          </Col>

          <Col md="6">
            <Label className="form-label"></Label>
            <div className="form-group">
            <Button color="primary" size="lg" onClick={onButtonClick}>
            {loading ? <>&nbsp; Loading...<Spinner size="sm" color="light" /> </> : "Search Ticket"}
              </Button>
            </div>
          </Col>
        </Row>
          </PreviewCard>
        </Block>
      </Content>
      {noData ? (
        <div className="d-flex flex-column align-items-center mt-3" >
            <Alert color="danger">
              <strong>No ticket data</strong>! found for your search .
            </Alert>
        </div>
) : (
  apiResponse && apiResponse.length > 0 ? (
    renderTable()
  ) : null
)}
      <Modal isOpen={viewModal} toggle={() => setViewModal(false)} className="modal-dialog-centered" size="lg">
        <ModalBody>
          <a href="#cancel" onClick={(ev) => { ev.preventDefault(); setViewModal(false); }} className="close">
            <Icon name="cross-sm" />
          </a>
          <div className="nk-modal-head">
            <h4 className="nk-modal-title title">Validation Details <small className="text-primary">{detail.id}</small></h4>
          </div>
          {isLoading ? (
            <div className="text-center mt-3">
              <Spinner color="primary" />
            </div>
          ) : (
            <div className="nk-tnx-details mt-sm-3">
              <Row className="gy-3">
                {/* Filtering out only the "User ID" and its corresponding value */}
                <Col lg={6}>
                  <span className="sub-text">User ID</span>
                  <span className="caption-text text-break">{detail.userId}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">User Name</span>
                  <span className="caption-text text-break">{detail.userName}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Phone Model</span>
                  <span className="caption-text text-break">
                    {detail.phoneSystem ? (
                      <>
                        <Icon name="apple" style={{ fontSize: '24px' }} /> {detail.phoneModel}
                      </>
                    ) : (
                      <>
                        <Icon name="android" style={{ fontSize: '24px' }} /> {detail.phoneModel}
                      </>
                    )}
                  </span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Battery Health</span>
                  <span className="caption-text text-break">{detail.batteryPercentage}%</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">App Name</span>
                  <span className="caption-text text-break">{detail.appName}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">App Version</span>
                  <span className="caption-text text-break">{detail.appVersion}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Ticket ID</span>
                  <span className="caption-text text-break">{detail.ticketId}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Time Taken</span>
                  <span className="caption-text text-break">
                  <span style={{ fontWeight: 'bold', color: 'blue' }}>
                    {detail.validationTimeMillis !== 'N/A' ? (
                      <>
                        {detail.validationTimeMillis < 1000 ? `${detail.validationTimeMillis} ms` : `${(detail.validationTimeMillis / 1000).toFixed(1)} secs`}
                      </>
                    ) : (
                      "N/A"
                    )}
                    </span>
                  </span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Validated Mode</span>
                  <span className="caption-text text-break">
                    {detail.validationMode !== "N/A" ? (
                      detail.validationMode ? (
                        <Badge color="primary" style={{ fontSize: "0.9rem" }}>Pocket mode</Badge>
                      ) : (
                        <Badge color="secondary" style={{ fontSize: "0.9rem" }}>Foreground</Badge>
                      )
                    ) : (
                      "N/A"
                    )}
                  </span>
                </Col>
                {/* Display iBeacon Status */}
                <Col lg={6}>
                  <span className="sub-text">iBeacon Status</span>
                  <span className="caption-text text-break">
                    {detail.ibeaconStatus === 1 ? (
                      <Badge color="dark" style={{ fontSize: "0.9rem" }} >Intermediate</Badge>
                    ) : detail.ibeaconStatus === 2 ? (
                      <Badge color="gray" style={{ fontSize: "0.9rem" }}>Near</Badge>
                    ) : detail.ibeaconStatus === 3 ? (
                      <Badge color="light"style={{ fontSize: "0.9rem" }}>Far</Badge>
                    ) : (
                      "Unknown"
                    )}
                  </span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Validation Distance</span>
                  <span className="caption-text text-break">
                    {detail.validationRangeFeet !== "N/A" ? 
                    <span style={{ fontWeight: 'bold', color: 'blue' }}>
                      {parseFloat(detail.validationRangeFeet).toFixed(2)} Feet </span> : 
                      "N/A"
                    }
                  </span>
                </Col>
                {/* Display Activate API Time */}
                <Col lg={6}>
                  <span className="sub-text">Activate API Time</span>
                  <span className="caption-text text-break">
                    {detail.activateApiTime !== "N/A" ? (
                      <span style={{ fontWeight: 'bold', color: 'blue' }}>
                        {detail.activateApiTime < 1000 ? `${detail.activateApiTime} ms` : `${(detail.activateApiTime / 1000).toFixed(1)} secs`}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </span>
                </Col>

                {/* Display Get Ticket API Time */}
                <Col lg={6}>
                  <span className="sub-text">Get Ticket API Time</span>
                  <span className="caption-text text-break">
                    {detail.getTicketApiTime !== "N/A" ? (
                      <span style={{ fontWeight: 'bold', color: 'blue' }}>
                        {detail.getTicketApiTime < 1000 ? `${detail.getTicketApiTime} ms` : `${(detail.getTicketApiTime / 1000).toFixed(1)} secs`}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </span>
                </Col>

                {/* Display Config API Time */}
                <Col lg={6}>
                  <span className="sub-text">Config API Time</span>
                  <span className="caption-text text-break">
                    {detail.configApiTime !== "N/A" ? (
                      <span style={{ fontWeight: 'bold', color: 'blue' }}>
                        {detail.configApiTime < 1000 ? `${detail.configApiTime} ms` : `${(detail.configApiTime / 1000).toFixed(1)} secs`}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </span>
                </Col>
                {/* Display Config Background Feet */}
                <Col lg={6}>
                  <span className="sub-text">Config Background Feet</span>
                  <span className="caption-text text-break">{detail.configBackgroundFeet}</span>
                </Col>

                {/* Display Config Foreground Feet */}
                <Col lg={6}>
                  <span className="sub-text">Config Foreground Feet</span>
                  <span className="caption-text text-break">{detail.configForegroundFeet}</span>
                </Col>

              </Row>
            </div>
          )}
        </ModalBody>
      </Modal>

    </React.Fragment>
  );
};
export default AppBenchMarkTicketSearch;
