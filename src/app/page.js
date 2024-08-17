"use client";

import AllProducts from "@/_components/AllProducts";
import Hero from "@/_components/Hero";
import Navbar from "@/_components/Navbar";
import { useState } from "react";

export default function Home() {
  const [limit, setLimit] = useState(6);
  return (
    <div className="">
      <Navbar />
      <Hero />
      <AllProducts limit={limit} setLimit={setLimit} />
    </div>
  );
}
