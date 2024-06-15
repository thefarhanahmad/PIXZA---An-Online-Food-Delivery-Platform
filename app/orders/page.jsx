"use client";

import { Spinner } from "@/components/Spinner";
import Link from "next/link";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import React from "react";

import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const OrdersPage = () => {
  const { data, error } = useSWR("/api/foodOrders", fetcher);
  // console.log("my order data  : ", data);

  if (!data) {
    return <Spinner />;
  }
  return (
    <div className="bg-gray-200 h-full">
      <div className="container  mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {data?.data?.length === 0 ? (
          <div>Yor Have Not Ordered anything!</div>
        ) : (
          <div>
            <div className="flex items-center gap-3 text-3xl font-bold mb-6 ">
              <Link href={"/"}>
                <IoArrowBackCircleOutline className="" />
              </Link>
              <h1 className="">Your Orders</h1>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-500 dark:bg-gray-500">
                    <th className="px-4 py-2 text-left">#</th>
                    <th className="px-4 py-2 text-left">Food</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left hidden sm:inline">
                      Quantity
                    </th>
                    <th className="px-4 py-2 text-left">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 dark:border-gray-700"
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">
                        <img
                          src={item?.img}
                          alt={item?.name}
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2">{item?.name}</td>
                      <td className="px-4 py-2 hidden sm:inline text-center">
                        {item?.quantity}
                      </td>
                      <td className="px-4 py-2">${item?.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
