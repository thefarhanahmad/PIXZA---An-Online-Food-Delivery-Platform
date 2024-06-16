"use client";
import React, { useEffect, useState } from "react";
import FilteredButton from "./FilteredButton";
import CategorySection from "./CategorySection";

const Products = () => {
  const [items, setItems] = useState([]);
  const [pizza, setPizza] = useState([]);
  const [beverages, setBeverages] = useState([]);
  // console.log("food items products : ", items);

  // function to filter products by category
  const filterProductByCategory = (type) => {
    const category = items?.filter((item) => item.category === type);
    if (type === "Pizza") {
      setPizza(category);
    }
    if (type === "SIDES & BEVERAGES") {
      setBeverages(category);
    }
  };

  useEffect(() => {
    filterProductByCategory("Pizza");
    filterProductByCategory("SIDES & BEVERAGES");
  }, [items]);

  return (
    <div className=" w-full bg-gray-200">
      <div className="sm:w-11/12 mx-auto  sm:p-6 p-4">
        <FilteredButton items={items} setItems={setItems} />

        {/* products by category */}
        {items?.length === 0 ? (
          <div className="text-2xl font-semibold text-black my-6">
            Loading...
          </div>
        ) : (
          <>
            <CategorySection category={"Pizza"} product={pizza} />
            <CategorySection
              category={"SIDES & BEVERAGES"}
              product={beverages}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
