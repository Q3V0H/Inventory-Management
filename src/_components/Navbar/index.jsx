"use client";

import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { MdOutlineMenu } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import NavigationMenu from "./NavMenu";
import Link from "next/link";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({ subsets: ["latin"], weight: ["700"] });

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuClose, setMobileMenuClose] = useState("false");

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 max-sm:top-1 bg-black">
        <nav
          className="sticky flex items-center justify-between p-6 lg:px-8 "
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            {!mobileMenuOpen && (
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Inv</span>
                <Image
                  className="h-12 w-auto"
                  width={700}
                  height={500}
                  src="/logo-trolley.svg"
                  alt="Logo"
                />
              </Link>
            )}
          </div>
          <div className="flex lg:hidden">
            {!mobileMenuOpen && (
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <MdOutlineMenu
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <NavigationMenu />
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end  ">
            <Link
              href="/login"
              className="text-md font-semibold leading-6 text-white bg-orange-500 px-10 py-2 rounded-lg  "
            >
              Sign In
            </Link>
          </div>
        </nav>
        <Dialog
          as="div"
          className={` ${!mobileMenuOpen && "hidden"} lg:hidden `}
          open={mobileMenuOpen}
          onClose={setMobileMenuClose}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Inv</span>
                <Image
                  className="h-12 w-auto"
                  width={700}
                  height={500}
                  src="/logo-trolley.svg"
                  alt="Logo"
                />
              </Link>
              <Link href="#">
                {" "}
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <AiOutlineClose className="h-6 w-6" aria-hidden="true" />
                </button>
              </Link>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      <Link href={item.href}>
                        <button
                          type="button"
                          className="-m-2.5 rounded-md p-2.5 text-gray-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </button>
                      </Link>
                      {item.sublinks && (
                        <ul className="pl-4">
                          {item.sublinks.map((sublink) => (
                            <li key={sublink.name}>
                              <Link href={sublink.href}>
                                <button
                                  type="button"
                                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {sublink.name}
                                </button>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href="/packages"
                    className="text-sm font-semibold leading-6 text-white bg-orange-500 px-10 py-2 rounded-lg  "
                  >
                    <button
                      type="button"
                      className="-m-2.5 rounded-md p-2.5 text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </button>{" "}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
};

export default Navbar;
