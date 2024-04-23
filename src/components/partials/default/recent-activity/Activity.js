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
  const calculateLastSeen = (formattedTimestamp) => {
    const givenTime = new Date(Date.UTC(
      formattedTimestamp.substring(0, 4), // Year
      formattedTimestamp.substring(5, 7) - 1, // Month (zero-based)
      formattedTimestamp.substring(8, 10), // Day
      formattedTimestamp.substring(11, 13), // Hour
      formattedTimestamp.substring(14, 16), // Minute
      formattedTimestamp.substring(17, 19), // Second
      formattedTimestamp.substring(20, 23) // Millisecond
    ));
    const currentTime = new Date(Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
      new Date().getUTCHours(),
      new Date().getUTCMinutes(),
      new Date().getUTCSeconds()
    ));
    const timeDifference = currentTime - givenTime;
    const secondsDifference = Math.floor(timeDifference / 1000);
  
    if (secondsDifference < 60) {
      return (
        <span style={{ fontWeight: 'bold', color: 'green' }}>
          {`${Math.max(1, secondsDifference)} seconds ago`}
        </span>
      );
    } else if (secondsDifference < 600) {
      const minutes = Math.floor(secondsDifference / 60);
      return (
        <span style={{ fontWeight: 'bold', color: 'green' }}>
          {`${minutes} minute${minutes > 1 ? 's' : ''} ago`}
        </span>
      );
    } else if (secondsDifference < 3600) {
      const minutes = Math.floor(secondsDifference / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (secondsDifference < 86400) {
      const hours = Math.floor(secondsDifference / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (secondsDifference < 172800) {
      return "1 day ago";
    } else {
      // If more than one day, return the formatted timestamp without additional formatting
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(formattedTimestamp).toLocaleDateString('en-US', options);
    }
  };
  
  const calculateTimeDifference = (timestamp) => {
    const activityTime = new Date(Date.UTC(
      timestamp.substring(0, 4), // Year
      timestamp.substring(5, 7) - 1, // Month (zero-based)
      timestamp.substring(8, 10), // Day
      timestamp.substring(11, 13), // Hour
      timestamp.substring(14, 16), // Minute
      timestamp.substring(17, 19), // Second
      timestamp.substring(20, 23) // Millisecond
    ));
    const currentTime = new Date(Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
      new Date().getUTCHours(),
      new Date().getUTCMinutes(),
      new Date().getUTCSeconds()
    ));
    console.log("Activity Time (UTC):", activityTime.toISOString());
    console.log("Current Time (UTC):", currentTime.toISOString());
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
                <span className="time">{calculateLastSeen(item.time)}</span>
              </div>
            </li>
          ))
        )}
      </ul>
    </React.Fragment>
  );
};

export default RecentActivity;
