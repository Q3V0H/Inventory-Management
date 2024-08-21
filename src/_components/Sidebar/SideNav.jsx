"use client";

import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { PiUsers } from "react-icons/pi";
import { LuUserCog2 } from "react-icons/lu";
import { MdOutlineToken } from "react-icons/md";
import { BiArrowToTop } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { MdDriveEta } from "react-icons/md";
import { CgEditBlackPoint } from "react-icons/cg";
import { PiWarehouseDuotone } from "react-icons/pi";
import { signOut } from "next-auth/react";

const SideNav = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;

  const isActive = (href) => {
    return pathname === href ? "bg-orange-500 rounded-md" : "";
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white w-48 p-4 z-50 flex flex-col justify-between transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:translate-x-0`}
    >
      <div className="">
        <div
          className="mt-2 mb-4 flex justify-center cursor-pointer"
          onClick={toggleSidebar}
        >
          <Image
            src="/logo-trolley.svg"
            width={60}
            height={60}
            alt="Logo"
            className=""
          />
        </div>

        <nav className="flex flex-col space-y-2 mt-6">
          <Link href="/dashboard">
            <p
              className={`flex gap-2 items-center max-md:text-lg p-2 ${isActive(
                "/dashboard"
              )}`}
            >
              <MdOutlineDashboardCustomize className="text-lg" />
              Dashboard
            </p>
          </Link>

          {/* Render links based on role */}
          {role === "Admin" && (
            <>
              <Link href="/dashboard/products">
                <p
                  className={`flex gap-2 items-center max-md:text-lg p-2 ${isActive(
                    "/dashboard/products"
                  )}`}
                >
                  <MdOutlineProductionQuantityLimits className="text-lg" />
                  Products
                </p>
              </Link>
              <Link href="/dashboard/warehouse">
                <p
                  className={`flex gap-2 items-center max-md:text-lg p-2 ${isActive(
                    "/dashboard/warehouse"
                  )}`}
                >
                  <PiWarehouseDuotone className="text-lg" />
                  Warehouses
                </p>
              </Link>
              <Link href="/dashboard/drivers">
                <p
                  className={`flex gap-2 items-center max-md:text-lg p-2 ${isActive(
                    "/dashboard/drivers"
                  )}`}
                >
                  <MdDriveEta className="text-lg" />
                  Drivers
                </p>
              </Link>

              <Link href="/dashboard/users">
                <p
                  className={`flex gap-2 items-center max-md:text-lg p-2 ${isActive(
                    "/dashboard/users"
                  )}`}
                >
                  <PiUsers className="text-lg" />
                  Users
                </p>
              </Link>

              <Link href="/dashboard/roles">
                <p
                  className={`flex gap-2 items-center max-md:text-lg p-2 ${isActive(
                    "/dashboard/roles"
                  )}`}
                >
                  <LuUserCog2 className="text-lg" />
                  Roles
                </p>
              </Link>
              <Link href="/dashboard/sales">
                <p
                  className={`flex gap-2 items-center max-md:text-lg p-2 ${isActive(
                    "/dashboard/sales"
                  )}`}
                >
                  <GiReceiveMoney className="text-lg" />
                  Sales
                </p>
              </Link>
            </>
          )}

          {role === "Technician" && (
            <>
              <Link href="/dashboard/issues">
                <p
                  className={`flex gap-2 items-center max-md:text-lg p-2 ${isActive(
                    "/dashboard/issues"
                  )}`}
                >
                  <PiWarehouseDuotone className="text-lg" />
                  Issues
                </p>
              </Link>
            </>
          )}

          {role === "Customer" && (
            <>
              <Link href="/dashboard/points">
                <p
                  className={`flex gap-2 items-center max-md:text-lg p-2 ${isActive(
                    "/dashboard/points"
                  )}`}
                >
                  <CgEditBlackPoint className="text-lg" />
                  Bonus Points
                </p>
              </Link>

              <Link href="/dashboard/topup">
                <p
                  className={`flex gap-2 items-center max-md:text-lg p-2 ${isActive(
                    "/dashboard/topup"
                  )}`}
                >
                  <BiArrowToTop className="text-lg" />
                  Top Up
                </p>
              </Link>
              <Link href="/dashboard/issues">
                <p
                  className={`flex gap-2 items-center max-md:text-lg p-2 ${isActive(
                    "/dashboard/issues"
                  )}`}
                >
                  <PiWarehouseDuotone className="text-lg" />
                  Issues
                </p>
              </Link>

              <Link href="/dashboard/tokens">
                <p
                  className={`flex gap-2 items-center max-md:text-lg p-2 ${isActive(
                    "/dashboard/tokens"
                  )}`}
                >
                  <MdOutlineToken className="text-lg" />
                  Load Tokens
                </p>
              </Link>
            </>
          )}

          {/* Profile link visible to all roles */}
          <Link href="/dashboard/profile">
            <p
              className={`flex gap-2 items-center max-md:text-lg p-2 ${isActive(
                "/dashboard/profile"
              )}`}
            >
              <ImProfile className="text-lg" />
              Profile
            </p>
          </Link>
        </nav>
      </div>

      <div
        className="flex p-4"
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: `/login`,
          })
        }
      >
        <Link href="/">
          <p className="flex gap-2 items-center max-md:text-lg text-gray-500">
            <span>
              <AiOutlineLogout />
            </span>
            Log out
          </p>
        </Link>
      </div>
    </aside>
  );
};

export default SideNav;
