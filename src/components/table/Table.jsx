import React from "react";
import styled from "styled-components";
const TableStyles = styled.div`
  overflow-x: auto;
  background-color: white;

  table {
    width: ${(props) => props.wc || "100%"};
  }
  thead {
    background-color: ${(props) => props.wc || "#fff"};
  }
  th,
  td {
    vertical-align: middle;
  }
  th {
    padding: ${(props) => props.padding || "20px 30px "};
    font-weight: 600;
    text-align: left;
  }
  td {
    padding: ${(props) => props.padding || "20px 30px "};
  }
  tbody {
  }
`;
const Table = ({ children, ...props }) => {
  return (
    <TableStyles>
      <table className="border-collapse border border-slate-500">
        {children}
      </table>
    </TableStyles>
  );
};

export default Table;
