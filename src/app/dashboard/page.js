"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LineGraph from "@/_components/Dashboard/LineChart";
import Sales from "@/_components/Dashboard/TopupHistory";

export default function Home() {
  const { data: session } = useSession();
  const [timeOfDay, setTimeOfDay] = useState("Morning");
  const [name, setName] = useState("there!");

  useEffect(() => {
    const getCurrentTimeOfDay = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        return "Morning";
      } else if (currentHour >= 12 && currentHour < 18) {
        return "Afternoon";
      } else {
        return "Evening";
      }
    };

    setTimeOfDay(getCurrentTimeOfDay());
  }, []);

  return (
    <div className="flex min-h-screen w-full mt-5 flex-col pl-28 pr-5 max-md:w-full max-md:p-2">
      <div className="flex mx-3 justify-between items-center max-md:flex-wrap max-md:w-full max-md:mx-auto"></div>
      <div className="">
        <h2 className="font-medium text-2xl">{`Good ${timeOfDay}, ${
          session?.user?.name || name
        }`}</h2>
      </div>

      <div className="mt-4">
        <LineGraph />
      </div>
      <div className="mt-5">
        <Sales />
      </div>
    </div>
  );
}
