import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner, Table, Badge } from 'reactstrap';
import axios from 'axios';

function Example({ isOpen, toggle, deviceId,lastSeen }) {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://mdot.zed-admin.com/api/GetGlobalInfo/${deviceId}`);
        console.log('API Response:', response.data);
        setApiData(response.data);
        setError(null); // Clear error state on successful API response
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
      <ModalHeader toggle={toggle}>Device Information - {deviceId} - {lastSeen}</ModalHeader>
      <ModalBody className="text-center">
        {loading ? (
          <Spinner color="primary" />
        ) : (
          error ? (
            <p style={{ fontWeight: 'bold', color: 'red' }}>{error}</p>
          ) : (
            apiData && (
              <div>
                <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2263b3' ,textAlign: 'left' }}>
                  Assigned Clients
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
                <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2263b3',textAlign: 'left' }}>
                 GPS & SIM info
                </p>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Vehicle No</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                      <th>Speed</th>
                      <th>SIM Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{apiData.apiResponses.gpsDetailsAPI.lastUpdatedValues.vehicleNo}</td>
                      <td>{apiData.apiResponses.gpsDetailsAPI.lastUpdatedValues.lat}</td>
                      <td>{apiData.apiResponses.gpsDetailsAPI.lastUpdatedValues.long}</td>
                      <td>{apiData.apiResponses.gpsDetailsAPI.lastUpdatedValues.speed}</td>
                      <td>{apiData.apiResponses.gpsDetailsAPI.lastUpdatedValues.simNumber}</td>
                    </tr>
                  </tbody>
                </Table>
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
                          <td>{ticket.validatedDate}</td>
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
