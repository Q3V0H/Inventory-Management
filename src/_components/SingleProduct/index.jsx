import React from "react";
import Navbar from "../Navbar";
import Footer from "../HomePage/Footer";
import Product from "./Product";

const SingleProduct = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="mb-12">
        <Navbar />
      </div>

      <div className="flex-grow mt-8">
        <Product />
      </div>
      <Footer />
    </div>
  );
};

export default SingleProduct;
