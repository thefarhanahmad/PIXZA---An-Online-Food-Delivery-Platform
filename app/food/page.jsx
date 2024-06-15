"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { CiPizza } from "react-icons/ci";
import toast from "react-hot-toast";

export default function CreateFood() {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    foodType: "",
    price: { single: "", double: "", regular: "", medium: "", large: "" },
    description: "",
    img: "",
  });
  const router = useRouter();
  // console.log("form data : ", formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("price")) {
      const size = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        price: { ...prev.price, [size]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Food Creating...");

    e.preventDefault();

    try {
      const response = await axios.post(`/api/food`, formData);
      console.log("create food api response : ", response);
      if (response.data.success) {
        toast.success(response.data.message, { id: toastId });
        router.push("/adminDashboard");
      } else {
        toast.error(response.data.message, { id: toastId });
        return;
      }
    } catch (error) {
      console.log("eror in create food : ", error);
      toast.error(error.response.data.message, { id: toastId });
    }
  };

  if (!user?.isAdmin) {
    router.push("/");
  }

  const renderPriceInputs = () => {
    if (formData.category === "SIDES & BEVERAGES") {
      return (
        <div className="flex w-full justify-between">
          <div className="w-[45%]">
            <label className="block text-gray-700">Price (Single)</label>
            <input
              type="text"
              name="price.single"
              value={formData.price.single}
              onChange={handleChange}
              className="pr-10 w-full flex border border-gray-900 text-gray-900 px-5 py-3 outline-none rounded"
              placeholder="Single Price"
            />
          </div>
          <div className="w-[45%]">
            <label className="block text-gray-700">Price (Double)</label>
            <input
              type="text"
              name="price.double"
              value={formData.price.double}
              onChange={handleChange}
              className="pr-10 w-full flex border border-gray-900 text-gray-900 px-5 py-3 outline-none rounded"
              placeholder="Double Price"
            />
          </div>
        </div>
      );
    } else if (formData.category === "Pizza") {
      return (
        <div className="flex w-full justify-between">
          <div className="w-[30%]">
            <label className="block text-gray-700">Price (Regular)</label>
            <input
              type="text"
              name="price.regular"
              value={formData.price.regular}
              onChange={handleChange}
              className="pr-10 w-full flex border border-gray-900 text-gray-900 px-5 py-3 outline-none rounded"
              placeholder="Regular Price"
            />
          </div>
          <div className="w-[30%]">
            <label className="block text-gray-700">Price (Medium)</label>
            <input
              type="text"
              name="price.medium"
              value={formData.price.medium}
              onChange={handleChange}
              className="pr-10 w-full flex border border-gray-900 text-gray-900 px-5 py-3 outline-none rounded"
              placeholder="Medium Price"
            />
          </div>
          <div className="w-[30%]">
            <label className="block text-gray-700">Price (Large)</label>
            <input
              type="text"
              name="price.large"
              value={formData.price.large}
              onChange={handleChange}
              className="pr-10 w-full flex border border-gray-900 text-gray-900 px-5 py-3 outline-none rounded"
              placeholder="Large Price"
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center">
      <div className="bg-white p-8 sm:rounded-lg sm:my-10 my-0 shadow-lg w-full max-w-md">
        <div className="mb-6 flex flex-col gap-2 justify-center items-center">
          <div className="flex gap-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Create Food Item{" "}
            </h2>
            <CiPizza className="text-3xl" />
          </div>

          <span className="text-xs text-center text-gray-500">
            Please fill out the details below to add a new item to the menu.
          </span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="pr-10 w-full flex border border-gray-900 text-gray-900 px-5 py-3 outline-none rounded"
              placeholder="Food Name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="pr-10 w-full flex border border-gray-900 text-gray-900 px-5 py-3 outline-none rounded"
            >
              <option value="">Select Category</option>
              <option value="Pizza">PIZZA</option>
              <option value="SIDES & BEVERAGES">SIDES & BEVERAGES</option>
            </select>
          </div>
          {renderPriceInputs()}
          <div>
            <label className="block text-gray-700">Food Type</label>
            <select
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              className="pr-10 w-full flex border border-gray-900 text-gray-900 px-5 py-3 outline-none rounded"
            >
              <option value="">Select foodType</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="pr-10 w-full flex border border-gray-900 text-gray-900 px-5 py-3 outline-none rounded"
              placeholder="Description"
            />
          </div>
          <div>
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              name="img"
              value={formData.img}
              onChange={handleChange}
              className="pr-10 w-full flex border border-gray-900 text-gray-900 px-5 py-3 outline-none rounded"
              placeholder="Image URL"
            />
          </div>
          <button
            type="submit"
            className="w-full font-semibold flex justify-center items-center bg-orange-500 px-4 py-2 rounded"
          >
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
}
