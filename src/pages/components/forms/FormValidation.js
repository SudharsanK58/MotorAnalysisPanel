import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import Content from "../../../layout/content/Content";
import { Row, Col, Label, Form,Spinner, Card, CardBody, Table } from "reactstrap";
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

const FormValidation = () => {
  const { register, handleSubmit, setValue, watch, setError, clearErrors, formState: { errors } } = useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isTicketIdSelected, setTicketIdSelected] = useState(false);
  const [isdeviceIdSelected, setdeviceIdSelected] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [noData, setnoData] = useState(false);
  const [loading, setLoading] = useState(false);
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
        const response = await axios.get(`http://3.144.9.52:8001/search_ticket/${ticketIdInput}`);

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
        const response = await axios.get(`http://3.144.9.52:8001/device_tickets`, {
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
        const response = await axios.get(`http://3.144.9.52:8001/latest_tickets`, {
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
  const formatTimestamp = (timestamp) => {
    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Convert timestamp to Date object
    const dateObj = new Date(timestamp);
  
    // Add 5 hours and 30 minutes to the timestamp
    dateObj.setHours(dateObj.getHours() + 5, dateObj.getMinutes() + 30);
  
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


const getLabel = watch("labelText") || "Ticket ID";

// ... rest of your component remains unchanged
  return (
    <React.Fragment>
      <Head title="Search-Ticket"></Head>
      <Content page="component">
        <BlockHead size="lg" wide="sm">
          <BlockHeadContent>
            {/* <BackTo link="/overview" icon="arrow-left">
              Dashboard
            </BackTo> */}
            <BlockTitle tag="h2" className="fw-normal">
              Search-Ticket
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
                <li>
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
                </li>
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
    <Card className="card-bordered card-preview mx-auto border-0" style={{ width: '80%', borderRadius: '10px' }}>
      <CardBody>
        <div className="d-flex flex-column align-items-center mt-3" >
          <Table className="text-center" >
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
                    {key.endsWith('date') ? formatTimestamp(value) : value}
                  </td>
                ))}
              </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  ) : null
)}




    </React.Fragment>
  );
};
export default FormValidation;
