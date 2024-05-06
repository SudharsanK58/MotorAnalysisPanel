import React, { useState } from "react";
import { AudienceLineChart } from "../../charts/analytics/AnalyticsCharts";
import { Icon } from "../../../Component";

const AudienceOverview = () => {
  const [auOverview, setAuOverview] = useState("month-1");
  return (
    <React.Fragment>
      <div className="card-title-group pb-3 g-2">
        <div className="card-title card-title-sm">
          <h6 className="title">Audience Overview</h6>
          <p>How have your users, sessions, bounce rate metrics trended.</p>
        </div>
      </div>
      <div className="analytic-ov">
        <div className="analytic-data-group analytic-ov-group g-3">
          <div className="analytic-data analytic-ov-data">
            <div className="title">Users</div>
            <div className="amount">{auOverview === "month-1" ? "2.57" : "1.21"}K</div>
            <div className="change up">
              <Icon name="arrow-long-up"></Icon> {auOverview === "month-1" ? "12.31" : "5.21"}%
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Sessions</div>
            <div className="amount">{auOverview === "month-1" ? "3.98" : "1.6"}K</div>
            <div className="change up">
              <Icon name="arrow-long-up"></Icon> {auOverview === "month-1" ? "47.5" : "80.6"}%
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Users</div>
            <div className="amount">{auOverview === "month-1" ? "28.25" : "10.25"}%</div>
            <div className="change down">
              <Icon name="arrow-long-down"></Icon> {auOverview === "month-1" ? "12.57" : "18.21"}%
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Users</div>
            <div className="amount">{auOverview === "month-1" ? "7m 28" : "2m 36"}s</div>
            <div className="change down">
              <Icon name="arrow-long-down"></Icon> {auOverview === "month-1" ? "0.35" : "1.21"}%
            </div>
          </div>
        </div>
        {/* <div className="analytic-ov-ck">
          <AudienceLineChart state={auOverview} />
        </div> */}
      </div>
    </React.Fragment>
  );
};
export default AudienceOverview;
