import React from "react";
import { Spinner } from "reactstrap";

const Loading = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ width: "100%", minHeight: "100vh" }}
    >
      <Spinner color="success" />
    </div>
  );
};

export default Loading;
