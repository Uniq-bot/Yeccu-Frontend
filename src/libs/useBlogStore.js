import { create } from "zustand";
import instance from "./axios";

export const useBlogStore =create((set, get)=>(
    {
    initialBlogCategory:"All",
    currentBlogCategory:"All",
    blogCategories:[],
    blogs:[],
    filteredBlogs:[],
    isLoading:true,
    initializeBlogs: async()=>{
        set({isLoading:true});
        try{
            // Fetch blog categories
            const blogRes=await instance.get('/api/v1/posts')
            console.log(blogRes);
            const blogs= blogRes.data.content || [];
            console.log("Blogs:", blogs);
            set({blogs, filteredBlogs:blogs, isLoading:false});
        }catch(error){
            console.error("Error initializing blogs:", error);
            set({isLoading:false});
        }
    },
    // initializeBlogCategories: async()=>{
    //     set({isLoading:true});
    //     try{
    //         // Fetch blog categories
    //         const catRes=await instance.get('/api/v1/categories/blog')
    //         console.log(catRes);
    //         const blogCategories= catRes.data || [];
    //         console.log("Blog Categories:", blogCategories);
    //         set({blogCategories, isLoading:false});
    //     }catch(error){
    //         console.error("Error initializing blog categories:", error);
    //         set({isLoading:false});
    //     }
    // }
}
)
);