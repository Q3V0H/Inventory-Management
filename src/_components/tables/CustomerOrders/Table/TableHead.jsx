"use client";

import { useContext } from "react";
import { Thead, THT, THTS } from "../../components";
import TableContext from "../Provider/TableContext";

function TableHead() {
  const { setOrder = () => {} } = useContext(TableContext);

  return (
    <Thead>
      <THT txt="#" />
      <THTS txt="Expense Name" field="name" setOrder={setOrder} />
      <THTS txt="AMOUNT" field="amount" setOrder={setOrder} />
      <THTS txt="Approved BY" field="approved_by" setOrder={setOrder} />
      <THTS txt="STATUS" field="status" setOrder={setOrder} />
      <THT txt="Actions" />
    </Thead>
  );
}

export default TableHead;
