"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Add = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const router = useRouter();

  async function handleAdd() {
    try {
      const res = await axios.post("/api/expenses/add", {
        name,
        amount: parseInt(amount),
      });

      const { data } = res;

      toast({
        variant: "success",
        title: "Expense added successfully!",
        description: "",
      });

      router.push("/dashboard/expenses");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  return (
    <div className="pl-24 pr-5 max-md:px-0 max-md:pr-3 ml-6 max-md:ml-0">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-center font-semibold">Add Expense</h3>
        <div className="mt-5">
          <div className="flex flex-col">
            <div className="">
              <Label>Name</Label>
              <Input
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="">
              <Label>Amount</Label>
              <Input
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full mt-5">
            <Button
              variant="solid"
              size="md"
              className="w-full"
              color="primary"
              onPress={handleAdd}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
