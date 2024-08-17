"use client";

import React from "react";

const SingleProductCard = ({ product }) => {
  return (
    <div className="max-w-md bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Product Image */}
      <img
        src={product?.product_images[0]?.image_url}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      {/* Product Details */}
      <div className="p-4">
        {/* Product Name */}
        <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>

        {/* Stock Status */}
        <p
          className={`mt-2 text-sm ${
            product.in_stock ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.in_stock ? "In Stock" : "Out of Stock"}
        </p>

        {/* Description */}
        <p className="mt-4 text-gray-600 text-sm">{product.description}</p>

        {/* Add to Cart Button */}
        <button
          className={`mt-6 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ${
            product.inStock
              ? "hover:bg-blue-600"
              : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!product.inStock}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProductCard;
