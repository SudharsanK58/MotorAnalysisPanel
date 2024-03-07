import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Row, Col, Label, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../../../components/Component";

const FormValidationComponent = ({ alter, id }) => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isTicketIdSelected, setTicketIdSelected] = useState(false);
  

  // Set the default value for the "searchByTicketID" checkbox
  useEffect(() => {
    setValue("searchByTicketID", true);
    setTicketIdSelected(true);
    setValue("labelText", "Search by Ticket ID");
  }, [setValue]);

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
        break;
      case "searchByDeviceID":
        setValue("labelText", "Search by Device ID");
        setIsDateSelected(false);
        setTicketIdSelected(false);
        break;
      case "searchBydate":
        setValue("labelText", "*");
        setIsDateSelected(true);
        setTicketIdSelected(false);
        break;
      default:
        setValue("labelText", "");
        setIsDateSelected(false);
        setTicketIdSelected(false);
        break;
    }
  };


const getLabel = watch("labelText") || "Ticket ID";

// ... rest of your component remains unchanged


  const onFormSubmit = (data) => {
    // Handle form submission logic here using the form data (data object).
    console.log("Form data submitted:", data);
  };



  return (
    <React.Fragment>
        <Row className="g-gs">
          <Col md="6">
            <Label className="form-label">Search by</Label>
            <div className="form-group">
              <Label className="form-label"></Label>
              <ul className="custom-control-group g-3 align-center">
                <li>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="form-control custom-control-input"
                      id={id + " fv-search-ticket-id"}
                      {...register("searchByTicketID")}
                      value="ticketId"
                      onChange={() => handleCheckboxChange("searchByTicketID")}
                    />
                    <Label className="custom-control-label" htmlFor={id + " fv-search-ticket-id"}>
                      Ticket ID
                    </Label>
                  </div>
                </li>
                <li>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="form-control custom-control-input"
                      id={id + " fv-search-device-id"}
                      {...register("searchByDeviceID")}
                      value="deviceId"
                      onChange={() => handleCheckboxChange("searchByDeviceID")}
                    />
                    <Label className="custom-control-label" htmlFor={id + " fv-search-device-id"}>
                      Device ID
                    </Label>
                  </div>
                </li>
                <li>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="form-control custom-control-input"
                      id={id + " fv-search-date"}
                      {...register("searchBydate")}
                      value="date"
                      onChange={() => handleCheckboxChange("searchBydate")}
                    />
                    <Label className="custom-control-label" htmlFor={id + " fv-search-date"}>
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
              <div className="form-note">
                Date Format <code>mm/dd/yyyy</code>
              </div>
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
              {/* You can add validation messages here if needed */}
            </div>
          </Col>

          <Col md="6">
            <Label className="form-label"></Label>
            <div className="form-group">
              <Button color="primary" size="lg" type="submit">
                Save Information
              </Button>
            </div>
          </Col>
        </Row>
    </React.Fragment>
  );
};

export default FormValidationComponent;
