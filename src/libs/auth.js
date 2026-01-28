import { create } from "zustand";
import instance from "./axios";

const getStoredToken = () => (typeof window !== 'undefined' ? localStorage.getItem("token") || null : null);

function isTokenExpired() {
    if (typeof window === 'undefined') return true;

    const token = localStorage.getItem("token");

    // No token at all
    if (!token) return true;

    try {
        const parts = token.split(".");
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
const getRole = () => {
    if (typeof window === 'undefined') return true;

    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;

        const payload = JSON.parse(atob(parts[1]));
        console.log("role is", payload.roles[0])
        return payload.roles[0] || null;
    } catch (error) {
        return null;
    }
}
const refreshTheToken = async () => {
    if (typeof window === 'undefined') return false;

    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
        const refreshRes = await instance.post("/api/v1/auth/refresh", {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const newToken = refreshRes.data?.token;
        if (newToken) {
            localStorage.setItem("token", newToken);
            return true;
        } else {
            localStorage.removeItem("token");
            return false;
        }
    } catch (error) {
        console.error("Error refreshing token:", error);
        localStorage.removeItem("token");
        return false;
    }
}

const checkAndRefreshToken = async () => {
    if (isTokenExpired()) {
        console.log("Token expired, attempting to refresh...");
        const refreshed = await refreshTheToken();
        if (refreshed) {
            console.log("Token refreshed successfully");
            return true;
        } else {
            console.log("Token refresh failed");
            return false;
        }
    }
    return true;
}
function getUserFromToken() {
    if (typeof window === 'undefined') return null;

    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;
        console.log(parts)
        const tw0 = JSON.parse(atob(parts[0]));
        console.log(tw0)
        const payload = JSON.parse(atob(parts[1]));
        console.log(payload.roles[0])
        return payload.sub || null;
    } catch (error) {
        return null;
    }
}

export const useAuthStore = create((set) => ({
    isAdmin: getRole() === "ADMIN" ? true : false,
    isAuthenticated: !isTokenExpired() && !!getStoredToken(),
    user: getUserFromToken(),
    token: getStoredToken(),
    authorized: getRole() === "ADMIN" ? true : false,
    setUser: (user) => set({ user }),
    refreshToken: refreshTheToken,
    checkAndRefreshToken: checkAndRefreshToken,
    login: async (formData) => {
        try {
            const loginRes = await instance.post("/api/v1/auth/signin", formData);
            console.log(loginRes)
            const { token } = loginRes.data || {};

            if (!token) throw new Error("No token returned from server");

            localStorage.setItem("token", token);
            const user = getUserFromToken();
            const isAdmin = getRole() === "ADMIN";
            set({ token, isAuthenticated: true, user, isAdmin, authorized: isAdmin });
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