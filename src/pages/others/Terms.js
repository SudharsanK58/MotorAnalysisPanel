import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const MyComponent = () => {
  const [latestData, setLatestData] = useState(null);

  useEffect(() => {
    // Create a socket connection
    const socket = io("http://localhost:3001");

    // Add event listener for "initialData" event
    socket.on("initialData", (change) => {
      console.log("WebSocket Data Change:", change);

      // Update the state with the latest data
      setLatestData(change);
    });

    // Clean up function to close the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      <h1>Latest WebSocket Data</h1>
      {latestData && (
        <div>
          <h2>Latest Change</h2>
          <p>{JSON.stringify(latestData)}</p>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
