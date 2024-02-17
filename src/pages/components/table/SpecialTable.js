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


const SpecialTablePage = () => {
  const itemsPerPage = 10;
  const [tableData, setTableData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState([]);
  const [loading, setLoading] = useState(true); // New state to track loading state
  const [searchQuery, setSearchQuery] = useState('');
  // Assuming you have 10 rows per page
  // Assuming you want 10 rows per page
  const rowsPerPage = 10;

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
    console.log('Browser Timezone:', browserTimeZone);

    // Convert timestamp to Date object
    const dateObj = new Date(timestamp);

    // Add 5 hours and 30 minutes to the timestamp
    dateObj.setHours(dateObj.getHours() + 5, dateObj.getMinutes() + 30);

    // Format the adjusted timestamp
    const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const formattedTimestamp = dateObj.toLocaleString('en-US', options);

    return formattedTimestamp;
  };

  const filteredTableData = tableData.filter((rowData) =>
  rowData.deviceId.includes(searchQuery) || String(rowData.bleMinor).includes(searchQuery)
);
const dataToMap = searchQuery ? filteredTableData : currentPageData;

  const calculateLastSeen = (formattedTimestamp) => {
    const currentIndianTime = new Date();
    const timeDifference = currentIndianTime - new Date(formattedTimestamp);
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
    } else {
      const hours = Math.floor(secondsDifference / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
  };

  const tableHeadings = [
    "Device ID",
    "Last seen",
    "Last IN time",
    "Network Name",
    "BLE minor",
    "BLE tx power",
    "Temperature",
    "Actions",
  ];

  const fetchDeviceLogData = async () => {
    try {
      const response = await axios.get("http://3.144.9.52:8001/device_log_data");
      setTableData(response.data);
      // Initialize dropdownOpen state for each row
      setDropdownOpen(Array(response.data.length).fill(false));
      setLoading(false); // Set loading to false once data is loaded
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    fetchDeviceLogData();
  }, []);

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
      <Head title="Special table" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h4">Transaction List - With Action</BlockTitle>
              <p>
                The following table can be used for{" "}
                <strong className="text-primary">invoice, payment history</strong> related transactions.
              </p>
            </BlockHeadContent>
          </BlockHead>
          <div className="d-flex justify-content-end mb-3">
              {/* Search Input */}
              <Input
                type="text"
                placeholder="Search by deviceId or Minor"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mr-2 input-sm" // Add input-sm class to reduce size
                style={{ width: '200px' }} // Adjust width based on your preference
              />
              <div style={{ width: '20px' }}></div>

              {/* Reload Button */}
              <Button color="primary" className="mr-2">
                Reload
              </Button>
              <div style={{ width: '20px' }}></div>
              {/* Dropdown List */}
              <UncontrolledDropdown>
                <DropdownToggle className="btn btn-light">
                  Dropdown
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem>Option 3</DropdownItem>
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
                <td>{rowData.deviceId}</td>
                {/* Last seen - Leave empty for now */}
                <td>{calculateLastSeen(formatTimestamp(rowData.timestamp))}</td>
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
                <td>{rowData.bleMinor}</td>
                <td>{rowData.bleTxpower}</td>
                <td>{rowData["current temp"]}</td>
                <td>
                  <UncontrolledDropdown isOpen={dropdownOpen[rowIndex]} toggle={() => toggleDropdown(rowIndex)}>
                    <DropdownToggle caret className="dropdown-toggle btn btn-light">
                      <span style={{ fontSize: "1.5rem" }}>&#8942;</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                        <span>View</span>
                      </DropdownItem>
                      <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                        <span>Ping data</span>
                      </DropdownItem>
                      <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                        <span>Get GPS</span>
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
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default SpecialTablePage;
