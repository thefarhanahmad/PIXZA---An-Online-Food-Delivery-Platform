"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function UpdateFood({ params }) {
  const { id } = params;
  // console.log("id from params : ", id);
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  if (!user?.isAdmin) {
    router.push("/");
  }

  const getFoodById = async () => {
    try {
      const response = await axios.get(`/api/food/${id}`);
      const food = response.data.data;
      // console.log("data from api : ", food);
      if (response.data.success) {
        if (food.category == "SIDES & BEVERAGES") {
          setFormData({
            name: food?.name,
            category: food?.category,
            foodType: food?.foodType,
            description: food?.description,
            img: food?.img,
            price: { single: food.price.single, double: food.price.double },
          });
        }
        if (food.category == "Pizza") {
          setFormData({
            name: food?.name,
            category: food?.category,
            foodType: food?.foodType,
            description: food?.description,
            img: food?.img,
            price: {
              regular: food.price.regular,
              medium: food.price.medium,
              large: food.price.large,
            },
          });
        }
      }
    } catch (error) {
      console.log("error in finding food by id : ", error);
    }
  };

  useEffect(() => {
    getFoodById();
  }, [id]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    foodType: "",
    price: { single: "", double: "", regular: "", medium: "", large: "" },
    description: "",
    img: "",
  });
  console.log("form data : ", formData);
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
    const toastId = toast.loading("Food Updating...");

    try {
      const response = await axios.put(`/api/food/${id}`, formData);
      // console.log("update food api response : ", response);
      if (response.data.success) {
        toast.success(response.data.message, { id: toastId });
        router.push("/adminDashboard");
      } else {
        toast.error(response.data.message, { id: toastId });
        return;
      }
    } catch (error) {
      console.log("eror in updating food : ", error);
      toast.error(error.response.data.message, { id: toastId });
    }
  };

  const renderPriceInputs = () => {
    if (formData.category === "SIDES & BEVERAGES") {
      return (
        <div className=" flex w-full justify-between">
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
        <div className=" flex w-full justify-between">
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
      <div className="bg-white p-8 sm:rounded-lg my-0 sm:my-10 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Food Item</h2>
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
            Update Food
          </button>
        </form>
      </div>
    </div>
  );
}
