"use client";

import { useContext } from "react";
import { Thead, THT, THTS } from "../../components";
import TableContext from "../Provider/TableContext";

function TableHead() {
  const { setOrder = () => {} } = useContext(TableContext);

  return (
    <Thead>
      <THT txt="#" />
      <THTS txt="Product Name" field="" setOrder={setOrder} />
      <THTS txt="QUANTITY" field="quantity" setOrder={setOrder} />
      <THTS txt="DELIVERY MODE" field="delivery_mode" setOrder={setOrder} />
      <THTS txt="STATUS" field="status" setOrder={setOrder} />
      {/* <THT txt="Actions" /> */}
    </Thead>
  );
}

export default TableHead;
