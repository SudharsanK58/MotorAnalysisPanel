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

  const handleCalibrateClick = () => {
    if (
      !isNumeric(startingPWM) ||
      !isNumeric(startingRPM) ||
      !isNumeric(maxRPM)
    ) {
      alert("Please enter numeric values for all fields.");
    } else {
      console.log("Starting PWM:", startingPWM);
      console.log("Starting RPM:", startingRPM);
      console.log("Maximum RPM:", maxRPM);
      // Perform further logic for calibration
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
      <Head title="PRE_CHECK" />
      <Content page="component">
        <BlockHead size="lg" wide="sm">
          <BlockHeadContent>
            <BlockTitle tag="h2" className="fw-normal">
              Troubleshoot
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
                  Please make sure the device is{" "}
                  <strong style={{ color: "blue" }}>turned on</strong>.
                </li>
                <li>
                  Make sure to use the{" "}
                  <strong style={{ color: "blue" }}>
                    latest version of the app
                  </strong>
                  .
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
