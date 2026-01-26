"use client";
import { useAdminStore } from "@/libs/useAdminStore";
import React from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Package, NotebookText, Folders } from "lucide-react";
const Menu = () => {
    const { setCurrComp, currComp } = useAdminStore();

    const getButtonClass = (componentName) => {
        const baseClass = "flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-2 sm:px-4 py-2 hover:cursor-pointer font-medium text-xs sm:text-sm md:text-base";
        return currComp === componentName
            ? `${baseClass} bg-yellow-400 text-black shadow-lg`
            : `${baseClass} text-gray-300 bg-gray-200/30 hover:bg-gray-600/50`;
    };

    return (
        <div className="bg-black py-3 px-2 sm:px-0">
            {/* Desktop: Horizontal menu */}
            <div className="hidden sm:flex gap-2 md:gap-3 items-center justify-start">
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setCurrComp("dashboard")}
                    className={getButtonClass("dashboard")}
                >
                    <LayoutDashboard size={18} /> 
                    <span className="hidden md:inline">Dashboard</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setCurrComp("products")}
                    className={getButtonClass("products")}
                >
                    <Package size={18} /> 
                    <span className="hidden md:inline">Products</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setCurrComp("posts")}
                    className={getButtonClass("posts")}
                >
                    <NotebookText size={18} /> 
                    <span className="hidden md:inline">Posts</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setCurrComp("categories")}
                    className={getButtonClass("categories")}
                >
                    <Folders size={18} /> 
                    <span className="hidden md:inline">Categories</span>
                </motion.button>
            </div>

            {/* Mobile: Grid layout */}
            <div className="grid grid-cols-2 gap-2 sm:hidden">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrComp("dashboard")}
                    className={getButtonClass("dashboard")}
                >
                    <LayoutDashboard size={16} /> 
                    <span>Dashboard</span>
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrComp("products")}
                    className={getButtonClass("products")}
                >
                    <Package size={16} /> 
                    <span>Products</span>
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrComp("posts")}
                    className={getButtonClass("posts")}
                >
                    <NotebookText size={16} /> 
                    <span>Posts</span>
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrComp("categories")}
                    className={getButtonClass("categories")}
                >
                    <Folders size={16} /> 
                    <span>Categories</span>
                </motion.button>
            </div>
        </div>
    );
};

export default Menu;
