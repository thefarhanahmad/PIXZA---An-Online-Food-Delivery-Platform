import React, { useState } from "react";
import ProductCard from "./ProductCard";

const CategorySection = ({ category, product }) => {
  // console.log("category ", category);

  return (
    <div className="">
      <h1 className="mt-5 mb-3 w-[96%] shadow text-3xl font-semibold bg-gradient-to-r from-orange-200 to-transparent text-orange-700 p-2">
        {category}
      </h1>
      <div>
        <div className="flex flex-wrap justify-start items-center  gap-5 w-full">
          {product?.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
