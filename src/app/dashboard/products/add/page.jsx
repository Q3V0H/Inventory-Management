import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const Add = () => {
  return (
    <div className="pl-24 pr-5 max-md:px-0 max-md:pr-3 ml-6 max-md:ml-0">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] mx-auto">
        <h3 className="text-center">Add Product</h3>
        <div className="mt-5">
          <div className="flex gap-5 max-md:flex-col">
            <div className="w-full">
              <Label>Product Name</Label>
              <Input placeholder="Enter Product name" />
            </div>
            <div className="w-full">
              <Label>Product Price</Label>
              <Input placeholder="Enter Product price" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
