"use client";

import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";

const ProductCard = ({ doc }) => {
  const router = useRouter();

  const handleView = () => {
    router.push(`/dashboard/products/${doc?.id}`);
  };

  const handleEdit = () => {
    router.push(`/dashboard/products/edit/${doc?.id}`);
  };

  return (
    <div className="max-w-md bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg m-4">
      <img
        src={
          doc?.product_images[0]?.image_url || "https://via.placeholder.com/400"
        }
        alt={doc?.name || "Product Image"}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">
          {doc?.name || "Product Name"}
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          {doc?.description || "No description provided."}
        </p>

        <p
          className={`mt-4 text-sm ${
            doc?.in_stock ? "text-green-600" : "text-red-600"
          }`}
        >
          {doc?.in_stock ? "In Stock" : "Out of Stock"}
        </p>

        <p className="">
          Quantity : <span>{doc?.quantity}</span>
        </p>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 text-blue-500 font-semibold py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-100"
          >
            <FaRegEdit className="text-xl" />
            Checkout
          </button>
          <button
            onClick={() => {}}
            className="flex items-center gap-2 text-red-500 font-semibold py-2 px-4 rounded-lg transition duration-300 hover:bg-red-100"
          >
            <RiDeleteBin5Line className="text-xl" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
