import React from "react";
import Roles from "../../../_components/tables/Roles";

const RolesTable = () => {
  return (
    <div className="pl-24 pr-5 max-md:px-0 max-md:pr-3 ml-6 max-md:ml-0">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Roles />
      </div>
    </div>
  );
};

export default RolesTable;
