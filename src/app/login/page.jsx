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

const Login = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
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
        <div className="w-2/5 bg-white p-4 rounded-lg shadow-2xl max-md:w-[90%]">
          <h3 className="font-bold text-center mt-4 text-2xl">Login Here</h3>
          <div className="mt-5 w-full space-y-8">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                label="Email"
                variant="bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={"password"}
              />
            </div>

            <div className="flex items-center justify-between max-md:flex-wrap">
              <div className="flex items-center space-x-2 mt-1">
                <Checkbox
                  size="md"
                  value={remember}
                  onChange={(e) => setRemember(e.target.value)}
                  id="remember"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none"
                >
                  Remember Me?
                </label>
              </div>
              <Link href="">Forgot password?</Link>
            </div>

            <p className="mt-5">
              Don't have an account? Sign Up{" "}
              <span>
                <Link href="/register" className="text-sky-500">
                  here
                </Link>{" "}
              </span>{" "}
            </p>

            <div className="mt-2 w-full flex items-center justify-center">
              <Button
                variant="solid"
                size="md"
                className="w-full"
                color="primary"
                onPress={handleSubmit}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
