import React, { useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import Icon from "../../components/icon/Icon";

import { Button, UncontrolledDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockDes, BackTo } from "../../components/block/Block";
import { PreviewCard, CodeBlock, PreviewTable } from "../../components/preview/Preview";
import { OverlineTitle } from "../../components/text/Text";

const DropdownsPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <React.Fragment>
      <Head title="Dropdowns" />
      <Content page="component">
        <BlockHead size="lg" wide="sm">
          <BlockHeadContent>
            <BackTo link="/components" icon="arrow-left">
              Components
            </BackTo>
            <BlockTitle tag="h2" className="fw-normal">
              Dropdowns
            </BlockTitle>
            <BlockDes>
              <p className="lead">
                Toggle contextual overlays for displaying lists of links and more with the Bootstrap dropdown plugin. To
                use the components, import it such as{" "}
                <code>import {`{Dropdown, DropdownToggle, DropdownMenu}`} from "reactstrap"</code>. Visit the{" "}
                <a href={"https://reactstrap.github.io/?path=/docs/components-dropdown--dropdown"} target="_blank" rel="noreferrer">
                  Reactstrap
                </a>{" "}
                library for detailed instructions.
              </p>
            </BlockDes>
          </BlockHeadContent>
        </BlockHead>

        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Basic Example</BlockTitle>
              <p>
                Any single .btn-action can be turned into a <code>DropdownToggle</code> with some markup changes. Here’s
                how you can put them to work with either elements:
              </p>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <ul className="preview-list">
              <li className="preview-item">
                <UncontrolledDropdown>
                  <div className="btn-group">
                    <Button color="secondary">Action</Button>
                    <DropdownToggle className="dropdown-toggle-split" color="secondary">
                      <Icon name="chevron-down"></Icon>
                    </DropdownToggle>
                  </div>
                  <DropdownMenu>
                    <ul className="link-list-opt">
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Profile Settings2</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Notifications</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Another Action</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Something else here</span>
                        </DropdownItem>
                      </li>
                    </ul>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </li>
              <li className="preview-item">
                <UncontrolledDropdown direction="up">
                  <DropdownToggle className="btn-action" color="primary">
                    <span>Dropup Button</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <ul className="link-list-opt">
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Profile Settings</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Notifications</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Another Action</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Something else here</span>
                        </DropdownItem>
                      </li>
                    </ul>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </li>
              <li className="preview-item">
                <UncontrolledDropdown direction="up">
                  <div className="btn-group">
                    <Button color="secondary">Action</Button>
                    <DropdownToggle className="dropdown-toggle-split" color="secondary">
                      <Icon name="chevron-up"></Icon>
                    </DropdownToggle>
                  </div>
                  <DropdownMenu>
                    <ul className="link-list-opt">
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Profile Settings</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Notifications</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Another Action</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Something else here</span>
                        </DropdownItem>
                      </li>
                    </ul>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </li>
              <li className="preview-item">
                <UncontrolledDropdown direction="right">
                  <DropdownToggle className="btn-action" color="primary">
                    <span>Dropright Button</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <ul className="link-list-opt">
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Profile Settings</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Notifications</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Another Action</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Something else here</span>
                        </DropdownItem>
                      </li>
                    </ul>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </li>
              <li className="preview-item">
                <UncontrolledDropdown direction="right">
                  <div className="btn-group">
                    <Button color="secondary">Action</Button>
                    <DropdownToggle className="dropdown-toggle-split" color="secondary">
                      <Icon name="chevron-right"></Icon>
                    </DropdownToggle>
                  </div>
                  <DropdownMenu>
                    <ul className="link-list-opt">
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Profile Settings</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Notifications</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Another Action</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem tag="a" href="#links" onClick={(ev) => ev.preventDefault()}>
                          <span>Something else here</span>
                        </DropdownItem>
                      </li>
                    </ul>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </li>
            </ul>
          </PreviewCard>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default DropdownsPage;
