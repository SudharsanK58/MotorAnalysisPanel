import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import Content from "../../../layout/content/Content";
import { Row, Col, Label, Form, Spinner, Card, CardBody, Table } from "reactstrap";
import Head from "../../../layout/head/Head";
import { Button } from "../../../components/Component";
import { Alert } from "reactstrap";
import axios from "axios";
import Icon from "../../../components/icon/Icon";
// import Icon from "../../../components/Component";
import {
  Block,
  BlockDes,
  PreviewCard,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "../../../components/Component";

const FormValidation2 = () => {
  const { register, handleSubmit, setValue, watch, setError, clearErrors, formState: { errors } } = useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [noData, setnoData] = useState(false);
  const [isDeviceActive, setIsDeviceActive] = useState(false);
  const [secondApiResponse, setSecondApiResponse] = useState("");

// Handler for form submission
// Handler for form submission
// Handler for form submission
const onButtonClick = async () => {
  setnoData(false);
  const selectedDeviceId = watch("validatorList");
  const selectedValidator = validatorData.find(item => item.deviceId === selectedDeviceId);
  if (!selectedValidator) {
    console.error("Selected validator not found.");
    return;
  }
  const selectedApp = watch("appList"); // Get selected app from the form
  let apiUrl;
  switch (selectedApp) {
    case "ZIG":
      apiUrl = "ZIGS";
      break;
    case "MDOT":
      apiUrl = "MDOT";
      break;
    default:
      console.error("Invalid app selected.");
      return;
  }
  const formData = {
    topic: `${selectedValidator.macId}/react`,
    message: "GET"
  };
  try {
    setLoading(true);
    await axios.post("http://54.89.246.64:8001/publish", formData);
    // Additional API call after the first one succeeds
    let isDeviceActive = false;
    let isSecondApiTrue = false; // Flag for the second API call
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 3000)); // 10 seconds gap
      const response = await axios.get(`http://3.144.9.52:8001/device_log_data2?device_id=${selectedValidator.macId}`);
      if (response.data === true) {
        isDeviceActive = true;
        // Make the second API call only if the device is active
        const secondResponse = await axios.get(`http://3.144.9.52:8001/precheck?macId=${selectedValidator.macId}&apiUrl=${apiUrl}`);
        console.log("Second API Response:", secondResponse.data);
        setSecondApiResponse(secondResponse.data); // Store the response in state variable
        if (secondResponse.data === true) {
          isSecondApiTrue = true;
        }
        break;
      }
    }
    setnoData(true);
    setLoading(false);
    setIsDeviceActive(isDeviceActive); // Update state
    setnoData(!isSecondApiTrue); // Update noData state based on the second API call result
  } catch (error) {
    console.error("API Error:", error);
    setLoading(false);
  }
};

// Render Alert component based on response
const renderAlert = () => {
  if (secondApiResponse.message === "Good for validation") {
    return (
      <Alert color="success" style={{ fontSize: '30px' }}>
        <Icon name="check-thick" style={{ fontSize: '50px', verticalAlign: 'middle' }}></Icon>
        <strong>{" " + secondApiResponse.message}</strong>
      </Alert>
    );
  } else if (secondApiResponse.message === "Error in smartvenues") {
    return (
      <Alert color="danger" style={{ fontSize: '30px' }}>
        <Icon name="cross-circle" style={{ fontSize: '50px', verticalAlign: 'middle' }}></Icon>
        <strong>{" " + secondApiResponse.reasons}</strong>
      </Alert>
    );
  } else if (secondApiResponse.message === "Mismatch in SmartVenue Config") {
    return (
      <Alert color="error">
        <strong className="error-message">{secondApiResponse.message}</strong>
        <Table className="text-center">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Actual Value</th>
              <th>Expected Value</th>
            </tr>
          </thead>
          <tbody>
            {secondApiResponse.mismatched_params.map((param, index) => (
              <tr key={index}>
                <td>{param.parameter}</td>
                <td>{param.actual_value}</td>
                <td>{param.expected_value}</td>
              </tr>
            ))} 
          </tbody>
        </Table>
      </Alert>
    );
  } else {
    return null; // If none of the conditions match
  }
};


  // Data for the validator dropdown
  const validatorData = [
    { deviceId: "ZIGWG1038 USA-MAM-DEMO-DEVICE-1", macId: "04:e9:e5:16:96:46" },
    { deviceId: "ZIGWG1034 USA-MAM-DEMO-DEVICE-2", macId: "04:e9:e5:16:96:f5" },
    { deviceId: "ZIGWG1171 INDIA-4G-DEMO-DEVICE", macId: "04:e9:e5:16:f6:3d" },
    { deviceId: "ZIGWG1196 INDIA-TOF-R&D-DEVICE", macId: "04:e9:e5:16:f9:f3" },
  ];
  // Data for the app dropdown
  const appData = [
    { appName: "ZIG - Travel Places Safely", value: "ZIG" },
    { appName: "MDOT - Michigan Mobility Wallet", value: "MDOT" }
  ];
  
  return (
    <React.Fragment>
      <Head title="PRE_CHECK"></Head>
      <Content page="component">
        <BlockHead size="lg" wide="sm">
          <BlockHeadContent>
            <BlockTitle tag="h2" className="fw-normal">
              Pre-check-validation-wizard
            </BlockTitle>
            <BlockDes>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
                <li>Please make sure device is <strong style={{ color: 'blue' }}>turn on</strong>.</li>
                <li>Make sure to use latest version of app <strong style={{ color: 'blue' }}>latest version of app</strong></li>
              </ul>
            </BlockDes>
          </BlockHeadContent>
        </BlockHead>
          <PreviewCard >
            <Row className="g-gs">
              <Col md="4">
                <div className="form-group">
                  {/* First dropdown list */}
                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    {/* Second dropdown list */}
                  <select className="form-control" style={{ textAlignLast: "center" }} {...register("validatorList")}>
                    <option value="">Select Validator</option>
                    {validatorData.map((item, index) => (
                      <option key={index} value={item.deviceId}>{item.deviceId}</option>
                    ))}
                  </select>
                </div>
                </div>
              </Col>
              <Col md="4">
                <div className="form-group">
                  {/* Second dropdown list */}
                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    {/* Second dropdown list */}
                  <select className="form-control"style={{ textAlignLast: "center" }} {...register("appList")}>
                  <option value="">Choose validation app</option>
                    {appData.map((item, index) => (
                      <option key={index} value={item.value}>{item.appName}</option>
                    ))}
                  </select>
                  </div>
                </div>
              </Col>
              <Col md="4">
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Search button */}
                  <Button color="primary" size="lm" onClick={onButtonClick} style={{ width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10%' }}>
                    {loading ? (
                      <>
                        &nbsp; Please wait... <Spinner size="sm" color="light" />
                      </>
                    ) : (
                      "Verify device and config"
                    )}
                    
                  </Button>
                </div>
              </Col>
            </Row>
          </PreviewCard>
      </Content>
      {noData ? (
        <div className="d-flex flex-column align-items-center mt-3">
          {isDeviceActive ? (
            renderAlert() // Render appropriate Alert component
          ) : (
            <Alert color="danger" style={{ fontSize: '20px' }}>
              <Icon name="wifi-off" style={{ fontSize: '40px', verticalAlign: 'middle' }}></Icon>
              <strong> Device is not active! Please turn ON the validator or Check in device display</strong>
            </Alert>
          )}
        </div>
      ) : null}
    </React.Fragment>
  );
  
};

export default FormValidation2;
