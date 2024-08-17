"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";

import Image from "next/image";

export default function Navigateion() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Navbar shouldHideOnScroll className="container mx-auto">
      <NavbarBrand>
        <Image
          src={"https://img.icons8.com/fluency/48/move-by-trolley.png"}
          width={48}
          height={48}
          alt="Logo"
          priority
        />
        <p className="font-bold text-inherit">Inv</p>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Products
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Contact Us
          </Link>
        </NavbarItem>
      </NavbarContent>

      {isLoggedIn ? (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                className="h-14 gap-2 bg-black"
                color="primary"
              >
                <p className="font-semibold text-black">Signed in as</p>
                <p className="font-semibold text-primary">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">
                <Link
                  href="#"
                  className="font-semibold text-black text-sm hover:text-primay"
                  color="primary"
                >
                  My Profile
                </Link>
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                <p className="text-danger">Log Out</p>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent as="div" justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
}
