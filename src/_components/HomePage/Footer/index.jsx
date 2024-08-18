import Image from "next/image";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-black px-8 py-20 max-md:p-4 max-sm:p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-evenly">
        {/* Logo */}
        <div className="w-full md:w-auto mb-8 md:mb-0">
          <Image src="/logo-trolley.svg" alt="Logo" width={50} height={50} />
        </div>
        {/* Company Links */}
        <div className="flex flex-col md:w-auto mb-8 md:mb-0">
          <p className="mb-5 text-[#E1E6E9] font-bold">Company</p>
          <Link
            href="#products"
            className="font-medium text-white text-sm mb-2"
          >
            Products
          </Link>
          <Link href="#contact" className="font-medium text-white text-sm mb-2">
            Contact
          </Link>
        </div>
        {/* Contact Links */}
        <div className="flex flex-col md:w-auto mb-8 md:mb-0">
          <p className="mb-5 text-[#E1E6E9] font-bold">Contact</p>
          <Link href="/" className="font-medium text-white text-sm mb-2">
            Talk to us
          </Link>
          <Link href="/" className="font-medium text-white text-sm mb-2">
            Press
          </Link>
          <Link href="/" className="font-medium text-white text-sm mb-2">
            Affiliates
          </Link>
        </div>
        <div className="flex items-center gap-x-4">
          <Link href="https://www.facebook.com/">
            <Image
              src="/fb.svg"
              width={60}
              height={60}
              alt="Facebook"
              className="cursor-pointer"
            />
          </Link>
          <Link href="https://www.instagram.com/">
            <Image
              src="/ig.svg"
              width={60}
              height={60}
              alt="Instagram"
              className="cursor-pointer"
            />
          </Link>
          <Link href="https://tiktok.com/">
            <Image
              src="/x.svg"
              width={60}
              height={60}
              alt="Twitter"
              className="cursor-pointer "
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
