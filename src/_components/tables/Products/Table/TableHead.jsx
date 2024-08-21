"use client";

import { useContext } from "react";
import { Thead, THT, THTS } from "../../components";
import TableContext from "../Provider/TableContext";

function TableHead() {
  const { setOrder = () => {} } = useContext(TableContext);

  return (
    <Thead>
      <THT txt="#" />
      <THTS txt="Role Name" field="name" setOrder={setOrder} />
      <THTS txt="Description" field="description" setOrder={setOrder} />
      <THT txt="Users" />
    </Thead>
  );
}

export default TableHead;
