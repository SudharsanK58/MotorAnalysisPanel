import React, { useEffect, useState } from "react";
import Icon from "../../../icon/Icon";
import { Progress, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from "reactstrap";
import { PreviewAltCard } from "../../../preview/Preview";
import { PurchasePlanChart } from "../../charts/invest/InvestChart";
import { investData, investDataSet2, investDataSet3, investDataSet4 } from "./InvestData";

const InvestPlan = () => {
  const [planSet, setPlanSet] = useState("30");
  const [data, setData] = useState(investData);

  useEffect(() => {
    let newData;
    if (planSet === "7") {
      newData = investDataSet2;
    } else if (planSet === "15") {
      newData = investDataSet3;
    } else {
      newData = investDataSet4;
    }
    setData(newData);
  }, [planSet]);

  return (
    <PreviewAltCard className="card-full" bodyClass="d-flex flex-column h-100">
      <div className="card-title-group mb-3">
        <div className="card-title">
          <h6 className="title">Client devices </h6>
          <p>Below progress shows the no of active devices in % for clients</p>
        </div>
        <div className="card-tools mt-n4 me-n1">
        </div>
      </div>
      <div className="progress-list gy-3">
        {data.map((item, idx) => {
          return (
            <div className="progress-wrap" key={idx}>
              <div className="progress-text">
                <div className="progress-label">{item.pack}</div>
                <div className="progress-amount">{item.amount} devices</div>
              </div>
              <Progress className="progress-md" value={item.percentage} color={item.color}></Progress>
            </div>
          );
        })}
      </div>
    </PreviewAltCard>
  );
};
export default InvestPlan;
