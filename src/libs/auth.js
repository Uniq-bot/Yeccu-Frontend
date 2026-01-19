import { create } from "zustand";
import instance from "./axios";

const getStoredToken = () => (typeof window !== "undefined" ? localStorage.getItem("token") : null);

export const useAuthStore = create((set) => ({
    isAuthenticated: !!getStoredToken(),
    user: null,
    token: getStoredToken(),
    login: async (formData) => {
        try {
            const loginRes = await instance.post("/api/v1/auth/signin", formData);
            console.log(loginRes)
            const { token, user } = loginRes.data || {};

            if (!token) throw new Error("No token returned from server");

            localStorage.setItem("token", token);
            set({ token, user: user || null, isAuthenticated: true });
            return { success: true };
        } catch (error) {
            let message = "Login failed. Check your username or password.";
            
            if (error?.response?.data?.message) {
                message = error.response.data.message;
            } else if (error?.response?.status === 403) {
                message = "Invalid username or password";
            } else if (error?.message) {
                message = error.message;
            }
            
            console.log("Login failed", error);
            localStorage.removeItem("token");
            set({ token: null, user: null, isAuthenticated: false });
            return { success: false, message };
        }
    },
    register: async (formData) => {
        try {
            const { username, password } = formData;

            if (!username || !password) {
                throw new Error("All fields are required");
            }

            console.log("Attempting registration with:", { username, password: "***" });

            const registerRes = await instance.post("/api/v1/auth/signup", {
                username,
                password
            });

            console.log("Registration response:", registerRes.data);

            return { success: true, message: "Registration successful! Please login." };
        } catch (error) {
            let message = "Registration failed. Please try again.";
            
            if (error?.response?.data?.message) {
                message = error.response.data.message;
            } else if (error?.response?.status === 403) {
                message = "Registration failed. Username may already exist or backend rejected the request.";
            } else if (error?.message) {
                message = error.message;
            }
            
            console.log("Registration failed", error);
            return { success: false, message };
        }
    },
}));