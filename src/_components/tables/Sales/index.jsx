"use client";

import TableHead from "./Table/TableHead";
import useTable from "./Provider/useTable";
import TableRow from "./Table/TableRow";
import { Table, TBody } from "../components";
import Filters from "./Filter";
import { useRouter } from "next/navigation";
import TableContext from "./Provider/TableContext";

export default function Expenses() {
  const {
    limit,
    setLimit,
    docs,
    setDocs,
    isLoading,
    setIsLoading,
    isFiltered,
    setIsFiltered,
    pagination,
    roles,
    setRoles,
    selectedRoles,
    setSelectedRoles,
    setOrder,
    clearFilters,
    refetchDocs,
  } = useTable();

  const router = useRouter();

  return (
    <TableContext.Provider
      value={{
        limit,
        setLimit,
        docs,
        setDocs,
        isLoading,
        setIsLoading,
        isFiltered,
        setIsFiltered,
        pagination,
        roles,
        setRoles,
        selectedRoles,
        setSelectedRoles,
        setOrder,
        clearFilters,
        refetchDocs,
      }}
    >
      <Table
        label="All Sales"
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setDocs={setDocs}
        isFiltered={isFiltered}
        // handleAdd={() => router.push("/dashboard/expenses/add")}
        setIsFiltered={setIsFiltered}
        handleRemoveFilters={clearFilters}
        pagination={pagination}
        // url="users/search"
        // FilterComponent={<Filters />}
      >
        <TableHead setOrder={setOrder} />
        <TBody>
          {docs.map((doc, i) => {
            return (
              <TableRow
                key={doc?.id || i}
                doc={doc}
                refetchDocs={refetchDocs}
              />
            );
          })}
        </TBody>
      </Table>
    </TableContext.Provider>
  );
}
