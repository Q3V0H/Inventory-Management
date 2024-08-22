"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { FileText, Pencil } from "lucide-react";
import { UploadDropzone } from "../../../../_components/util/uploadthing";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@nextui-org/react";
import { Textarea } from "@/components/ui/textarea";

const Add = () => {
  const [fileName, setFileName] = useState("");
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit_of_measure, setMeasure] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [warehouseId, setWarehouseId] = useState("");
  const [productId, setProductId] = useState("");
  const router = useRouter();

  useEffect(() => {
    getWarehouses();
  }, []);

  async function getWarehouses() {
    try {
      const res = await axios.get("/api/warehouses");
      const { data } = res;
      setWarehouses(data?.docs);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAdd() {
    try {
      const res = await axios.post("/api/products/add", {
        name,
        price: parseInt(price),
        quantity: parseInt(quantity),
        unit_of_measure,
        warehouse_id: parseInt(warehouseId),
        description,
        category,
      });

      const { data } = res;

      setProductId(data?.id);

      toast({
        variant: "success",
        title: "Success!",
        description: "Product has been added successfully.",
      });

      router.push("/dashboard/products");
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

  async function addPic() {
    try {
      const res = await axios.post("/api/products/image/add", {
        product_id: parseInt(productId),
        image_url: url,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handlePost() {
    handleAdd();
    // addPic();
  }

  return (
    <div className="pl-24 pr-5 max-md:px-0 max-md:pr-3 ml-6 max-md:ml-0">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] mx-auto">
        <h3 className="text-center font-semibold">Add Product</h3>
        <div className="mt-5">
          <div className="flex gap-5 max-md:flex-col">
            <div className="w-full">
              <Label>Product Name</Label>
              <Input
                placeholder="Enter Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Label>Product Price</Label>
              <Input
                placeholder="Enter Product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <Label>Product Quantity</Label>
            <Input
              placeholder="Enter Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <Label>Unit of Measure</Label>
            <select
              className="border p-2 w-full rounded-md"
              value={unit_of_measure}
              onChange={(e) => setMeasure(e.target.value)}
            >
              <option value="">Select Measure</option>
              <option value="kg">kg</option>
              <option value="box">box</option>
              <option value="bottle">bottle</option>
              <option value="mtr">mtr</option>
              <option value="piece">piece</option>
            </select>
          </div>
          <div className="mt-4">
            <Label>Category</Label>
            <select
              className="border p-2 w-full rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="home_appliances">Home Appliances</option>
              <option value="fashion">Fashion</option>
              <option value="outdoor">Outdoor</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mt-4">
            <Label>Warehouses</Label>
            <select
              className="border p-2 w-full rounded-md"
              value={warehouseId}
              onChange={(e) => setWarehouseId(e.target.value)}
            >
              <option value="">Select Warehouse</option>
              {warehouses.map((warehouse, i) => (
                <option value={warehouse.id}>{warehouse.name}</option>
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
          <div className="mt-6">
            <div className="col-span-full">
              <div className="flex w-full justify-between items-center mb-4">
                <label
                  htmlFor="resource-url"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Upload Image
                </label>
                {url && (
                  <button
                    onClick={() => setUrl("")}
                    type="button"
                    className="flex space-x-2  bg-slate-900 rounded-md shadow text-slate-50  py-2 px-4"
                  >
                    <Pencil className="w-5 h-5" />
                    <span>Change Image</span>
                  </button>
                )}
              </div>
              {url && (
                <Link href={url} target="_blank">
                  <FileText />
                  <span>View Image : {fileName}</span>
                </Link>
              )}
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setUrl(res[0].url);
                  setFileName(res[0]?.name);
                  toast({
                    variant: "success",
                    title: "Success!",
                    description: "Upload complete...",
                  });
                }}
                onUploadError={(error) => {
                  console.log(error);
                  toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your upload.",
                    action: (
                      <ToastAction altText="Try again">Try again</ToastAction>
                    ),
                  });
                }}
              />
            </div>
          </div>
          <div className="mt-5 flex justify-between">
            <Button
              color="secondary"
              variant="solid"
              onPress={() => router.push("/dashboard/products")}
            >
              Cancel
            </Button>
            <Button color="primary" variant="solid" onPress={handlePost}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
