import React, { useEffect, useState } from "react";
import Icon from "../../../icon/Icon";
import { Progress, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Spinner } from "reactstrap";
import { PreviewAltCard } from "../../../preview/Preview";
import { PurchasePlanChart } from "../../charts/invest/InvestChart";
import { investData, investDataSet2, investDataSet3, investDataSet4 } from "./InvestData";

const InvestPlan = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://3.144.9.52:8001/active_devices_percentage");
        const apiData = await response.json();
        setData(apiData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from API:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const getRandomColor = () => {
    const colors = ["success"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
<PreviewAltCard className="card-full" bodyClass="d-flex flex-column h-100">
      <div className="card-title-group mb-3">
        <div className="card-title">
          <h6 className="title">Active client devices </h6>
          <p>Below progress shows the no of active devices / total devices per client in last 12 hrs</p>
        </div>
        <div className="card-tools mt-n4 me-n1"></div>
      </div>
      {loading ? ( // Conditionally rendering the spinner while loading
        <div className="d-flex justify-content-center align-items-center h-100">
         <Spinner color="primary" />
        </div>
      ) : (
        <div className="progress-list gy-3">
          {data.map((item, idx) => (
            <div className="progress-wrap" key={idx}>
              <div className="progress-text">
                <div className="progress-label">{item.client_name}</div>
                <div className="progress-amount">{item.active_device_ids} / {item.total_device_ids} devices</div>
              </div>
              <Progress className="progress-md" value={item.active_device_percentage} color={getRandomColor()}></Progress>
            </div>
          ))}
        </div>
      )}
    </PreviewAltCard>
  );
};
export default InvestPlan;
