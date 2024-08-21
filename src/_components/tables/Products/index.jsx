"use client";

import useTable from "./Provider/useTable";
import { Table, TBody } from "../components";
import { useRouter } from "next/navigation";
import TableContext from "./Provider/TableContext";
import ProductCard from "./Table/TableCard";

export default function Products() {
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
      }}
    >
      <Table
        label="All Products"
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setDocs={setDocs}
        handleAdd={() => router.push("/dashboard/products/add")}
        isFiltered={isFiltered}
        setIsFiltered={setIsFiltered}
        handleRemoveFilters={clearFilters}
        pagination={pagination}
        // url="users/search"
        // FilterComponent={<Filters />}
      >
        {/* <TableHead setOrder={setOrder} /> */}
        <TBody>
          <div className="flex gap-4 max-md:flex-wrap">
            {docs.map((doc, i) => {
              return <ProductCard key={doc?.id || i} doc={doc} />;
            })}
          </div>
        </TBody>
      </Table>
    </TableContext.Provider>
  );
}
