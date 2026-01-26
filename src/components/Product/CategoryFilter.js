"use client";

import { useProductStore } from "@/libs/useProductStore";
import { motion } from "framer-motion";
import React from "react";

const CategoryFilter = () => {
  const { categories, currentCategory, setCurrentCategory } = useProductStore();
  
  const handleCategory = (category) => {
    const categoryId = category === "All" ? "All" : category.categoryId;
    setCurrentCategory(categoryId);
    console.log("Category:", categoryId);
  };
  
  return (
    categories && categories.length > 0 &&   (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-5"
      > 
      <div className=" flex-wrap hidden md:flex justify-center gap-2 pb-4 overflow-x-auto sm:overflow-visible">
       <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`${
              currentCategory === "All"
                ? "bg-amber-300 text-black shadow-md"
                : "bg-transparent text-amber-300"
            } px-3 md:px-4 lg:px-5 py-1.5 md:py-2 cursor-pointer border border-amber-300 rounded-md whitespace-nowrap min-w-[88px] text-center focus:outline-none focus:ring-2 focus:ring-amber-300`}
            onClick={() => handleCategory("All")}
            aria-pressed={currentCategory === "All"}
            key="all"
          >
            <span>All</span>
          </motion.button>
        {categories.map((category) => (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`${
              currentCategory === category.categoryId
                ? "bg-amber-300 text-black shadow-md"
                : "bg-transparent text-amber-300"
            } px-3 md:px-4 lg:px-5 py-1.5 md:py-2 cursor-pointer border border-amber-300 rounded-md whitespace-nowrap min-w-[88px] text-center focus:outline-none focus:ring-2 focus:ring-amber-300`}
            onClick={() => handleCategory(category)}
            aria-pressed={currentCategory === category.categoryId}
            key={category.categoryId}
          >
            <span>{category.categoryTitle}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
);
};

export default CategoryFilter;
