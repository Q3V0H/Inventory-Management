"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Product = () => {
  const [singleProduct, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const { product } = useParams();
  const [url, setUrl] = useState(images[0]?.image_url);

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    try {
      const res = await axios.get("/api/products/single", {
        params: {
          id: parseInt(product),
        },
      });

      const { data } = res;

      setProduct(data?.result);
      setImages(data?.result?.product_images);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-4/5 mx-auto p-5 mt-5 mb-5">
      <div className="flex gap-10 max-md:flex-wrap">
        {/* Product Images Section */}
        <div className="flex flex-col items-center w-full md:w-1/2">
          <img
            src={url || "https://via.placeholder.com/400"}
            alt={singleProduct.name}
            className="w-64 h-64 object-cover rounded-lg shadow-md"
          />
          <div className="flex gap-2 mt-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img.image_url || "https://via.placeholder.com/100"}
                alt={`Product view ${index + 1}`}
                className="w-16 h-16 object-cover rounded-md shadow-sm"
                onClick={() => setUrl(img?.image_url)}
              />
            ))}
          </div>
        </div>

        {/* Product Information Section */}
        <div className="flex flex-col justify-center w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800">
            {singleProduct.name || "Product Name"}
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            {singleProduct.description || "Product Description"}
          </p>
          <ul className="mt-4 space-y-2">
            {singleProduct.features?.map((feature, index) => (
              <li key={index} className="text-gray-700">
                - {feature}
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition duration-300">
              Add to Cart
            </button>
            <button className="bg-transparent text-orange-500 px-6 py-3 border border-orange-500 rounded-lg shadow hover:bg-orange-500 hover:text-white transition duration-300">
              Learn More
            </button>
          </div>

          {/* Rating Section */}
          <div className="flex items-center mt-4">
            {[...Array(5)].map((_, index) => (
              <span key={index} className="text-yellow-500 text-xl">
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
