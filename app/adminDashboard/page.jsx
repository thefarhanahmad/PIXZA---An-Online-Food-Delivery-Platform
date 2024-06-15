"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { MdAddCircleOutline, MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import toast from "react-hot-toast";
import { IoEyeOutline } from "react-icons/io5";

export default function AdminDashboard() {
  const [view, setView] = useState("USERS");
  const [users, setUsers] = useState([]);
  const [foods, setFoods] = useState([]);
  const { user } = useSelector((state) => state.auth);
  // console.log("user in admin dashboard : ", user);
  const router = useRouter();
  useEffect(() => {
    if (view === "USERS") {
      fetchUsers();
    } else {
      fetchFoods();
    }
  }, [view]);

  // GET ALL USERS
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/user");
      // console.log("getting all users response : ", response);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // GET ALL FOODS
  const fetchFoods = async () => {
    try {
      const response = await axios.get("/api/food");
      // console.log("getting all foods response : ", response);
      setFoods(response.data.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  // DELETE USER
  const deleteUser = async (userId) => {
    const toastId = toast.loading("Deleting user...");
    try {
      const response = await axios.delete(`/api/user/${userId}`);
      // console.log("delete users response : ", response);
      if (response.data.success) {
        toast.success(response.data.message, { id: toastId });
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        toast.error("something went wrong", { id: toastId });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.response.data.message, { id: toastId });
    }
  };

  // DELETE FOOD
  const deleteFood = async (foodId) => {
    const toastId = toast.loading("Deleting food...");
    try {
      const response = await axios.delete(`/api/food/${foodId}`);
      // console.log("delete food response : ", response);
      if (response.data.success) {
        toast.success(response.data.message, { id: toastId });
        setFoods(foods.filter((food) => food._id !== foodId));
      } else {
        toast.error("something went wrong", { id: toastId });
      }
    } catch (error) {
      console.error("Error deleting food:", error);
      toast.error(error.response.data.message, { id: toastId });
    }
  };

  if (!user?.isAdmin) {
    router.push("/");
  }

  return (
    <div className="h-full text-black bg-gray-200 sm:px-4 px-1 text-xs sm:text-base py-4 sm:py-8">
      <div className="container mx-auto">
        <div className="flex justify-evenly  items-center mb-6">
          <button
            onClick={() => setView("USERS")}
            className={`px-4 py-2 rounded sm:w-[40%] ${
              view === "USERS" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            VIEW ALL USERS
          </button>
          <button
            onClick={() => setView("FOODS")}
            className={`px-4 py-2 rounded sm:w-[40%] ${
              view === "FOODS" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            VIEW FOODS
          </button>
        </div>
        {view === "USERS" ? (
          <div className="">
            <h2 className="text-xl font-bold mb-4">Users</h2>
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="py-2 sm:px-4 px-1 text-xs sm:text-base border-b text-center">
                    Name
                  </th>
                  <th className="py-2 sm:px-4 px-1 text-xs sm:text-base border-b text-center">
                    Email
                  </th>
                  <th className="py-2 sm:px-4 px-1 text-xs sm:text-base border-b text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user._id}>
                    <td className="py-2 sm:px-4 px-1 text-xs sm:text-base border-b text-center">
                      {user.name}
                    </td>
                    <td className="py-2 sm:px-4 px-1 text-xs sm:text-base border-b text-center">
                      {user.email}
                    </td>
                    <td className="py-2 sm:px-4 px-1 text-xs sm:text-base border-b text-center">
                      {user.isAdmin ? (
                        <Link
                          href={"/profile"}
                          className="sm:px-2 px-1 py-1  w-fit text-xs sm:text-s flex-col sm:flex-row flex items-center justify-center gap-1 mx-auto bg-orange-500 text-white rounded"
                        >
                          <IoEyeOutline className="text-xs sm:text-base" />
                          <span className="text-xs sm:text-base">
                            View Profile
                          </span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="sm:px-2 px-1 py-1  text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1 mx-auto bg-red-500 text-white rounded"
                        >
                          <MdOutlineDeleteOutline className="text-xs sm:text-base" />
                          <span className="text-xs sm:text-base">
                            Delete User
                          </span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Foods</h2>
              <Link
                href={"/food"}
                className="sm:px-4 px-1 py-2 flex justify-center items-center gap-2  bg-green-500 text-white rounded"
              >
                <MdAddCircleOutline className=" text-lg sm:text-2xl" />
                <span>Add Food</span>
              </Link>
            </div>
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="py-2 sm:px-4 px-1 text-xs sm:text-base border-b text-start">
                    Name
                  </th>
                  <th className="py-2 sm:px-4 px-1 text-xs sm:text-base border-b text-start">
                    Category
                  </th>
                  <th className="py-2 sm:px-4 px-1 text-xs sm:text-base border-b text-start">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {foods.map((food) => (
                  <tr key={food._id}>
                    <td className="py-2 sm:px-4 px-1 text-xs sm:text-base border-b">
                      {food.name}
                    </td>
                    <td className="py-2 sm:px-4 px-1 text-xs sm:text-base border-b">
                      {food.category}
                    </td>
                    <td className="py-2 sm:px-4 px-1 text-xs w-fit sm:text-base border-b flex gap-1 sm:gap-4 justify-center items-center">
                      <Link
                        href={`/food/${food._id}`}
                        className="sm:px-2 px-1 py-1  text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1 mx-auto bg-yellow-700 text-white rounded"
                      >
                        <FiEdit3 />
                        <span>Edit</span>
                      </Link>
                      <button
                        onClick={() => deleteFood(food._id)}
                        className="sm:px-2 px-1 py-1  text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1 mx-auto bg-red-500 text-white rounded"
                      >
                        <MdOutlineDeleteOutline />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
