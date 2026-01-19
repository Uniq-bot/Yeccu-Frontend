import { create } from "zustand";
import instance from "./axios";

const getStoredToken = () => (typeof window !== 'undefined' ? localStorage.getItem("token") || null : null);

function isTokenExpired() {
  if (typeof window === 'undefined') return true;
  
  const refreshToken = localStorage.getItem("refreshToken");

  // No token at all
  if (!refreshToken) return true;

  try {
    const parts = refreshToken.split(".");
    if (parts.length !== 3) return true;

    const payload = JSON.parse(atob(parts[1]));

    if (!payload.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);

    return payload.exp <= currentTime;
  } catch (error) {
    // Corrupted / invalid token
    return true;
  }
}

function getUserFromToken() {
  if (typeof window === 'undefined') return null;
  
  const refreshToken = localStorage.getItem("refreshToken");
  
  if (!refreshToken) return null;

  try {
    const parts = refreshToken.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    console.log(payload.sub)
    return payload.sub || null;
  } catch (error) {
    return null;
  }
}

export const useAuthStore = create((set) => ({
    isAuthenticated: !isTokenExpired() && !!getStoredToken(),
    user: getUserFromToken(),
    token: getStoredToken(),
    setUser: (user) => set({ user }),
    login: async (formData) => {
        try {
            const loginRes = await instance.post("/api/v1/auth/signin", formData);
            console.log(loginRes)
            const { token } = loginRes.data || {};

            if (!token) throw new Error("No token returned from server");
            
            localStorage.setItem("token", token);
            localStorage.setItem('refreshToken', loginRes.data.refreshToken);
            set({ token, isAuthenticated: true });
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