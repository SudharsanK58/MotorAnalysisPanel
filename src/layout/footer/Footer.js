import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import EnglishFlag from "../../images/flags/english.png";
import SpanishFlag from "../../images/flags/spanish.png";
import FrenchFlag from "../../images/flags/french.png";
import TurkeyFlag from "../../images/flags/turkey.png";
import { Link } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";

const Footer = () => {
  useEffect(() => {
    // Create a socket connection
    const socket = io("https://websocketmongodb.onrender.com/");

    // Add event listener for "initialData" event
    socket.on("deviceNotification", (change) => {
      console.log("WebSocket Data Change:", change);

      // Update the state with the latest data
      const audio = new Audio("/ticketNotification.mp3");
      toast.success(`${change}`, {
        position: "top-right",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
      });
      audio
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    });
    // Add event listener for "initialData" event
    socket.on("deviceNotification2", (change) => {
      console.log("WebSocket Data Change:", change);

      // Update the state with the latest data
      const audio = new Audio("/deviceNotification.mp3");
      toast.info(`${change}`, {
        position: "top-right",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
      });
      audio
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    });

    // Clean up function to close the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts
  return (
    <div className="nk-footer bg-white">
      <div className="container-fluid">
        <div className="nk-footer-wrap">
          <div className="nk-footer-copyright">
            {" "}
            &copy; 2024 ZIG Remote hardware monitoring system by
            sudharsan@zed.digtal
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Footer;
