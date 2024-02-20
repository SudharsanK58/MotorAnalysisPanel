import React from "react";
import EnglishFlag from "../../images/flags/english.png";
import SpanishFlag from "../../images/flags/spanish.png";
import FrenchFlag from "../../images/flags/french.png";
import TurkeyFlag from "../../images/flags/turkey.png";
import { Row, Col } from "../../components/Component";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { Link } from "react-router-dom";

const AuthFooter = () => {
  return (
    <div className="nk-footer nk-auth-footer-full">
      <div className="container wide-lg">
        <Row className="g-3">
          <Col lg="6">
            <div className="nk-block-content text-center text-lg-start">
              <p className="text-soft">&copy; 2024 ZIG Remote management system by sudharsan@zed.digital.</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default AuthFooter;
