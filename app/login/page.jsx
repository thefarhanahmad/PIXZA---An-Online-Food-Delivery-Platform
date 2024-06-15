"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setToken } from "@/lib/features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    email: "testUser@gmail.com",
    password: "121212",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
    }
  }, []);

  // console.log("form data : ", formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...");
    // console.log("form Data : ", formData);
    try {
      const response = await axios.post("/api/user/login", formData);
      // console.log("login response ", response);
      if (response.data.success) {
        toast.success(response.data.message, { id: toastId });
        if (mounted) {
          localStorage.setItem("token", response.data.token);
        }
        dispatch(setToken(response.data.token));
        router.push("/");
      } else {
        toast.error(response.data.message, { id: toastId });
        return;
      }
    } catch (error) {
      console.log("error while login user", error);
      toast.error(error.response.data.message, { id: toastId });
    }
  };

  return (
    <div className="grid sm:min-h-[100dvh] grid-cols-1 ">
      {/* login page */}
      <div className="flex items-center justify-center bg-gradient-to-br from-orange-500 to-purple-500 sm:p-8 lg:p-12">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-1 max-w-md space-y-4 bg-white px-6 py-8 sm:p-10 sm:rounded-xl"
        >
          <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
          <p className="text-gray-700">Sign in to your account to continue.</p>
          <div onSubmit={handleSubmit} className="space-y-4">
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
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center font-semibold bg-orange-500 px-4 py-2 rounded"
          >
            Log in
          </button>
          <div className="text-center text-gray-700">
            <div>
              Don't have an account ?{" "}
              <Link
                href="signup"
                className="font-medium text-blue-500 hover:underline"
                prefetch={false}
              >
                Sign up
              </Link>
            </div>
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

export default Login;
