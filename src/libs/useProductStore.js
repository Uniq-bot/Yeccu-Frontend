import axios from "axios";
import { create } from "zustand";
import instance from "./axios";

export const useProductStore = create((set, get) => ({
  initialCategory: "All",
  currentCategory: "All",
  categories: [],
  products: [],
  filteredProducts: [],
  isLoading: true,

  initializeProducts: async () => {
    set({ isLoading: true });
    try {
      const [catRes, proRes] = await Promise.all([
        instance.get('/api/v1/categories/product'),
        instance.get("/api/v1/products?pageSize=999"),
      ]);
      
      const categories = catRes.data || [];
      const products = proRes.data.content || [];
      
      console.log("Categories:", categories);
      console.log("Products:", products);
      
      set({ categories, products, filteredProducts: products, isLoading: false });
    } catch (error) {
      console.error("Error initializing products:", error);
      set({ isLoading: false });
    }
  },

  
  
  setCurrentCategory: (categoryId)=>{
    set({ currentCategory: categoryId });
    const { products, fetchProductByCategory } = get();
    
    if (categoryId === "All") {
      set({ filteredProducts: products });
      console.log("fetchedd all:", products )
    } else {
      fetchProductByCategory(categoryId);
    }
  },
  fetchProductByCategory: async  (categoryId) => {
    set({ isLoading: true });
    try {
      const catProres= await instance.get(`/api/v1/products/category/${categoryId}?pageSize=999`);
      const catProducts= catProres.data.content || [];
      console.log("Products in category", categoryId, ":", catProducts);
      set({ filteredProducts: catProducts, isLoading: false });
    } catch (error) {
      console.error("Error fetching products by category:", error);
      set({ isLoading: false });
    }
  },
  
  setIsLoading: (isLoading) => set({ isLoading }),
  
  
}));
