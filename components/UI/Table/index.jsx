import React from "react";
import { Table as ARTable } from "reactstrap";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = ({
  headerData,
  tableData,
  img,
  view,
  edit,
  del,
  exclude,
  ...tableProps
}) => {
  return (
    <ARTable responsive borderless {...tableProps}>
      <TableHead headerData={headerData} view={view} edit={edit} del={del} />
      <TableBody
        headerData={headerData}
        tableData={tableData}
        img={img}
        view={view}
        edit={edit}
        del={del}
        exclude={exclude}
      />
    </ARTable>
  );
};

export default Table;
