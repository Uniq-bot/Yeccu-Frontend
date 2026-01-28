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
    },
    createPost: async (postData) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Please login again");

            const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

            // Create PostDto object
            const post = {
                title: postData.title,
                content: postData.content,
                categoryId: postData.categoryId
            };

            // Create FormData with exact part names expected by backend
            const formData = new FormData();
            formData.append(
                "post",
                new Blob([JSON.stringify(post)], { type: "application/json" })
            );
            
            if (postData.image) {
                formData.append("image", postData.image);   // "image" = File from input
            }

            // Send WITHOUT Content-Type header - browser will auto-set multipart/form-data
            const response = await fetch("https://surrounding-willi-yeccu-46ade4dd.koyeb.app/api/v1/admin/posts", {
                method: "POST",
                headers: {
                    Authorization: authHeader  // Only this header
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Post creation error response:", errorData);
                throw new Error(errorData.message || `HTTP ${response.status}: Failed to create post`);
            }

            return await response.json();
        } catch (error) {
            console.error("Post creation error:", error);
            throw new Error(
                error.message ||
                    "Failed to create post"
            );
        }
    },
    deletePost: async (postId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Please login again");

            const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

            const response = await fetch(`https://surrounding-willi-yeccu-46ade4dd.koyeb.app/api/v1/admin/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    Authorization: authHeader
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}: Failed to delete post`);
            }

            return await response.json().catch(() => ({}));
        } catch (error) {
            throw new Error(
                error.message ||
                    "Failed to delete post"
            );
        }
    },
    updatePost: async (postId, postData) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Please login again");

            const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

            const post = {
                title: postData.title,
                content: postData.content,
                categoryId: postData.categoryId
            };

            console.log("Updating post with token:", authHeader.substring(0, 20) + "...");
            
            const response = await fetch(`https://surrounding-willi-yeccu-46ade4dd.koyeb.app/api/v1/admin/posts/${postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeader
                },
                body: JSON.stringify(post)
            });

            console.log("Update response status:", response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}: Failed to update post`);
            }

            return await response.json();
        } catch (error) {
            console.error("Update post error:", error);
            throw new Error(
                error.message ||
                    "Failed to update post"
            );
        }
    },
    uploadPostImage: async (postId, imageFile) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Please login again");

            const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

            const formData = new FormData();
            formData.append("image", imageFile);

            console.log("Uploading image with token:", authHeader.substring(0, 20) + "...");

            const response = await fetch(`https://surrounding-willi-yeccu-46ade4dd.koyeb.app/api/v1/admin/posts/image/upload/${postId}`, {
                method: "POST",
                headers: {
                    Authorization: authHeader
                },
                body: formData
            });

            console.log("Upload response status:", response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}: Failed to upload image`);
            }

            return await response.json();
        } catch (error) {
            console.error("Upload image error:", error);
            throw new Error(
                error.message ||
                    "Failed to upload image"
            );
        }
    }
})
);