import React from "react";

const TableHead = ({ headerData, view, edit, del }) => {
  return (
    <thead style={{ backgroundColor: "#efefef" }}>
      <tr>
        <th style={{ width: "100px" }} className="text-center align-middle">
          Sr. No.
        </th>
        {headerData.map((item, index) => (
          <th key={index} className="align-middle">
            {item}
          </th>
        ))}
        {(view || edit || del) && <th></th>}
      </tr>
    </thead>
  );
};

export default TableHead;
