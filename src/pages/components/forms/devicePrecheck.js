import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import Content from "../../../layout/content/Content";
import Swal from "sweetalert2";
import {
  Row,
  Col,
  Label,
  Form,
  Spinner,
  Card,
  CardBody,
  Table,
  Input,
} from "reactstrap";
import Head from "../../../layout/head/Head";
import { Button } from "../../../components/Component";
import { Alert } from "reactstrap";
import axios from "axios";
import Icon from "../../../components/icon/Icon";
import BASE_URL from "../../../config";
// import Icon from "../../../components/Component";
import {
  Block,
  BlockDes,
  PreviewCard,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "../../../components/Component";
import { postUserData } from "../../../functionReducer";
const FormValidation2 = () => {
  const [startingPWM, setStartingPWM] = useState("800");
  const [startingRPM, setStartingRPM] = useState("1000");
  const [maxRPM, setMaxRPM] = useState("9000");

  const handleCalibrateClick = async () => {
    if (
      !isNumeric(startingPWM) ||
      !isNumeric(startingRPM) ||
      !isNumeric(maxRPM)
    ) {
      alert("Please enter numeric values for all fields.");
      return;
    }

    const topic = "device/cab";
    const message = `cab#${startingPWM}#${startingRPM}#${maxRPM}`;

    try {
      const response = await fetch(`${BASE_URL}/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, message }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      console.log("API Call successful");
      Swal.fire({
        icon: "success",
        title: "Calibration data sent",
        text: "",
        focusConfirm: false,
      });
      // Optionally, handle response data or further logic here
    } catch (error) {
      console.error("Error making API call:", error.message);
      // Handle error state or display an error message to the user
    }
  };

  const isNumeric = (value) => {
    return /^\d+$/.test(value);
  };

  const handleChangePWM = (event) => {
    const value = event.target.value;
    if (isNumeric(value) || value === "") {
      setStartingPWM(value);
    }
  };

  const handleChangeRPM = (event) => {
    const value = event.target.value;
    if (isNumeric(value) || value === "") {
      setStartingRPM(value);
    }
  };

  const handleChangeMaxRPM = (event) => {
    const value = event.target.value;
    if (isNumeric(value) || value === "") {
      setMaxRPM(value);
    }
  };

  return (
    <React.Fragment>
      <Head title="Calibration" />
      <Content page="component">
        <BlockHead size="lg" wide="sm">
          <BlockHeadContent>
            <BlockTitle tag="h2" className="fw-normal">
              Calibration
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
                  <strong style={{ color: "blue" }}>Starting PWM :</strong>{" "}
                  Starting value of PWM where the Starting RPM begins
                </li>
                <li>
                  <strong style={{ color: "blue" }}>Starting RPM :</strong>{" "}
                  Starting RPM from tachometer.
                </li>
                <li>
                  <strong style={{ color: "blue" }}>Maximum RPM :</strong>{" "}
                  Maximum RPM from tachometer.
                </li>
              </ul>
            </BlockDes>
          </BlockHeadContent>
        </BlockHead>
        <PreviewCard>
          <Row>
            <Col sm="6" md="3">
              <Label>Starting PWM</Label>
              <Input
                type="text"
                value={startingPWM}
                onChange={handleChangePWM}
              />
            </Col>
            <Col sm="6" md="3">
              <Label>Starting RPM</Label>
              <Input
                type="text"
                value={startingRPM}
                onChange={handleChangeRPM}
              />
            </Col>
            <Col sm="6" md="3">
              <Label>Maximum RPM</Label>
              <Input type="text" value={maxRPM} onChange={handleChangeMaxRPM} />
            </Col>
            <Col
              sm="6"
              md="3"
              className="d-flex align-items-center justify-content-center"
            >
              <Button color="primary" onClick={handleCalibrateClick}>
                Calibrate
              </Button>
            </Col>
          </Row>
        </PreviewCard>
      </Content>
    </React.Fragment>
  );
};

export default FormValidation2;
