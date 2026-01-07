"use client";

import { useProductStore } from "@/libs/useProductStore";
import React from "react";

const CategoryFilter = () => {
  const { categories, currentCategory, setCurrentCategory, filterProductsByCategory, filteredProducts } = useProductStore();
  const handleCategory = (category) => {
    setCurrentCategory(category);
    const filtered = filterProductsByCategory();
    console.log("Category:", category);
    console.log("Filtered Products:", filtered);
  };
  return (
    <div>
      <div className="flex justify-center space-x-4  pb-4">
        {categories.map((category, id) => (
          <button
            className={`${
              currentCategory === category
                ? "bg-amber-300 text-black scale-105 -translate-y-[1px]"
                : "bg-transparent text-amber-300"
            } px-2 transition-all cursor-pointer hover:scale-105 border-amber-300 border py-1`}
            onClick={() => handleCategory(category)}
            key={id}
          >
            <span>{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
