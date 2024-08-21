"use client";

import { useContext } from "react";
import { Thead, THT, THTS } from "../../components";
import TableContext from "../Provider/TableContext";

function TableHead() {
  const { setOrder = () => {} } = useContext(TableContext);

  return (
    <Thead>
      <THT txt="#" />
      <THTS txt="Name" field="name" setOrder={setOrder} />
      <THTS txt="Location" field="location" setOrder={setOrder} />
      <THTS txt="Warehouse Manager" field="manager_id" setOrder={setOrder} />
      <THT txt="No of Drivers" />
      <THT txt="Actions" />
    </Thead>
  );
}

export default TableHead;
