import { create } from "zustand";
import instance from "./axios";

const useCreateCate = create((set) => ({
  isCreatingCate: false,
  isLoadingCategories: false,
  deletingCategoryId: null,
  allCategories:[],
  getAllCategory: async () => {
    set({ isLoadingCategories: true });
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login again");

      const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

      const res = await instance.get("/api/v1/admin/categories/", {
        headers: {
          Authorization: authHeader,
        },
      });

      set({ allCategories: res.data });

      return res.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch categories"
      );
    } finally {
      set({ isLoadingCategories: false });
    }
  },

  createCategory: async (categoryData) => {
    set({ isCreatingCate: true });
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login again");

      const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

      const payload = { ...categoryData };

      const res = await instance.post("/api/v1/admin/categories/", payload, {
        headers: {
          Authorization: authHeader,
        },
      });

      return res.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create category"
      );
    } finally {
      set({ isCreatingCate: false });
    }
  },

  deleteCategory: async (categoryId) => {
    set({ deletingCategoryId: categoryId });
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login again");

      const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

      const res = await instance.delete(
        `/api/v1/admin/categories/${categoryId}`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      return res.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete category"
      );
    } finally {
      set({ deletingCategoryId: null });
    }
  },
}));

export default useCreateCate;
