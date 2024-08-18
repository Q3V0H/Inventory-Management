"use client";

import React from "react";
import Link from "next/link";

const SingleProductCard = ({ product }) => {
  return (
    <Link
      href={`products/${product.id}`}
      className="max-w-md bg-white border border-gray-200 rounded-lg overflow-hidden"
    >
      <img
        src={product?.product_images[0]?.image_url}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>

        <p
          className={`mt-2 text-sm ${
            product.in_stock ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.in_stock ? "In Stock" : "Out of Stock"}
        </p>

        <p className="mt-4 text-gray-600 text-sm">{product.description}</p>

        <button
          className={`mt-6 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ${
            product.in_stock
              ? "hover:bg-blue-600"
              : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!product.in_stock}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default SingleProductCard;
