"use client";

import React, { useState } from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import TopNav from "../../_components/Sidebar/TopBar";
import SideNav from "../../_components/Sidebar/SideNav";
import useApp from "../../_components/hooks/useApp";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import AppContext from "@/_components/context/AppContext";
import useDevice from "@/_components/hooks/useDevice";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "700", "600"],
});

export default function Dashboard({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const device = useDevice();
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SessionProvider>
      <AppContext.Provider
        value={{ isSidebarOpen, setIsSidebarOpen, toggleSidebar, device }}
      >
        <div
          className={cn(
            "flex min-h-screen overflow-y-hidden",
            poppins.className
          )}
        >
          <SideNav isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="flex-grow w-full">
            <TopNav toggleSidebar={toggleSidebar} />
            <main
              style={{
                background: "linear-gradient(180deg, #f0f2fd 0%, #fff8f9 100%)",
              }}
              className="flex flex-col h-full overflow-y-hidden"
            >
              <div className="ml-24 mb-4 mt-24  max-md:ml-4">{children}</div>
            </main>
          </div>
        </div>
      </AppContext.Provider>
    </SessionProvider>
  );
}
