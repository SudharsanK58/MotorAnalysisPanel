import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner, Table, Badge } from 'reactstrap';
import axios from 'axios';

function Example({ isOpen, toggle, deviceId,lastSeen }) {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const deviceIdInCaps = deviceId.toUpperCase();
  const [addressData, setAddressData] = useState(null);

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://mdot.zed-admin.com/api/GetGlobalInfo/${deviceId}`);
        console.log('API Response:', response.data);
        setApiData(response.data);
        setError(null); // Clear error state on successful API response

        // Fetch address data only if lastUpdatedValues is available
        if (response.data.apiResponses.gpsDetailsAPI.lastUpdatedValues) {
          const { lat, long } = response.data.apiResponses.gpsDetailsAPI.lastUpdatedValues;
          const addressResponse = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`);
          setAddressData(addressResponse.data.address);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Unknown device configuration. Contact admin.');
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, deviceId]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>
        Device Information : {deviceIdInCaps}   -   {lastSeen}
        <br />
        SIM Number : {apiData?.apiResponses?.gpsDetailsAPI?.lastUpdatedValues?.simNumber}
      </ModalHeader>
      <ModalBody className="text-center">
        {loading ? (
          <Spinner color="primary" />
        ) : (
          error ? (
            <p style={{ fontWeight: 'bold', color: 'red' }}>{error}</p>
          ) : (
            apiData && (
              <div>

                {apiData.apiResponses.zigConfigAPI.clients.length > 0 && (
                  <>
                <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2263b3' ,textAlign: 'left'}}>
                  Assigned clients
                </p>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Client ID</th>
                      <th>Client Name</th>
                      <th>Major</th>
                      <th>Minor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiData.apiResponses.zigConfigAPI.clients.map((client, index) => (
                      <tr key={index}>
                        <td>{client.clientId}</td>
                        <td>{client.clientName}</td>
                        <td>{client.major}</td>
                        <td>{client.minor}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                </>
                )}
                <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2263b3' ,textAlign: 'left'}}>
                  Device Config
                </p>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Device Mode</th>
                      <th>Device Topic</th>
                      <th>Tx Power</th>
                      <th>Major</th>
                      <th>Minor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{apiData.apiResponses.deviceConfigAPI.deviceConfig.deviceTicketTelemetricHybridMode}</td>
                      <td>{apiData.apiResponses.deviceConfigAPI.deviceConfig.deviceTopic}</td>
                      <td>{apiData.apiResponses.deviceConfigAPI.deviceConfig.txPower}</td>
                      <td>{apiData.apiResponses.deviceConfigAPI.deviceConfig.major}</td>
                      <td>{apiData.apiResponses.deviceConfigAPI.deviceConfig.minor}</td>
                    </tr>
                  </tbody>
                </Table>
                {apiData.apiResponses.gpsDetailsAPI.lastUpdatedValues && (
                  <>
                    <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2263b3', textAlign: 'left' }}>
                      GPS info
                    </p>
                    <Table bordered>
                      <thead>
                        <tr>
                          <th>Vehicle No</th>
                          <th>Latitude</th>
                          <th>Longitude</th>
                          <th>Speed(mph)</th>
                          <th>Satellite</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{apiData.apiResponses.gpsDetailsAPI.lastUpdatedValues.vehicleNo}</td>
                          <td>{apiData.apiResponses.gpsDetailsAPI.lastUpdatedValues.lat}</td>
                          <td>{apiData.apiResponses.gpsDetailsAPI.lastUpdatedValues.long}</td>
                          <td>{apiData.apiResponses.gpsDetailsAPI.lastUpdatedValues.speed}</td>
                          <td>{apiData.apiResponses.gpsDetailsAPI.lastUpdatedValues.satellite}</td>
                        </tr>
                      </tbody>
                    </Table>
                    {apiData.apiResponses.gpsDetailsAPI.lastUpdatedValues.long !== '0' && apiData.apiResponses.gpsDetailsAPI.lastUpdatedValues.lat !== '0' && (
                    <>
                      <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2263b3', textAlign: 'left' }}>
                        Address Info
                      </p>
                      <Table bordered>
                        <tbody>
                          {Object.entries(addressData).map(([property, value]) => (
                            <tr key={property}>
                              <td style={{ fontWeight: 'bold' }}>{property.charAt(0).toUpperCase() + property.slice(1)}</td>
                              <td>{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </>
                  )}
                  </>
                )}
                {/* Tickets Data Table */}
                <div className="mt-3">
                {apiData.apiResponses.ticketsData.tickets.length > 0 && (
                    <>
                <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2263b3',textAlign: 'left' }}>Tickets Data</p>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Ticket ID</th>
                        <th>Username</th>
                        <th>Email ID</th>
                        <th>Validated Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiData.apiResponses.ticketsData.tickets.map((ticket, index) => (
                        <tr key={index}>
                          <td>{ticket.ticketId}</td>
                          <td>{ticket.username}</td>
                          <td>{ticket.emailId}</td>
                          <td>{formatTimestamp(ticket.validatedDate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  
                    </>
                    )}
                </div>

              </div>
            )
          )
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default Example;
