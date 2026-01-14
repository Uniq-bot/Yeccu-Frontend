"use client";
import { useAdminStore } from "@/libs/useAdminStore";
import React from "react";
import { LayoutDashboard, Package, NotebookText, Folders } from "lucide-react";
const Menu = () => {
    const { setCurrComp, currComp } = useAdminStore();

    const getButtonClass = (componentName) => {
        const baseClass = "flex items-center gap-2 px-4 py-2 transition-all hover:cursor-pointer duration-200 font-medium";
        return currComp === componentName
            ? `${baseClass} bg-yellow-400 text-black shadow-lg`
            : `${baseClass} text-gray-300 bg-gray-200/30 hover:bg-gray-600/50`;
    };

    return (
        <div className="bg-black py-3 flex gap-3 items-center justify-start">
            <button
                onClick={() => setCurrComp("dashboard")}
                className={getButtonClass("dashboard")}
            >
                <LayoutDashboard /> Dashboard
            </button>

            <button
                onClick={() => setCurrComp("products")}
                className={getButtonClass("products")}
            >
                <Package /> Products
            </button>

            <button
                onClick={() => setCurrComp("posts")}
                className={getButtonClass("posts")}
            >
                <NotebookText /> Posts
            </button>

            <button
                onClick={() => setCurrComp("categories")}
                className={getButtonClass("categories")}
            >
                <Folders /> Categories
            </button>
        </div>
    );
};

export default Menu;
