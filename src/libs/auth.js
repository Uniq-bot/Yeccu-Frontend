import { create } from "zustand";
import instance from "./axios";

const getStoredToken = () => (typeof window !== "undefined" ? localStorage.getItem("token") : null);

export const useAuthStore = create((set) => ({
    isAuthenticated: !!getStoredToken(),
    user: null,
    token: getStoredToken(),
    login: async (formData) => {
        try {
            const loginRes = await instance.post("/api/v1/signin", formData);
            const { token, user } = loginRes.data || {};

            if (!token) throw new Error("No token returned from server");

            localStorage.setItem("token", token);
            set({ token, user: user || null, isAuthenticated: true });
            return { success: true };
        } catch (error) {
            const message = error?.response?.data?.message || "Login failed. Check your email or password.";
            console.log("Login failed", error);
            alert(message);
            localStorage.removeItem("token");
            set({ token: null, user: null, isAuthenticated: false });
            return { success: false, message };
        }
    },
}));