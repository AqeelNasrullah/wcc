import React from "react";

const DividerWithTitle = ({ title }) => {
  return (
    <div className="d-flex align-items-center py-2 gap-3">
      <div
        style={{ borderTop: "1px solid black" }}
        className="flex-grow-1"
      ></div>
      <p className="mb-0 text-uppercase">{title}</p>
      <div
        style={{ borderTop: "1px solid black" }}
        className="flex-grow-1"
      ></div>
    </div>
  );
};

export default DividerWithTitle;
