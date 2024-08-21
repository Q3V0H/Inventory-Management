"use client";

import React, { useState } from "react";
import Hero from "./Hero";
import AllProducts from "./AllProducts";
import Footer from "./Footer";
import Contact from "./Contact";

const Homepage = () => {
  const [limit, setLimit] = useState(6);
  return (
    <div>
      <Hero />
      <AllProducts limit={limit} setLimit={setLimit} />
      <Contact />
      <Footer />
    </div>
  );
};

export default Homepage;
