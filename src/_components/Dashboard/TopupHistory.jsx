import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function TopUp() {
  const [showReport, setShowReport] = useState(false);

  const data = [
    {
      name: "Jan",
      sales: 240, // Adjusted values
      amt: 240, // Adjusted values
    },
    {
      name: "Feb",
      sales: 300, // Adjusted values
      amt: 221, // Adjusted values
    },
    {
      name: "Mar",
      sales: 200, // Adjusted values
      amt: 229, // Adjusted values
    },
    {
      name: "Apr",
      sales: 278, // Adjusted values
      amt: 200, // Adjusted values
    },
    {
      name: "May",
      sales: 189, // Adjusted values
      amt: 218, // Adjusted values
    },
    {
      name: "Jun",
      sales: 239, // Adjusted values
      amt: 250, // Adjusted values
    },
    {
      name: "Jul",
      sales: 240, // Adjusted values
      amt: 240, // Adjusted values
    },
    {
      name: "Aug",
      sales: 300, // Adjusted values
      amt: 221, // Adjusted values
    },
    {
      name: "Sep",
      sales: 200, // Adjusted values
      amt: 229, // Adjusted values
    },
    {
      name: "Oct",
      sales: 278, // Adjusted values
      amt: 200, // Adjusted values
    },
    {
      name: "Nov",
      sales: 189, // Adjusted values
      amt: 218, // Adjusted values
    },
    {
      name: "Dec",
      sales: 240, // Adjusted values
      amt: 240, // Adjusted values
    },
  ];

  return (
    <div className="w-full rounded-lg bg-white shadow-md p-3">
      <div className="flex items-center justify-between mt-5 mb-8 mx-6">
        <p className="text-lg text-dark_blue">Sales</p>
      </div>
      <div className="" style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4285F4" stopOpacity={0.8} />{" "}
                <stop offset="95%" stopColor="#A1CAB9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis domain={[0, 1000]} axisLine={false} tickLine={false} />{" "}
            <CartesianGrid vertical={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#4285F4"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TopUp;
