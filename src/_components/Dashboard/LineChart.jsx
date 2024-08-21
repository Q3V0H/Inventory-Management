"use client";
import React from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";

const LineGraph = () => {
  const data = [
    {
      name: "Jan",
      users: 4000,
      number: 2400,
    },
    {
      name: "Feb",
      users: 3000,
      number: 2210,
    },
    {
      name: "Mar",
      users: 2000,
      number: 2290,
    },
    {
      name: "Apr",
      users: 2780,
      number: 2000,
    },
    {
      name: "May",
      users: 1890,
      number: 2181,
    },
    {
      name: "Jun",
      users: 2390,
      number: 2500,
    },
    {
      name: "Jul",
      users: 1050,
      number: 2100,
    },
    {
      name: "Aug",
      users: 3490,
      number: 2100,
    },
    {
      name: "Sept",
      users: 3000,
      number: 2100,
    },
    {
      name: "Oct",
      users: 1000,
      number: 2100,
    },
    {
      name: "Nov",
      users: 1590,
      number: 2100,
    },
    {
      name: "Dec",
      users: 2700,
      number: 1000,
    },
  ];
  return (
    <div className="w-full rounded-lg bg-white shadow-md p-3">
      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" /> */}
            <Line type="monotone" dataKey="users" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineGraph;
