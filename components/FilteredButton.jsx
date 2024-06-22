"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const FilteredButton = ({ items, setItems }) => {
  const [data, setData] = useState([]);

  // GETTING ALL FOODS
  const getAllFoods = async () => {
    try {
      const response = await axios.get("/api/food");
      // console.log("foods response homepage : ", response);
      if (response.data.success) {
        setData(response?.data?.data);
      }
    } catch (error) {
      console.log("error on getting all foods homepage ", error);
    }
  };

  useEffect(() => {
    getAllFoods();
  }, []);
  const [active, setActive] = useState("All");
  // console.log("active : ", active);

  // function to filter products, such as veg,nonveg or all
  const filterProduct = (type) => {
    // console.log("type = ", type);
    if (type === "All") {
      setActive("All");
      const filteredProduct = data?.filter((item) => item.foodType);
      setItems(filteredProduct);
    } else {
      setActive(type);
      const filteredProduct = data?.filter((item) => item.foodType === type);
      setItems(filteredProduct);
    }
  };

  // useeffect handler
  useEffect(() => {
    const filteredProduct = data?.filter((item) => item.foodType);
    setItems(filteredProduct);
  }, [data]);

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex gap-4 mt-2 sm:mt-0">
        <button
          onClick={() => filterProduct("All")}
          className={`${
            active === "All"
              ? "bg-orange-400 border-2 border-orange-700"
              : "bg-orange-50"
          } border px-4 py-1 rounded border-orange-500 text-black text-xl w-fit `}
        >
          All
        </button>
        <button
          onClick={() => filterProduct("Veg")}
          className={`${
            active === "Veg"
              ? "bg-orange-400 border-2 border-orange-700"
              : "bg-orange-50"
          } border px-4 py-1 rounded border-orange-500 text-black text-xl w-fit `}
        >
          Veg
        </button>
        <button
          onClick={() => filterProduct("Non-Veg")}
          className={`${
            active === "Non-Veg"
              ? "bg-orange-400 border-2 border-orange-700"
              : "bg-orange-50"
          } border px-4 py-1 rounded border-orange-500 text-black text-xl w-fit `}
        >
          NonVeg
        </button>
      </div>
    </div>
  );
};

export default FilteredButton;
