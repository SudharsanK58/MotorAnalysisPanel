// example.js

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Example({ isOpen, toggle, deviceId, lastSeen }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Device Information</ModalHeader>
      <ModalBody>
        <p>
          <strong>Device ID:</strong> {deviceId}
        </p>
        <p>
          <strong>Last Seen:</strong> {lastSeen}
        </p>
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
