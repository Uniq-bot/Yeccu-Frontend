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
    <div className="pt-5"> 
      <div className=" flex-wrap hidden md:flex justify-center gap-2 pb-4 overflow-x-auto sm:overflow-visible">
        {categories.map((category, id) => (
          <button
            className={`${
              currentCategory === category
                ? "bg-amber-300 text-black scale-105 -translate-y-[1px] shadow-md"
                : "bg-transparent text-amber-300"
            } px-3 md:px-4 lg:px-5 py-1.5 md:py-2 transition-transform duration-150 cursor-pointer hover:scale-105 border border-amber-300 rounded-md whitespace-nowrap min-w-[88px] text-center focus:outline-none focus:ring-2 focus:ring-amber-300`}
            onClick={() => handleCategory(category)}
            aria-pressed={currentCategory === category}
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
