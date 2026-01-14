import CategoriesAdmin from "@/components/adminComponent/Categories/CategoriesAdmin";
import DashBoard from "@/components/adminComponent/DashBoard/DashBoard";
import PostsAdmin from "@/components/adminComponent/Posts/PostsAdmin";
import ProductsAdmin from "@/components/adminComponent/ProductsAdmin/ProductsAdmin";
import { create } from "zustand";

export const useAdminStore = create((set, get) =>({

    currComp: "dashboard",

    setCurrComp: (comp)=>{
        set({ currComp: comp });
        
    },
    renderComp: ()=>{
        const { currComp } = get();
        console.log("current component to render is: ", currComp)
        switch(currComp){
            case "dashboard":
                return <DashBoard />;
            case "products":
                return <ProductsAdmin />;
            case "posts":
                return <PostsAdmin  />;
            case "categories":
                return <CategoriesAdmin />;
            default:
                return <DashBoard />;
        }
    }


    
}));