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
  
  createProduct: async (productData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login again");

      const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

      // Create ProductDto object
      const product = {
        productName: productData.productName,
        description: productData.description,
        price: productData.price,
        categoryId: productData.categoryId
      };

      // Create FormData with exact part names expected by backend
      const formData = new FormData();
      formData.append(
          "product",
          new Blob([JSON.stringify(product)], { type: "application/json" })
      );
      
      if (productData.image) {
          formData.append("image", productData.image);
      }

      const response = await fetch("https://surrounding-willi-yeccu-46ade4dd.koyeb.app/api/v1/admin/products", {
          method: "POST",
          headers: {
              Authorization: authHeader
          },
          body: formData
      });

      if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("Backend validation error:", errorData);
          throw new Error(errorData.message || `HTTP ${response.status}: Failed to create product`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(
          error.message ||
              "Failed to create product"
      );
    }
  },

deleteProduct: async (productId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Please login again");

    const authHeader = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;

    const response = await fetch(
      `https://surrounding-willi-yeccu-46ade4dd.koyeb.app/api/v1/admin/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: authHeader,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP ${response.status}: Failed to delete product`
      );
    }

    // 🔥 UPDATE STORE STATE
    set((state) => ({
      products: state.products.filter((p) => p._id !== productId),
      filteredProducts: state.filteredProducts.filter(
        (p) => p._id !== productId
      ),
    }));

    return true;
  } catch (error) {
    throw new Error(error.message || "Failed to delete product");
  }
},

}));
