"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Signing in...");
    // console.log("form Data : ", formData);
    try {
      const response = await axios.post("/api/user/signup", formData);
      console.log("signup response ", response.data);
      if (response.data.success) {
        toast.success(response.data.message, { id: toastId });
        router.push("/login");
      } else {
        toast.error(response.data.message, { id: toastId });
        return;
      }
    } catch (error) {
      console.log("error while signup user", error);
      toast.error(error.response.data.message, { id: toastId });
    }
  };

  return (
    <div className="grid sm:min-h-[100dvh] grid-cols-1 ">
      {/* signup page */}
      <div className="flex items-center justify-center bg-gradient-to-br from-orange-500 to-purple-500 sm:p-8 lg:p-12">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-1 max-w-md space-y-4 bg-white sm:p-10 px-6 py-8 sm:rounded-xl"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Create an account
          </h1>
          <p className="text-gray-700">Get started with our platform today.</p>
          <div className="space-y-4">
            <div className="relative">
              <input
                onChange={(e) => handleChange(e)}
                value={formData.name}
                name="name"
                id="name"
                type="text"
                placeholder="Name"
                className="pr-10 w-full flex border border-gray-900 text-gray-900 px-5 py-3 outline-none rounded"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <UserIcon className="h-5 w-5 text-gray-600" />
              </div>
            </div>
            <div className="relative">
              <input
                onChange={(e) => handleChange(e)}
                value={formData.email}
                name="email"
                id="email"
                type="email"
                placeholder="Email address"
                className="pr-10 w-full flex border border-gray-900 text-gray-900 px-5 py-3 outline-none rounded"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <MailIcon className="h-5 w-5 text-gray-600" />
              </div>
            </div>
            <div className="relative">
              <input
                onChange={(e) => handleChange(e)}
                value={formData.password}
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                className="pr-10 w-full flex border border-gray-900 text-gray-900 px-5 py-3 outline-none rounded"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <LockIcon className="h-5 w-5 text-gray-600" />
              </div>
            </div>
            <div className="relative">
              <input
                onChange={(e) => handleChange(e)}
                value={formData.location}
                name="location"
                id="location"
                type="text"
                placeholder="Location"
                className="pr-10 w-full flex border border-gray-900 text-gray-900 px-5 py-3 outline-none rounded"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <LocationIcon className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center font-semibold bg-orange-500 px-4 py-2 rounded"
          >
            Sign Up
          </button>
          <div className="text-center text-gray-700">
            <p>
              Already have an account ?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-500 hover:underline"
                prefetch={false}
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LocationIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 6.25 7 13 7 13s7-6.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export default SignUp;
