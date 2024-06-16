"use client";

import Link from "next/link";
import React from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ItemDetails = ({ params }) => {
  const { id } = params;

  const { data, error } = useSWR(`/api/food/${id}`, fetcher);

  // console.log("data from api : ", data?.data);
  // console.log("error from api : ", error);

  return (
    <div className="bg-gray-200 w-full px-2 sm:px-0 h-full sm:py-20 py-6">
      <div className="flex items-center gap-3 sm:text-3xl text-xl font-bold mb-6 max-w-sm mx-auto">
        <Link href={"/"}>
          <IoArrowBackCircleOutline className="" />
        </Link>
        <h1 className="">Food Details</h1>
      </div>
      <div className="max-w-sm mx-auto bg-white shadow-lg p-4 rounded-lg overflow-hidden">
        <img
          className="w-full h-48 object-cover"
          src={data?.data?.img}
          alt={data?.data?.name}
        />
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-900">
            {data?.data?.name}
          </h2>
          <p className="mt-2 text-gray-600">{data?.data?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
