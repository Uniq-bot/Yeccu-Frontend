import { create } from "zustand";

export const useAuthStore = create((set) => ({
    isAdmin:true,
}));