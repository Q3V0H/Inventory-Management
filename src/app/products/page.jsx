import AllProducts from "@/_components/HomePage/AllProducts";
import Footer from "@/_components/HomePage/Footer";
import Navbar from "@/_components/Navbar";
import React from "react";

const Page = () => {
  return (
    <div>
      <Navbar />
      <hr className="w-full h-2" />
      <div className="mt-6">
        <AllProducts />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
