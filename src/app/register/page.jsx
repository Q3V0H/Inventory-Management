"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@nextui-org/react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const Register = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  async function handleSubmit() {
    const signInData = await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
    });

    if (signInData?.error !== null) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      toast({
        variant: "success",
        title: "Logging in...",
        description: "",
      });
      router.refresh();
      router.push("/dashboard");
    }
  }

  return (
    <>
      <div className="flex justify-between p-4 items-center border-b max-md:flex-wrap">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-trolley.svg"
            width={60}
            height={60}
            alt="Logo"
            className="rounded-full"
          />
        </div>
      </div>

      <div
        className="flex items-center justify-center h-[90vh]"
        style={{
          background: "linear-gradient(180deg, #f0f2fd 0%, #fff8f9 100%)",
        }}
      >
        <div className="relative z-10 flex justify-center max-md:flex-col p-4 w-[90%] m-auto">
          <div className="bg-white p-5 rounded-tl-2xl w-2/3 max-md:w-full rounded-bl-2xl max-md:rounded-xl -ml-4 max-md:ml-0">
            <h3 className="font-semibold text-center">Create Account</h3>
            <div className="mt-5 flex flex-col justify-between items-center h-[90%]">
              <div className="flex gap-5 mt-6 w-full max-md:flex-col">
                <div className="w-full">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    label="Name"
                    variant="bordered"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="w-full">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    label="Email"
                    labelPlacement="outside"
                    variant="bordered"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className=" mt-0 w-full ">
                <div className="">
                  <Label htmlFor="phone">Phone</Label>

                  <Input
                    type="text"
                    label="Phone"
                    labelPlacement="outside"
                    variant="bordered"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-0 w-full">
                <div className="w-full">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    label="Password"
                    variant="bordered"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                </div>
              </div>
              <p className="mt-5">
                Already have an account? Login{" "}
                <span>
                  <Link href="/login" className="text-sky-500">
                    here
                  </Link>{" "}
                </span>{" "}
              </p>
              <div className="mt-5 mb-4 w-full">
                <Button
                  variant="solid"
                  size="md"
                  className="w-full"
                  color="primary"
                  onPress={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
