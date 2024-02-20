import React, { useState } from "react";
import { SessionDoughnut } from "../../charts/analytics/AnalyticsCharts";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { Icon } from "../../../Component";

const SessionDevice = () => {
  const [sessionDevice, setSessionDevices] = useState("30");
  return (
    <React.Fragment>
      <div className="card-title-group">
        <div className="card-title card-title-sm">
          <h6 className="title">Sessions by devices</h6>
        </div>
      </div>
      <div className="device-status my-auto">
        <div className="device-status-ck" >
        <SessionDoughnut className="analytics-doughnut" state={sessionDevice} />
        </div>
        <div className="device-status-group" >
          <div className="device-status-data" style={{ marginLeft: "0px" }}>
            <div className="title">220 devices</div>
            <div className="amount">ZIGD23FPL1</div>
          </div>
          <div className="device-status-data" style={{ marginRight: "0px" }}>
            <div className="title">60 devices</div>
            <div className="amount"> FMB920</div>
          </div>
          <div className="device-status-data" style={{ marginRight: "0px" }}>
            <div className="title">265 devices</div>
            <div className="amount">FMM920</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SessionDevice;
