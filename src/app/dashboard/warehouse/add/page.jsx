"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@nextui-org/react";
import axios from "axios";

const Page = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [managers, setManagers] = useState([]);
  const [description, setDescription] = useState("");
  const [managerId, setManagerId] = useState("");

  useEffect(() => {
    getMembers();
  }, []);

  async function getMembers() {
    try {
      const res = await axios.get("/api/users");

      const { data } = res;

      setManagers(data?.docs);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(){
    try {
        
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="pl-24 pr-5 max-md:px-0 max-md:pr-3 ml-6 max-md:ml-0">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="font-semibold text-center mb-6">Add Warehouse</h3>
        <div className="flex w-full gap-5 max-md:flex-col">
          <div className="w-full">
            <Label>Warehouse Name</Label>
            <Input
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full">
            <Label>Warehouse Location</Label>
            <Input
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <Label>Select Managers</Label>
          <select
            className="border p-2 w-full rounded-md"
            value={managerId}
            onChange={(e) => setManagerId(e.target.value)}
          >
            <option value="">Select Manager</option>
            {managers.map((option, i) => (
              <option value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <Label>Description</Label>
          <Textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <Button color="secondary">Cancel</Button>
          <Button color="primary">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
