"use client";

import React, { useEffect, useState } from "react";
import SingleProductCard from "./SingleProductCard";
import axios from "axios";
import Link from "next/link";

const AllProducts = ({ limit, setLimit }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const res = await axios.get("/api/products", {
        params: {
          limit: limit,
        },
      });

      const { data } = res;

      setProducts(data?.docs);
    } catch (error) {}
  }

  return (
    <div className="w-full mx-auto p-6 mt-6 mb-6">
      <div className="flex justify-between items-center mt-5">
        <div />
        <h3 className="font-bold uppercase text-xl">
          Our Popular{" "}
          <span className="text-red-500 uppercase text-xl font-bold">
            Products
          </span>{" "}
        </h3>
        <Link href="/products" className="cursor-pointer text-sm">
          View More
        </Link>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-6 mt-6">
        {products.map((product) => (
          <SingleProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
