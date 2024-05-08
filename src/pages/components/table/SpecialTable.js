import React, { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "../../../components/Component";
import { Card, CardBody, Button,Spinner,Input,Table, Badge,PaginationLink, PaginationItem, Pagination,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import axios from "axios";
import Example from "./Example";
import Swal from "sweetalert2";
import BASE_URL from "../../../config";


const SpecialTablePage = () => {
  const [tableData, setTableData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState([]);
  const [loading, setLoading] = useState(true); // New state to track loading state
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('All Client Devices');
  const [startDate, setStartDate] = useState(null);
  const rowsPerPage = 20;
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeZone, setTimeZone] = useState(sessionStorage.getItem("TimeZone") || 0);

  const handleAdvanced1 = async (rowData,e) => {
    try {
      // Make API call
      const response = await fetch(`${BASE_URL}/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: `${rowData.deviceId}/nfc`,
          message: '301',
        }),
      });

      // Check if the API call was successful
      if (response.ok) {
        // Show success message using Swal
        Swal.fire({
          icon: 'success',
          title: 'The device has been pinged.',
          focusConfirm: false,
        });
      } else {
        // Handle error case, show error message
        Swal.fire({
          icon: 'error',
          title: 'Error pinging the device.',
          text: 'Please try again later.',
          focusConfirm: false,
        });
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error pinging the device.',
        text: 'Please try again later.',
        focusConfirm: false,
      });
    }

    // Prevent default link behavior
    if (e) {
      e.preventDefault();
    }
  };
  const handleAdvanced3 = async (rowData) => {
    const deviceId = rowData.deviceId;
  
    Swal.fire({
      title: "Warning",
      text: "This works only if the device is active",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, refresh GPS info",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Make API call
          const response = await fetch(`${BASE_URL}/publish`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              topic: `${deviceId}/react`,
              message: 'GET',
            }),
          });
  
          // Check if the API call was successful
          if (response.ok) {
            // Show success message using Swal
            Swal.fire("Request have sent", "Please wait for the device to respond", "success");
          } else {
            // Handle error case, show error message
            Swal.fire({
              icon: 'error',
              title: 'Error refreshing GPS info.',
              text: 'Please try again later.',
              focusConfirm: false,
            });
          }
        } catch (error) {
          // Handle network or other errors
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error refreshing GPS info.',
            text: 'Please try again later.',
            focusConfirm: false,
          });
        }
      }
    });
  };
  

  const handleViewAction = (rowData) => {
    setModalData({
      deviceId: rowData.deviceId,
      lastSeen: calculateLastSeen(formatTimestamp(rowData.timestamp)),
    });
    toggleModal();
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);


  // Calculate total pages
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  // State to keep track of the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Get the data for the current page
  const currentPageData = tableData.slice(startIndex, endIndex);

  const formatTimestamp = (timestamp) => {
    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Convert timestamp to Date object
    const dateObj = new Date(timestamp);
  

    // Adjust the timestamp based on the time zone
  if (sessionStorage.getItem("TimeZone") === '1') {
    // Eastern Standard Time (EST)
    dateObj.setHours(dateObj.getHours() - 4, dateObj.getMinutes());
  } else {
    // Indian Standard Time (IST)
    dateObj.setHours(dateObj.getHours() + 5, dateObj.getMinutes() + 30);
  }
  
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
  
  const filteredTableData = tableData.filter((rowData) =>
  rowData.deviceId.includes(searchQuery) || String(rowData.vehicleNo).includes(searchQuery)
);

const reloadTable = () => {
  fetchDeviceLogData();
  setSelectedClient("All Client Devices");
};
const dataToMap = searchQuery ? filteredTableData : currentPageData;

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


  const tableHeadings = [
    "Coach number",
    "Device ID",
    "Last seen",
    "Last IN time",
    "Network Name",
    // "BLE minor",
    "BLE TX power",
    "Temperature",
    "Actions",
  ];

  const fetchDeviceLogData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/device_log_data`);
      setTableData(response.data);
      // Initialize dropdownOpen state for each row
      setDropdownOpen(Array(response.data.length).fill(false));
      setLoading(false); // Set loading to false once data is loaded
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
  };
  const fetchClientData = async (client) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/macaddresses?client_name=${encodeURIComponent(client)}`);
      setTableData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching data for client ${client}:`, error);
      setLoading(false);
    }
  };
  const attDevicesCount = tableData.filter((device) => device.networkName === 'AT&T').length;
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/clients`);
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
    if (selectedClient === 'All Client Devices') {
      fetchDeviceLogData();
    } else {
      // Fetch data based on selected client
      fetchClientData(selectedClient);
    }
  }, [selectedClient]);

  const toggleDropdown = (rowIndex) => {
    // Toggle the dropdown state for the clicked row
    setDropdownOpen((prevDropdownOpen) => {
      const newDropdownOpen = [...prevDropdownOpen];
      newDropdownOpen[rowIndex] = !newDropdownOpen[rowIndex];
      return newDropdownOpen;
    });
  };
  return (
    <React.Fragment>
      <Head title="All Devices" />
      <Content page="component">
        <Block size="lg">
        <BlockHead>
          <BlockHeadContent>
            <BlockTitle tag="h3">Devices</BlockTitle>
          </BlockHeadContent>
        </BlockHead>
          <div className="d-flex justify-content-end mb-3">
              {/* Add space between elements */}
              <div style={{ width: '20px' }}></div>
              <Input
                type="text"
                placeholder="Search by deviceId or Vehicle Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mr-2 input-sm" // Add input-sm class to reduce size
                style={{ width: '200px' }} // Adjust width based on your preference
              />
              <div style={{ width: '20px' }}></div>

              {/* Reload Button */}
              <Button color="primary" className="mr-2" onClick={reloadTable}>
                Reload
              </Button>
              <div style={{ width: '20px' }}></div>
              {/* Dropdown List */}
              <UncontrolledDropdown>
                <DropdownToggle className="btn btn-light">
                {selectedClient}
                </DropdownToggle>
                <DropdownMenu>
                  {clients.map((client, index) => (
                    <DropdownItem key={index} onClick={() => handleClientSelect(client)}>
                      {client}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          <Card className="card-bordered card-preview">
            <CardBody>
            <div className="d-flex flex-column align-items-center mt-3">
              <Table className="text-center">
                <thead>
                  <tr>
                    {tableHeadings.map((heading, index) => (
                      <th key={index}>{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
          {loading ? ( // Render spinner in table body when loading is true
            <tr>
              <td colSpan={tableHeadings.length} className="text-center">
                <Spinner color="primary" />
              </td>
            </tr>
          ) : (
            dataToMap.map((rowData, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowData.vehicleNo}</td>
                <td>{rowData.deviceId}</td>
                {/* Last seen - Leave empty for now */}
                <td>{calculateLastSeen(rowData.timestamp)}</td>
                <td>{formatTimestamp(rowData.timestamp)}</td>
                <td>
                  {rowData.networkConnection === 1 ? (
                    <Badge color="primary">{rowData.networkName}</Badge>
                  ) : rowData.networkConnection === 2 ? (
                    <Badge color="secondary">{rowData.networkName}</Badge>
                  ) : (
                    rowData.networkName
                  )}
                </td>
                {/* <td>{rowData.bleMinor}</td> */}
                <td>{rowData.bleTxpower}</td>
                <td>{rowData["current temp"]}°C</td>
                <td>
                  <UncontrolledDropdown isOpen={dropdownOpen[rowIndex]} toggle={() => toggleDropdown(rowIndex)} style={{ width: '10px' }}>
                    <DropdownToggle caret className="dropdown-toggle btn btn-light">
                      <span style={{ fontSize: "1.5rem" }}>&#8942;</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag="a" href="#links"  onClick={() => handleViewAction(rowData)}>
                        <span>Device info</span>
                      </DropdownItem>
                      <DropdownItem tag="a" href="#links" onClick={(e) => handleAdvanced1(rowData)}>
                        <span>Ping test</span>
                      </DropdownItem>
                      <DropdownItem tag="a" href="#links" onClick={(ev) =>handleAdvanced3(rowData)}>
                        <span>Get GPS info</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            ))
          )}
        </tbody>
              </Table>
              {/* Pagination */}
              
                <Pagination aria-label="Page navigation example" className="text-center mt-3">
                  <PaginationItem>
                    <PaginationLink
                      previous
                      href="#prev"
                      onClick={(ev) => {
                        ev.preventDefault();
                        setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
                      }}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index} active={currentPage === index + 1}>
                      <PaginationLink
                        href={`#page${index + 1}`}
                        onClick={(ev) => {
                          ev.preventDefault();
                          setCurrentPage(index + 1);
                        }}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationLink
                      next
                      href="#next"
                      onClick={(ev) => {
                        ev.preventDefault();
                        setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
                      }}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </Pagination>
              </div>
            </CardBody>
          </Card>
          <div style={{ width: '20px' }}></div>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
              <li>This table provides information about the status of all client devices.</li>
              <li>Time represented in this table is in <strong style={{ color: 'blue' }}>{timeZone === '1' ? "Eastern" : "India"} Standard Time ({timeZone === '1' ? "EST" : "IST"})</strong>.</li>
              <li>This table is for <strong style={{ color: 'blue' }}>hardware team</strong> reference only.</li>
              <li>No of devices installed and GPS data received is <strong style={{ color: 'blue' }}>{attDevicesCount} devices</strong> for the selected client</li>
            </ul>
        </Block>
        {modalData && (
        <Example
        isOpen={isModalOpen}
        toggle={toggleModal}
        deviceId={modalData.deviceId}
        lastSeen={modalData.lastSeen}
      />
      )}
      </Content>
    </React.Fragment>
  );
};

export default SpecialTablePage;
