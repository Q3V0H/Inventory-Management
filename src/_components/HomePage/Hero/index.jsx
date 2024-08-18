import React from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative flex items-center justify-center h-[75vh] bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white">
      {/* Background Image */}
      <Image
        src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg"
        alt="Fashion"
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        width={500}
        height={500}
      />

      {/* Content */}
      <div className="relative z-10 text-center p-5 space-y-6 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold uppercase">
          Discover Everything in One Place
        </h1>
        <p className="text-lg max-w-xl mx-auto">
          Explore the latest trends in fashion, electronics, and any other
          category you want.
        </p>
        <Button>Shop Now</Button>
      </div>
    </div>
  );
};

export default Hero;
