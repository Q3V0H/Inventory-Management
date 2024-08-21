"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@nextui-org/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(session?.user?.phone || "");
  const [id, setId] = useState(null);

  const validateEmail = (email) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  useEffect(() => {
    if (session?.user?.phone) {
      getUser(session?.user?.phone);
    }
  }, [session]);

  async function getUser(phone) {
    try {
      const res = await axios.get("/api/users/single", {
        params: {
          phone,
        },
      });

      const { data } = res;

      setName(data?.name);
      setEmail(data?.email);
      setId(data?.id);
      setPhone(data?.phone);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit() {
    try {
      const res = await axios.put("/api/users/update", {
        id: parseInt(id),
        name,
        email,
        password,
        phone,
      });

      toast({
        variant: "success",
        title: "Success!",
        description: "Profile has been updated successfully.",
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  return (
    <div className="pl-24 pr-5 w-full max-md:px-0 max-md:pr-3 ml-6 max-md:ml-0 overflow-x-auto">
      <div className="flex flex-col space-y-6 rounded-lg shadow-2xl bg-white p-5 w-[85%] m-auto max-md:w-[95%]">
        <h3 className="text-center font-semibold text-xl">User Profile</h3>

        <div className="flex gap-5 max-md:flex-wrap max-md:w-full">
          <div className="w-full">
            <Label>Name</Label>

            <Input
              type="text"
              label="Name"
              variant="bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Full Name"
            />
          </div>

          <div className="w-full">
            <Label>Email</Label>

            <Input
              type="email"
              label="Email"
              variant="bordered"
              isInvalid={isInvalid}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
            />
          </div>
        </div>
        <div className="mt-4">
          <Label>Phone</Label>
          <Input
            type="text"
            label="Phone"
            variant="bordered"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Phone Number"
          />
        </div>
        <div className="mt-4">
          <Label>Role</Label>
          <Input
            type="text"
            label="Role"
            variant="bordered"
            value={session?.user?.role}
            isDisabled
          />
        </div>

        <div className="">
          <Label>Password</Label>
          <Input
            type="password"
            label="Password"
            variant="bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </div>
        <div className="mt-2 w-full flex items-center justify-center">
          <Button
            variant="solid"
            size="md"
            className="w-full"
            color="primary"
            onPress={handleSubmit}
          >
            Update Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
