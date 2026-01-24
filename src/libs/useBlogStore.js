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
    isCategoryLoading:false,
    isFetchingBlog:false,
    currBlog:null,
    fetchCurrBlog: async (id)=>{
        set({isFetchingBlog:true});
        try{
            const blogRes= await instance.get(`/api/v1/posts/${id}`);
            const blog= blogRes.data || null;
            set({isFetchingBlog:false, currBlog: blog});
            return blog;
        }catch(error){
            console.error("Error fetching blog:", error);
            set({isFetchingBlog:false, currBlog: null});
            return null;
        }
    },
    initializeBlogs: async()=>{
        set({isLoading:true});
        try{
            // Fetch blog categories
            const blogRes=await instance.get('/api/v1/posts?pageSize=999')
            console.log(blogRes);
            const blogs= blogRes.data.content || [];
            console.log("Blogs:", blogs);
            set({blogs, filteredBlogs:blogs, isLoading:false});
        }catch(error){
            console.error("Error initializing blogs:", error);
            set({isLoading:false, blogs: [], filteredBlogs: []});
        }
    },
    initializeBlogCategories: async()=>{
        set({isCategoryLoading:true});
        try{
            // Fetch blog categories
            const catRes=await instance.get('/api/v1/categories/blog')
            console.log(catRes);
            const blogCategories= catRes.data?.content || catRes.data || [];
            console.log("Blog Categories:", blogCategories);
            set({blogCategories, isCategoryLoading:false});
        }catch(error){
            console.error("Error initializing blog categories:", error);
            set({isCategoryLoading:false, blogCategories: []});
        }
    },
    filterBlogsByCategory: (categoryValue)=>{
        const { blogs } = get();
        const normalized = (val)=> (val ?? '').toString();
        const categoryKey = normalized(categoryValue);
        const filtered = categoryKey === 'All'
            ? blogs
            : blogs.filter((blog)=> normalized(blog.categoryId) === categoryKey || normalized(blog.category) === categoryKey);
        set({ currentBlogCategory: categoryValue, filteredBlogs: filtered });
    }
}
));