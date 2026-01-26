import CategoriesAdmin from "@/components/adminComponent/Categories/CategoriesAdmin";
import DashBoard from "@/components/adminComponent/DashBoard/DashBoard";
import PostsAdmin from "@/components/adminComponent/Posts/PostsAdmin";
import ProductsAdmin from "@/components/adminComponent/ProductsAdmin/ProductsAdmin";
import { create } from "zustand";

export const useAdminStore = create((set, get) =>({

    currComp: "dashboard",
    showCategoryForm: false,
    showProductForm: false,
    showPostForm: false,

    setCurrComp: (comp)=>{
        set({ currComp: comp });
        
    },
    setShowCategoryForm: (show) => {
        set({ showCategoryForm: show });
    },
    setShowProductForm: (show) => {
        set({ showProductForm: show });
    },
    setShowPostForm: (show) => {
        set({ showPostForm: show });
    },
    renderComp: ()=>{
        const { currComp, showCategoryForm, showProductForm, showPostForm } = get();
        console.log("current component to render is: ", currComp)
        switch(currComp){
            case "dashboard":
                return <DashBoard />;
            case "products":
                return <ProductsAdmin initialShowForm={showProductForm} />;
            case "posts":
                return <PostsAdmin initialShowForm={showPostForm} />;
            case "categories":
                return <CategoriesAdmin initialShowForm={showCategoryForm} />;
            default:
                return <DashBoard />;
        }
    }


    
}));