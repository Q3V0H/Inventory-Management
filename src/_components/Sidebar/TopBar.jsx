import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

import { usePathname } from "next/navigation";

const TopNav = ({ toggleSidebar }) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Function to extract initials from the name
  const getInitials = (name) => {
    if (!name) return "";

    const nameParts = name.split(" ");
    const firstInitial = nameParts[0].charAt(0).toUpperCase();
    const lastInitial =
      nameParts.length > 1
        ? nameParts[nameParts.length - 1].charAt(0).toUpperCase()
        : "";

    return firstInitial + lastInitial;
  };

  // Render initials in AvatarFallback
  const initials = session?.user?.name ? getInitials(session.user.name) : "";

  // Generate breadcrumbs based on current path
  const pathSegments = pathname?.split("/").filter(Boolean) || [];
  const breadcrumbs = [...pathSegments].map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    return (
      <BreadcrumbItem key={index} href={index === 0 ? "/dashboard" : href}>
        {segment.charAt(0).toUpperCase() + segment.slice(1)}
      </BreadcrumbItem>
    );
  });

  return (
    <header className="fixed top-0 left-0 right-0 p-5 z-10 flex justify-between items-center border-b">
      {/* Breadcrumb */}
      <div className="hidden md:flex ml-48">
        <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
      </div>

      <div
        className="md:hidden p-2 cursor-pointer rounded-md border focus:outline-none focus:bg-gray-700"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </div>

      <nav className="flex space-x-4">
        <a href="/" className="flex items-center gap-2 text-gray-800">
          <IoCartOutline className="text-2xl" />
        </a>
        <p className="flex items-center gap-2 text-gray-800">
          {session?.user?.role || "User"}
        </p>
      </nav>
    </header>
  );
};

export default TopNav;
