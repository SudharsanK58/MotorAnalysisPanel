import React, { useState, useEffect } from "react";
import UserAvatar from "../../../user/UserAvatar";
import { CardTitle, Spinner } from "reactstrap";

const RecentActivity = () => {
  const [activityData, setActivityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch("http://3.144.9.52:8001/ticketsbyclientfordisplay?client_name=Clinton%20Area%20Transit")
      .then(response => response.json())
      .then(data => {
        // Assuming the data structure is similar to activityData, update the state
        setActivityData(data);
        setIsLoading(false); // Set isLoading to false when data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Set isLoading to false in case of error
      });
  }, []);

  const calculateTimeDifference = (timestamp) => {
    const currentTime = new Date();
    const activityTime = new Date(timestamp);
    const differenceInSeconds = Math.floor((currentTime - activityTime) / 1000);

    if (differenceInSeconds < 60) {
      return "just now";
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
    } else {
      const days = Math.floor(differenceInSeconds / 86400);
      return days === 1 ? `${days} day ago` : `${days} days ago`;
    }
  };

  return (
    <React.Fragment>
      <div className="card-inner border-bottom">
        <div className="card-title-group">
          <CardTitle>
            <h6 className="title">Recent Activities on Clinton Transit</h6>
          </CardTitle>
        </div>
      </div>
      <ul className="nk-activity">
        {isLoading ? ( // Conditionally rendering the spinner while loading
          <div className="d-flex justify-content-center align-items-center h-100">
            <Spinner color="primary" />
          </div>
        ) : (
          activityData.map((item, index) => (
            <li className="nk-activity-item" key={index}>
              <UserAvatar
                className="nk-activity-media"
                theme={item.theme}
                image={item.img}
                text={item.initial}
              ></UserAvatar>
              <div className="nk-activity-data">
                <div className="label">{item.name + " " + item.activity}</div>
                <span className="time">{calculateTimeDifference(item.time)}</span>
              </div>
            </li>
          ))
        )}
      </ul>
    </React.Fragment>
  );
};

export default RecentActivity;
