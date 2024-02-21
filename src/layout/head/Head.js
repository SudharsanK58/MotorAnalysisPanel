import React from "react";
import { Helmet } from "react-helmet";

const Head = ({ ...props }) => {
  return (
    <Helmet>
      <title>{props.title ? props.title + " | " : null} ZIG Remote hardware monitoring system</title>
    </Helmet>
  );
};
export default Head;
