import React from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import {
  BlockBetween,
  BlockDes,
  Block,
  BlockContent,
  BlockHead,
  BlockTitle,
  Col,
  Row,  // Make sure to import the Table component
} from "../../../components/Component";
import { Table} from "reactstrap";
// ... (previous imports)

const PricingTable = () => {
  return (
    <React.Fragment>
      <Head title="Pricing Table"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween className="g-3">
            <BlockContent>
              <BlockTitle>Automatic people counter</BlockTitle>
              <BlockDes className="text-soft">
                <p>Below data represents the number of people entered along with validated count</p>
              </BlockDes>
            </BlockContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs"  >
              <div className="pricing-head" style={{ borderBottom: 'none' }}>
                <div className="pricing-title">
                  <h4 className="card-title title">LIVE Count</h4>
                  <p className="sub-text">Device ID</p>
                </div>
                <div className="card-text">
                  <Row>
                    <Col size={6}>
                      <span className="h4 fw-500" style={{ fontSize: '70px' }}>12</span>
                      <span className="sub-text" style={{ fontSize: '15px' }}>People</span>
                    </Col>
                    <Col size={6}>
                      <span className="h4 fw-500" style={{ fontSize: '70px' }}>16</span>
                      <span className="sub-text" style={{ fontSize: '15px' }}>Tickets</span>
                    </Col>
                  </Row>
                </div>
              </div>
          </Row>
           <Table className="text-center mx-auto" style={{ width: '80%', borderRadius: '15px', overflow: 'hidden' }}>
              <thead>
                <tr>
                  <th>User name</th>
                  <th>Ticket ID</th>
                  <th>Count</th>
                  <th>Validated time</th>
                </tr>
              </thead>
              <tbody>
                {/* Example rows, replace with your data */}
                <tr>
                  <td>John Doe</td>
                  <td>T12345</td>
                  <td>3</td>
                  <td>2024-02-22 10:30 AM</td>
                </tr>
                <tr>
                  <td>Jane Smith</td>
                  <td>T54321</td>
                  <td>2</td>
                  <td>2024-02-22 11:45 AM</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </Table>
        </Block>
      </Content>
    </React.Fragment>
  );
};



export default PricingTable;
