import Image from "next/image";
import Link from "next/link";
import React from "react";

const TableBody = ({
  tableData,
  headerData,
  img,
  view,
  edit,
  del,
  exclude,
}) => {
  return (
    <tbody>
      {tableData.length > 0 ? (
        tableData.map((item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">{index + 1}</td>
            {Object.keys(item).map((itm, index) =>
              exclude ? (
                !exclude.includes(itm) && (
                  <td key={index} className="align-middle">
                    {itm === img ? (
                      <Image
                        src={item[itm]}
                        width={40}
                        height={40}
                        alt="Not Found"
                        style={{
                          maxWidth: "40px",
                          minWidth: "40px",
                          maxHeight: "40px",
                          minHeight: "40px",
                          borderRadius: "100%",
                          border: "1px solid black",
                        }}
                      />
                    ) : (
                      item[itm]
                    )}
                  </td>
                )
              ) : (
                <td key={index} className="align-middle">
                  {itm === img ? (
                    <Image
                      src={item[itm]}
                      width={40}
                      height={40}
                      alt="Not Found"
                      style={{
                        maxWidth: "40px",
                        minWidth: "40px",
                        maxHeight: "40px",
                        minHeight: "40px",
                        borderRadius: "100%",
                        border: "1px solid black",
                      }}
                    />
                  ) : (
                    item[itm]
                  )}
                </td>
              )
            )}
            {(view || edit || del) && (
              <td className="text-end align-middle">
                {view && (
                  <span
                    className="ms-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => view(item._id)}
                  >
                    <i className="fa-solid fa-eye text-primary"></i>
                  </span>
                )}
                {edit && (
                  <span
                    className="ms-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => edit(item._id)}
                  >
                    <i className="fa-solid fa-pen-to-square text-success"></i>
                  </span>
                )}
                {del && (
                  <span
                    className="ms-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => del(item._id)}
                  >
                    <i className="fa-solid fa-trash text-danger"></i>
                  </span>
                )}
              </td>
            )}
          </tr>
        ))
      ) : (
        <tr>
          {/* <td colSpan={tableData.length - exclude.length + 2}> */}
          <td
            colSpan={headerData.length + 2}
            className="text-center"
            style={{ color: "#efefef", padding: "30px 10px" }}
          >
            <i className="fa-solid fa-inbox" style={{ fontSize: "54px" }}></i>
            <br />
            <p className="mb-0">No Data</p>
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
