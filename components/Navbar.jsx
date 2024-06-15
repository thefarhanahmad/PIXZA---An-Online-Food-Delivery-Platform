"use client";

import dynamic from "next/dynamic";
import { VscHome, VscInfo } from "react-icons/vsc";
import { setUser } from "@/lib/features/auth/authSlice";
import {
  MdAddCircleOutline,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GiFullPizza } from "react-icons/gi";
import { RiListCheck, RiUser3Line } from "react-icons/ri";
import { FiUserPlus, FiUser, FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import axios from "axios";

function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);
  const { token, user } = useSelector((state) => state.auth);
  const [dialog, setDialog] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const dialogRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user/profile");
        if (response.data.success) {
          dispatch(setUser(response?.data?.user));
        }
      } catch (error) {
        console.log("Error while getting user: ", error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token, dispatch]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setDialog(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // if (!isMounted) {
  //   return null;
  // }

  return (
    <header
      ref={dialogRef}
      className="w-full bg-white text-black py-4 md:py-5 shadow-md sticky top-0 z-30"
    >
      <div className="container mx-auto flex flex-col items-center justify-between  px-4  md:flex-row md:px-6">
        <Link className="flex text-orange-600 items-center gap-2" href="/">
          <GiFullPizza className="h-8 w-8" />
          <span className="text-xl font-bold">PIXZA</span>
        </Link>
        <div className="mt-4  flex  items-center sm:gap-4 gap-2 md:mt-0">
          <Link
            className={`flex flex-col sm:flex-row h-full gap-1  sm:gap-2 items-center relative py-1 rounded px-1 justify-center sm:px-4  ${
              pathname === "/"
                ? "sm:border border-b border-orange-400"
                : "border-none"
            }`}
            href="/"
          >
            <VscHome className="h-5 w-5" />
            <span className=" sm:inline">Home</span>
          </Link>
          <Link
            className={`flex flex-col sm:flex-row h-full gap-1  sm:gap-2 items-center relative py-1 rounded px-1 justify-center sm:px-4  ${
              pathname === "/about"
                ? "sm:border border-b border-orange-400"
                : "border-none"
            }`}
            href="/about"
          >
            <VscInfo className="h-5 w-5" />
            <span className=" sm:inline">About</span>
          </Link>
          <div>
            {user?.isAdmin ? (
              <Link
                className={`flex flex-col sm:flex-row h-full gap-1  sm:gap-2 items-center relative py-1 rounded px-1 justify-center sm:px-4  ${
                  pathname === "/food"
                    ? "sm:border border-b border-orange-400"
                    : "border-none"
                }`}
                href="/food"
              >
                <MdAddCircleOutline className="h-5 w-5" />
                <span className=" sm:inline text-center text-xs sm:text-base">
                  Add Food
                </span>
              </Link>
            ) : (
              <Link
                className={`flex flex-col sm:flex-row h-full gap-1  sm:gap-2 items-center relative py-1 rounded px-1 justify-center sm:px-4  ${
                  pathname === "/cart"
                    ? "sm:border border-b border-orange-400"
                    : "border-none"
                }`}
                href="/cart"
              >
                <FiShoppingCart className="h-5 w-5" />
                <span className=" sm:inline">Cart</span>
                {cartItems.length > 0 && (
                  <div className="absolute -top-3 -right-1">
                    <span className="absolute flex items-center justify-center w-5 h-5 text-xs bg-orange-500 border rounded-full -top-0 -right-1 animate-bounce">
                      {cartItems.length}
                    </span>
                  </div>
                )}
              </Link>
            )}
          </div>

          {token ? (
            user?.isAdmin ? (
              <Link
                className={`flex sm:flex-row  flex-col text-center relative cursor-pointer z-50 items-center gap-2 sm:bg-gray-300 px-1 justify-center sm:px-4  py-1 rounded  ${
                  pathname === "/adminDashboard"
                    ? "sm:border border-b border-orange-400"
                    : "border-none"
                }`}
                href="/adminDashboard"
              >
                <MdOutlineAdminPanelSettings className="h-5 w-5" />
                <span className=" sm:inline text-xs sm:text-base">
                  Admin Panel
                </span>
              </Link>
            ) : (
              <Link
                className={`flex flex-col sm:flex-row h-full gap-1  sm:gap-2 items-center py-1 rounded px-1 justify-center sm:px-4  ${
                  pathname === "/orders"
                    ? "sm:border border-b border-orange-400"
                    : "border-none"
                }`}
                href="/orders"
              >
                <RiListCheck className="h-5 w-5" />
                <span className=" sm:inline">Orders</span>
              </Link>
            )
          ) : (
            <Link
              className={`flex flex-col sm:flex-row h-full gap-1  sm:gap-2 items-center py-1 rounded px-1 justify-center sm:px-4  ${
                pathname === "/login"
                  ? "sm:border border-b border-orange-400"
                  : "border-none"
              }`}
              href="/login"
            >
              <FiUser className="h-5 w-5" />
              <span className=" sm:inline">Login</span>
            </Link>
          )}
          {token ? (
            <div
              onClick={() => setDialog(!dialog)}
              className=" justify-center flex  relative cursor-pointer z-50 items-center gap-2 bg-gray-200 rounded-full p-2"
            >
              <div className=" w-full flex h-full justify-center items-start">
                <RiUser3Line className="h-6 text-xl w-6 " />
              </div>
              <dialog
                className="absolute sm:top-[140%] top-[175%] bg-gray-300 rounded -left-[20%] -translate-x-[70%] w-fit h-fit p-6"
                open={dialog}
              >
                <span className="w-8 h-8 absolute rotate-45  rounded bg-gray-300 -top-1 right-2"></span>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/profile"
                    className="inline-flex  relative cursor-pointer z-50 items-center gap-2 bg-gray-400 px-1 justify-center sm:px-4  py-1 rounded"
                  >
                    <RiUser3Line className="h-5 w-5" />
                    <span className=" sm:inline">Profile</span>
                  </Link>
                  <LogoutBtn />
                </div>
              </dialog>
            </div>
          ) : (
            <Link
              className={`flex flex-col  sm:bg-orange-500 sm:flex-row h-full gap-1  sm:gap-2 items-center py-1 rounded px-1 justify-center sm:px-4  ${
                pathname === "/signup"
                  ? "sm:border-2 border-b-2 border-orange-700"
                  : "border-none"
              }`}
              href="/signup"
            >
              <FiUserPlus className="h-5 w-5" />
              <span className=" sm:inline">Signup</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
