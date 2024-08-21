"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const Contact = () => {
  return (
    <div className="bg-slate-100 mt-12 p-5" id="contact">
      <h3 className="text-center font-semibold">Contact Us</h3>
      <div className="w-[70%] mx-auto p-6 max-md:w-full">
        <div className="flex flex-col gap-5 max-md:flex-wrap w-full m-auto">
          <div className="flex justify-between gap-5 max-md:flex-col">
            <div className="w-full">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                label="Name"
                labelPlacement="outside"
                variant="bordered"
                placeholder="Enter name"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                label="Email"
                labelPlacement="outside"
                variant="bordered"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div className="w-full">
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              label="Subject"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Enter subject"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="message">Message</Label>
            <Textarea placeholder="Type your message here." />
          </div>
        </div>
        <div className="mt-5 mb-4">
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
